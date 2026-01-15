import React from 'react';
import { Copy, Check } from 'lucide-react';

interface TelegramPreviewProps {
  content: string;
  isLoading: boolean;
}

const TelegramPreview: React.FC<TelegramPreviewProps> = ({ content, isLoading }) => {
  const [copied, setCopied] = React.useState(false);

  // Simple formatter to simulate Telegram Markdown rendering in the preview
  // Telegram supports **bold**, __italic__, `monospace`
  const renderFormattedText = (text: string) => {
    if (!text) return null;

    // This is a naive implementation for preview purposes. 
    // In a real production app, a robust parser would be used.
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
      .replace(/__(.*?)__/g, '<i>$1</i>')     // Italic
      .replace(/`(.*?)`/g, '<code class="text-[#4e7d96] bg-[#eef6fa] px-1 rounded text-sm font-mono">$1</code>') // Monospace
      .replace(/\n/g, '<br/>'); // Newlines

    return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto">
      {/* Phone Header Mockup */}
      <div className="bg-[#517da2] text-white p-3 rounded-t-xl flex items-center shadow-md z-10">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#517da2] font-bold text-sm mr-3">
          TG
        </div>
        <div>
          <h3 className="font-semibold text-sm">Growth Channel</h3>
          <p className="text-xs opacity-80">12.5K subscribers</p>
        </div>
      </div>

      {/* Message Area Mockup */}
      <div className="bg-[#8e9caf] flex-grow p-4 min-h-[400px] relative overflow-hidden bg-[url('https://web.telegram.org/img/bg_0.png')] bg-cover">
        {/* The Message Bubble */}
        <div className="bg-white rounded-tr-xl rounded-br-xl rounded-bl-xl rounded-tl-none p-3 shadow-sm max-w-[90%] relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {isLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : content ? (
            <div className="text-gray-800 text-[15px] leading-relaxed break-words">
              {renderFormattedText(content)}
            </div>
          ) : (
            <div className="text-gray-400 italic text-sm">
              Your generated post will appear here...
            </div>
          )}

          <div className="flex justify-end mt-1">
             <span className="text-[11px] text-gray-400">Just now</span>
          </div>
        </div>

        {/* Copy Button (Floating) */}
        {content && !isLoading && (
          <button
            onClick={handleCopy}
            className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-[#517da2] hover:bg-blue-50'
            }`}
            title="Copy to clipboard"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        )}
      </div>

      {/* Phone Footer Mockup */}
      <div className="bg-[#fff] p-3 border-t border-gray-200 rounded-b-xl flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest font-semibold">
        Broadcast
      </div>
    </div>
  );
};

export default TelegramPreview;
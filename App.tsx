import React, { useState } from 'react';
import { Send, Sparkles, AlertCircle, Settings2 } from 'lucide-react';
import { generateTelegramPost } from './services/geminiService';
import { Tone, Language, PostParams } from './types';
import TelegramPreview from './components/TelegramPreview';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  
  const [params, setParams] = useState<PostParams>({
    topic: '',
    tone: Tone.HYPE,
    language: Language.ENGLISH,
    cta: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.topic.trim()) return;

    setLoading(true);
    setError(null);
    setGeneratedContent(""); // Clear previous content while loading

    try {
      const result = await generateTelegramPost(params);
      setGeneratedContent(result);
    } catch (err) {
      setError("Failed to generate post. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-2 rounded-lg text-white">
              <Send size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">TeleGen</h1>
          </div>
          <div className="text-sm text-gray-500 font-medium hidden sm:flex items-center gap-2">
            Built for Indian Creators <span className="text-lg">🇮🇳</span>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Input Form */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Settings2 className="text-blue-500" size={24}/> 
                Post Configuration
              </h2>
              <p className="text-gray-500">Define your content strategy and let Gemini handle the creative work.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Topic Input */}
              <div>
                <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-1">
                  Topic / Hook <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="topic"
                  name="topic"
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none bg-gray-50 focus:bg-white placeholder-gray-400"
                  placeholder="e.g. Nifty hitting all time high, Flipkart Big Billion Days Sale, Crypto crash..."
                  value={params.topic}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Tone Selection */}
                <div>
                  <label htmlFor="tone" className="block text-sm font-semibold text-gray-700 mb-1">
                    Tone
                  </label>
                  <div className="relative">
                    <select
                      id="tone"
                      name="tone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none bg-gray-50 focus:bg-white transition-all cursor-pointer"
                      value={params.tone}
                      onChange={handleInputChange}
                    >
                      {Object.values(Tone).map((tone) => (
                        <option key={tone} value={tone}>{tone}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-1">
                    Language
                  </label>
                  <div className="relative">
                    <select
                      id="language"
                      name="language"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none bg-gray-50 focus:bg-white transition-all cursor-pointer"
                      value={params.language}
                      onChange={handleInputChange}
                    >
                      {Object.values(Language).map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Input */}
              <div>
                <label htmlFor="cta" className="block text-sm font-semibold text-gray-700 mb-1">
                  Call to Action (Optional)
                </label>
                <input
                  type="text"
                  id="cta"
                  name="cta"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 focus:bg-white placeholder-gray-400"
                  placeholder="e.g. Join premium channel, Loot fast, Link in bio..."
                  value={params.cta}
                  onChange={handleInputChange}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-2 text-sm">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !params.topic.trim()}
                className={`w-full py-4 rounded-xl text-white font-semibold text-lg shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${
                  loading || !params.topic.trim()
                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Writing...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Post
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Right Column: Preview */}
          <section className="flex flex-col items-center">
            <div className="w-full mb-4 flex justify-between items-center lg:hidden">
                <h3 className="font-bold text-gray-700">Preview</h3>
            </div>
            
            <div className="sticky top-24 w-full">
               <TelegramPreview content={generatedContent} isLoading={loading} />
               
               {generatedContent && (
                 <div className="mt-6 text-center text-sm text-gray-500">
                   <p>Tip: Click the copy icon inside the preview to grab the Markdown.</p>
                 </div>
               )}
            </div>
          </section>

        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} TeleGen. Built with Gemini AI.
        </div>
      </footer>
    </div>
  );
};

export default App;
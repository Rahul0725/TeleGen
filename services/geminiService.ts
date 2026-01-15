import { GoogleGenAI } from "@google/genai";
import { PostParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert content growth strategist for top Indian Telegram channels. You understand the pulse of the Indian audience, whether it's for Loot Deals, Stock Market tips, Crypto updates, Breaking News, or EdTech.

Your Goal: Generate viral, high-engagement posts that feel native to Indian Telegram communities.

Formatting Rules:
- **Bold (\`**text**\`)**: Use for Headlines, Prices, Important keywords (e.g., **Rs. 499 only**, **BREAKING**, **Nifty 50**).
- Monospace (\` \`text\` \`): Use strictly for Coupon Codes, Links, or specific data points (e.g., \`Code: OFF50\`).
- Italics (\`__text__\`): Use for subtle emphasis or side notes.
- **Emojis**: Use them effectively. Indian users love expressive emojis (🔥, 🚀, 😱, 🇮🇳, ✅, 💰).
- **Structure**: 
  1. **Headline**: Grab attention immediately (Use caps or bold).
  2. **Body**: Concise bullet points or short paragraphs. Easy to scan.
  3. **Call to Action (CTA)**: Strong and directive.

Language & Tone Guidelines:
- **Hinglish**: This is the most popular style. Mix English with common Hindi words naturally (e.g., "Ye offer miss mat karna!", "Market crash hone wala hai", "Abhi check karo", "Bawaal item hai").
- **Hindi**: Use clean, conversational Hindi (Devanagari script).
- **English**: Use Indian English phrasing, simple and direct.
- **Urgency**: Use words like "Loot", "Fast", "Jaldi", "Limited Time", "Mahaloot".

Output Requirement:
- Return ONLY the raw message content. 
- Do not include "Here is your post" or markdown code blocks.
`;

export const generateTelegramPost = async (params: PostParams): Promise<string> => {
  try {
    const prompt = `
    Create a Telegram post for an Indian audience.
    
    Parameters:
    - Topic: ${params.topic}
    - Tone: ${params.tone}
    - Language: ${params.language}
    - CTA: ${params.cta ? params.cta : 'Make sure to check it out'}
    
    Context: The audience is primarily Indian. Use appropriate cultural references, currency (₹), and slang if the tone allows.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
      }
    });

    if (response.text) {
      return response.text.trim();
    }
    
    throw new Error("No content generated");

  } catch (error) {
    console.error("Error generating post:", error);
    throw error;
  }
};
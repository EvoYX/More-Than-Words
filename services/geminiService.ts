import { GoogleGenAI } from "@google/genai";
import { Language, Question } from "../types";

export const generateSampleResponse = async (
  question: Question,
  lang: Language
): Promise<string> => {
  // Fix: Directly use process.env.API_KEY and create a new instance right before the API call to ensure valid configuration
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = lang === 'zh' 
    ? `針對這個破冰問題：「${question.text.zh}」，以第一人稱（我）提供一個簡短、真誠且帶有一點感性深度的範例回答。大約兩句話。`
    : `For this icebreaker question: "${question.text.en}", provide a short, sincere, and slightly vulnerable example answer in the first person ("I"). About two sentences.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        // maxOutputTokens removed as it should only be set alongside thinkingBudget for Gemini 3 models
        temperature: 0.8,
      }
    });
    // Ensure extracted text is accessed via the .text property as per guidelines
    return response.text || (lang === 'zh' ? "這是一個很棒的問題，讓我想到了..." : "That's a great question, it makes me think of...");
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'zh' ? "我還在思考這個問題，也許你可以先分享？" : "I'm still reflecting on this, maybe you can share first?";
  }
};

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHobbyMentorAdvice = async (hobbyName: string, level: string, query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I am a ${level} in ${hobbyName}. ${query}`,
      config: {
        systemInstruction: `You are an expert mentor for ${hobbyName}. Provide encouraging, practical, and highly specific advice for a ${level}. Focus on skill-building and next steps. Keep it under 150 words.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The mentor is busy right now. Try again later!";
  }
};

export const getHobbySuggestions = async (interests: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on these interests: "${interests}", suggest 3 hobby groups I should join.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              reason: { type: Type.STRING },
              skillToFocusOn: { type: Type.STRING }
            },
            required: ["name", "reason", "skillToFocusOn"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

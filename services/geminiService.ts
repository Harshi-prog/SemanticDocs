
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface RagResponse {
  answer: string;
  confidence: number;
  isRefusal: boolean;
}

export const generateRagAnswer = async (
  question: string,
  context: string
): Promise<RagResponse> => {
  const ai = getAi();
  const prompt = SYSTEM_PROMPT.replace('{context}', context).replace('{question}', question);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.1, // Low temperature for factual grounding
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    });

    const answer = response.text || "Unexpected error occurred.";
    const isRefusal = answer.includes("do not contain enough information");
    
    // Simulating a confidence score based on Gemini's grounding
    // In a real system, we'd use embedding similarity scores
    const confidence = isRefusal ? 0.0 : 0.85 + Math.random() * 0.14;

    return {
      answer,
      confidence: parseFloat(confidence.toFixed(2)),
      isRefusal,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      answer: "Error connecting to AI engine.",
      confidence: 0,
      isRefusal: false,
    };
  }
};

export const getEmbeddings = async (text: string) => {
  // Mocking embedding process for UI purposes
  // In a real implementation, you'd use a specific embedding model
  return Array.from({ length: 768 }, () => Math.random());
};

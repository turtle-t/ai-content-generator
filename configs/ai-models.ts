import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { Env } from "./BaseEnvironment";

/**
 * ✅ Initialize the Gemini API client
 */
const genAI = new GoogleGenerativeAI(Env.GOOGLE_GEMINI_API_KEY);

/**
 * ✅ Define available Gemini models
 */
export const GeminiFlashModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const GeminiProModel = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

/**
 * ✅ Generate a simple text response from Gemini Flash
 */
export async function generateText(prompt: string): Promise<string> {
  try {
    const result = await GeminiFlashModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
    });

    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error.message || error);
    return "⚠️ Gemini API request failed. Please check your API key or model name.";
  }
}

/**
 * ✅ Generate text based on multi-turn chat messages
 */
export async function generateFromMessages(
  messages: { role: "user" | "model"; content: string }[]
): Promise<string> {
  try {
    const result = await GeminiProModel.generateContent({
      contents: messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini conversation error:", error.message || error);
    return "⚠️ Failed to generate conversation response.";
  }
}

/**
 * ✅ Stream text in real time (typing effect)
 */
export async function streamText(
  prompt: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  try {
    const stream = await GeminiFlashModel.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    for await (const chunk of stream.stream) {
      const text = chunk?.text();
      if (text) onChunk(text);
    }
  } catch (error: any) {
    console.error("Gemini streaming error:", error.message || error);
    onChunk("⚠️ Stream failed — check your API key or model name.");
  }
}

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { Env } from "./BaseEnvironment";

// ✅ Initialize the Gemini model
const genAI = new GoogleGenerativeAI(Env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ Helper function for generating AI responses
export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("AI generation error:", error);
    return "⚠️ Sorry, I couldn't generate the response.";
  }
}

// ✅ Generate the overall course layout
export async function generateCourseLayout(topic: string): Promise<string> {
  const prompt = `
You are an educational course designer.
Create a structured course layout for the topic: "${topic}".
The layout should include:
- Course title
- Short description
- 5-7 major chapters
- Each chapter name should be descriptive and educational.
Return only in clean JSON like:
{
  "title": "...",
  "description": "...",
  "chapters": ["...", "...", "..."]
}
`;
  return await generateAIResponse(prompt);
}

// ✅ Generate course chapters with content
export async function generateCourseChapters(
  topic: string,
  chapterTitle: string
): Promise<string> {
  const prompt = `
You are an AI teaching assistant.
Generate detailed educational content for the chapter: "${chapterTitle}"
from the course on "${topic}".

Include:
- A short intro paragraph
- 3-5 subtopics with explanations
- Practical examples
- A short summary or key takeaways.

Output in a neat structured format (not code).
`;
  return await generateAIResponse(prompt);
}

// ✅ Generate quiz questions for a topic
export async function generateQuizQuestions(topic: string): Promise<string> {
  const prompt = `
Create 5 multiple choice questions for the topic "${topic}".
Each should include 4 options and the correct answer.
Format clearly.
`;
  return await generateAIResponse(prompt);
}

console.log("✅ AI Models loaded successfully");

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Env } from "./BaseEnvironment";

// ✅ Initialize Gemini model with your key
const genAI = new GoogleGenerativeAI(Env.GOOGLE_GEMINI_API_KEY);

// ✅ Use correct model version (no -latest)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ Helper function for generating AI responses
export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.stringify({ success: true, result: text });
  } catch (error: any) {
    console.error("AI generation error:", error);
    return JSON.stringify({
      success: false,
      error: error.message || "AI generation failed",
    });
  }
}

// ✅ Generate a course layout
export async function generateCourseLayout(topic: string): Promise<string> {
  const prompt = `
You are an educational course designer.
Create a structured course layout for the topic: "${topic}".
The layout should include:
- Course title
- Short description
- 5-7 major chapters
Each chapter name should be descriptive and educational.

Return only in clean JSON format:
{
  "title": "...",
  "description": "...",
  "chapters": ["...", "...", "..."]
}
`;
  return await generateAIResponse(prompt);
}

// ✅ Generate detailed chapter content
export async function generateCourseChapters(
  topic: string,
  chapterTitle: string
): Promise<string> {
  const prompt = `
You are an AI teaching assistant.
Generate detailed educational content for the chapter "${chapterTitle}"
in the course on "${topic}".

Include:
- Short intro
- 3–5 subtopics with explanations
- Practical examples
- Summary or key takeaways

Format neatly, no code blocks.
`;
  return await generateAIResponse(prompt);
}

// ✅ Generate quiz questions
export async function generateQuizQuestions(topic: string): Promise<string> {
  const prompt = `
Create 5 multiple-choice questions for the topic "${topic}".
Each question should have 4 options and specify the correct answer.

Format clearly.
`;
  return await generateAIResponse(prompt);
}

console.log("✅ Gemini AI Model initialized successfully");

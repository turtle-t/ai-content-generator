"use client";

import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { generateCourseLayout } from "@/configs/ai-models";
import { storeDataInDatabase } from "../_utils/saveDataInDb";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function CreateCoursePage() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleGenerateCourse = async () => {
    if (!userInput) return;
    setLoading(true);

    const BASIC_PROMPT = `
      Generate a JSON course structure with chapters for topic: ${userInput}.
      Include: title, brief summary, chapters array with name and short description.
    `;

    try {
      const id = uuid4();

      // ✅ Fixed: Directly call the function instead of .sendMessage()
      const result = await generateCourseLayout(userInput);

      // result is already a string; parse it
      const data = JSON.parse(result);

      await storeDataInDatabase(id, userInput, data, user);
      alert("✅ Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("⚠️ Something went wrong while generating the course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create a New Course</h1>

      <Input
        type="text"
        placeholder="Enter a topic (e.g., Machine Learning Basics)"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="mb-4"
      />

      <Button onClick={handleGenerateCourse} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
          </>
        ) : (
          "Generate Course"
        )}
      </Button>
    </div>
  );
}

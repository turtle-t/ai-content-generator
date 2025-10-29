import { db } from "@/configs/db";
import { CourseList } from "@/schema/schema";
import { UserInputType } from "@/types/types";

// Define only needed fields from UserInputType
type UserInput = Pick<UserInputType, "topic" | "difficulty" | "category">;

// Define the structure of the data inserted into the DB
type CourseData = {
  courseId: string;
  courseName: string;
  level: string;
  category: string;
  courseOutput: JSON;
  createdBy?: string;
  username?: string;
  userprofileimage?: string;
};

/**
 * ✅ Inserts a new course record into the database.
 * @param id - Unique course ID (uuid)
 * @param userInput - Contains topic, difficulty, and category
 * @param data - JSON output from AI
 * @param user - Current authenticated user (Clerk)
 */
export async function storeDataInDatabase(
  id: string,
  userInput: UserInput,
  data: JSON,
  user: any
) {
  try {
    const result = await db.insert(CourseList).values({
      courseId: id,
      courseName: userInput.topic,
      category: userInput.category,
      level: userInput.difficulty,
      courseOutput: data,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      username: user?.fullName,
      userprofileimage: user?.imageUrl,
    } as CourseData);

    console.log("✅ Data stored successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error storing data in database:", error);
  }
}

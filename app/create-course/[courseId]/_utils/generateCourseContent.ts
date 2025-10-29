import { generateCourseChapters } from "@/configs/ai-models";
import { getYoutubeVideos } from "@/configs/service";
import { db } from "@/configs/db";
import { CourseChapters } from "@/schema/schema";
import { CourseType } from "@/types/types";

export const generateCourseContent = async (
  course: CourseType,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const chapters = course?.courseOutput.chapters;

    const chapterPromises = chapters?.map(async (chapter, index) => {
      const PROMPT = `
        Explain the concepts in detail on Topic: ${course?.courseName},
        Chapter: ${chapter.chapter_name}.
        Return JSON array with:
        [
          { "title": "string", "explanation": "detailed explanation", "code": "<precode>optional</precode>" }
        ]
      `;

      try {
        const query = `${course!.courseName}: ${chapter.chapter_name}`;

        // ✅ Fetch video for this chapter
        const resp = await getYoutubeVideos(query);
        const videoId = resp?.[0]?.id?.videoId || "";

        // ✅ Fixed: call function directly, not .sendMessage()
        const result = await generateCourseChapters(course.courseName, chapter.chapter_name);
        const content = JSON.parse(result);

        // ✅ Store into database
        await db.insert(CourseChapters).values({
          chapterId: index,
          courseId: course.courseId,
          content,
          videoId,
        });
      } catch (error) {
        console.error(`Error generating chapter ${index}:`, error);
      }
    });

    await Promise.all(chapterPromises || []);
  } catch (error) {
    console.error("Error in generateCourseContent:", error);
  } finally {
    setLoading(false);
  }
};

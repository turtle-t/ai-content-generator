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
    const chapters = course?.courseOutput?.chapters;

    const chapterPromises = chapters?.map(async (chapter, index) => {
      const PROMPT = `
        Explain the concepts in detail on Topic: ${course?.courseName},
        Chapter: ${chapter.chapter_name},
        in JSON Format with list of array having fields:
        - title
        - explanation (detailed)
        - code examples (in <precode> format if applicable)
      `;

      try {
        const query = `${course.courseName}: ${chapter.chapter_name}`;

        // ✅ Fetch related YouTube videos
        const resp = await getYoutubeVideos(query);
        console.log("🎥 Videos fetched:", resp);

        const videoId = resp?.[0]?.id?.videoId || null;

        // ✅ Call AI model function directly (not .sendMessage)
        const result = await generateCourseChapters(course.courseName, chapter.chapter_name);

        // ✅ Try to parse JSON (fallback to raw text)
        let content;
        try {
          content = JSON.parse(result);
        } catch {
          content = { text: result };
        }

        // ✅ Insert each chapter into DB
        await db.insert(CourseChapters).values({
          chapterId: index,
          courseId: course.courseId,
          content: content,
          videoId: videoId,
        });

        console.log(`✅ Chapter ${index + 1} saved successfully`);
      } catch (error) {
        console.error(`❌ Error processing chapter ${index + 1}:`, error);
      }
    });

    await Promise.all(chapterPromises || []);
    console.log("🎉 All chapters generated successfully!");
  } catch (error) {
    console.error("❌ Error generating course content:", error);
  } finally {
    setLoading(false);
  }
};

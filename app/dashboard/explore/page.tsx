import { CourseType } from "@/types"; // <-- make sure this import exists

const fakeCourses: (CourseType & { progress: number })[] = [
  {
    id: 1,
    courseId: "1",
    courseName: "AI for Beginners",
    category: "Artificial Intelligence",
    level: "Beginner",
    courseOutput: {
      category: "Artificial Intelligence",
      chapters: [],
      duration: "3h",
      level: "Beginner",
      topic: "AI Basics",
      description: "Learn the fundamentals of Artificial Intelligence."
    },
    isVideo: "true",
    username: "Trilok",
    userprofileimage: null,
    createdBy: "Trilok",
    courseBanner: "https://source.unsplash.com/600x400/?ai,technology",
    isPublished: true,
    progress: Math.floor(Math.random() * 100),
  },
  {
    id: 2,
    courseId: "2",
    courseName: "Web Development Bootcamp",
    category: "Web Development",
    level: "Intermediate",
    courseOutput: {
      category: "Web Development",
      chapters: [],
      duration: "5h",
      level: "Intermediate",
      topic: "Full Stack Web",
      description: "Master HTML, CSS, JS and modern web frameworks."
    },
    isVideo: "true",
    username: "Aarav",
    userprofileimage: null,
    createdBy: "Aarav",
    courseBanner: "https://source.unsplash.com/600x400/?web,programming",
    isPublished: true,
    progress: Math.floor(Math.random() * 100),
  },
  {
    id: 3,
    courseId: "3",
    courseName: "Data Science Essentials",
    category: "Data Science",
    level: "Advanced",
    courseOutput: {
      category: "Data Science",
      chapters: [],
      duration: "4h",
      level: "Advanced",
      topic: "Machine Learning",
      description: "Hands-on data analysis and model building."
    },
    isVideo: "true",
    username: "Riya",
    userprofileimage: null,
    createdBy: "Riya",
    courseBanner: "https://source.unsplash.com/600x400/?data,science",
    isPublished: true,
    progress: 0, // For 3rd course
  },
];

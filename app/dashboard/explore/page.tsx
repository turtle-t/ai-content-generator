"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/schema/schema";
import { CourseType } from "@/types/types";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SkeletonLoading from "../_components/SkeletonLoading";

// ✅ Optional: import type NextPage to satisfy Next.js typing
import { NextPage } from "next";

const ExplorePage: NextPage = () => {
  const [courseList, setCourseList] = useState<(CourseType & { progress: number })[] | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  // Fake courses fallback
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
        description: "Learn the fundamentals of Artificial Intelligence.",
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
        description: "Master HTML, CSS, JS and modern web frameworks.",
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
        description: "Hands-on data analysis and model building.",
      },
      isVideo: "true",
      username: "Riya",
      userprofileimage: null,
      createdBy: "Riya",
      courseBanner: "https://source.unsplash.com/600x400/?data,science",
      isPublished: true,
      progress: 0,
    },
  ];

  const getAllCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .limit(8)
        .offset(pageIndex * 8);

      if (!result || result.length === 0) {
        setCourseList(fakeCourses);
      } else {
        setCourseList(result as (CourseType & { progress: number })[]);
      }
    } catch (err) {
      console.error(err);
      setCourseList(fakeCourses);
    }
  };

  useEffect(() => {
    getAllCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  return (
    <div>
      <h2 className="font-bold text-3xl">Explore More Courses</h2>
      <p>Explore courses built with AI by other users</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {courseList ? (
          courseList.map((course) => (
            <div key={course.courseId}>
              <CourseCard
                course={course}
                onRefresh={() => getAllCourses()}
                displayUser={true}
              />
            </div>
          ))
        ) : (
          <SkeletonLoading items={8} />
        )}
      </div>

      <div className="flex justify-between mt-5 items-center">
        <Button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex == 0}
        >
          Prev
        </Button>
        <Badge>Page : {pageIndex + 1}</Badge>
        <Button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={courseList?.length !== 8}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ExplorePage;

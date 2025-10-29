"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SkeletonLoading from "../_components/SkeletonLoading";
import { CourseType } from "@/types/types";

const ExplorePage = () => {
  const [courseList, setCourseList] = useState<
    (CourseType & { progress: number })[] | null
  >(null);
  const [pageIndex, setPageIndex] = useState(0);

  // 🧠 Fake course data
  const fakeCourses: (CourseType & { progress: number })[] = [
    {
      courseId: "1",
      title: "AI for Beginners",
      description: "Learn how AI works and build your first model.",
      banner: "https://source.unsplash.com/600x400/?artificial-intelligence",
      createdBy: "John Doe",
      userId: "123",
      category: "AI",
      progress: Math.floor(Math.random() * 80) + 10, // random 10–90
    },
    {
      courseId: "2",
      title: "Web Development Bootcamp",
      description: "Become a full-stack web developer.",
      banner: "https://source.unsplash.com/600x400/?web,code",
      createdBy: "Sarah Lee",
      userId: "124",
      category: "Web Dev",
      progress: Math.floor(Math.random() * 80) + 10,
    },
    {
      courseId: "3",
      title: "Blockchain Fundamentals",
      description: "Understand crypto, blockchain, and smart contracts.",
      banner: "https://source.unsplash.com/600x400/?blockchain,crypto",
      createdBy: "Arjun Mehta",
      userId: "125",
      category: "Blockchain",
      progress: 0,
    },
    {
      courseId: "4",
      title: "Python Mastery",
      description: "Master Python from basics to advanced projects.",
      banner: "https://source.unsplash.com/600x400/?python,programming",
      createdBy: "Emily Carter",
      userId: "126",
      category: "Programming",
      progress: Math.floor(Math.random() * 80) + 10,
    },
    {
      courseId: "5",
      title: "UI/UX Design Essentials",
      description: "Learn the art of user interface and experience design.",
      banner: "https://source.unsplash.com/600x400/?design,uiux",
      createdBy: "Karan Singh",
      userId: "127",
      category: "Design",
      progress: Math.floor(Math.random() * 80) + 10,
    },
  ];

  const getAllCourses = async () => {
    // Simulate loading delay
    setTimeout(() => {
      setCourseList(fakeCourses);
    }, 800);
  };

  useEffect(() => {
    getAllCourses();
  }, [pageIndex]);

  return (
    <div>
      <h2 className="font-bold text-3xl">Explore More Courses</h2>
      <p className="text-gray-500">Explore courses built with AI by other creators</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {courseList ? (
          courseList.map((course) => (
            <div
              key={course.courseId}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={course.banner}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{course.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                  <div
                    className={`h-2.5 rounded-full ${
                      course.progress === 0
                        ? "bg-gray-400"
                        : "bg-green-500 animate-pulse"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Progress: {course.progress}%
                </p>
                <Button
                  className="w-full mt-4"
                  onClick={() => (window.location.href = `/courses/${course.courseId}`)}
                >
                  Explore Course
                </Button>
              </div>
            </div>
          ))
        ) : (
          <SkeletonLoading items={8} />
        )}
      </div>

      <div className="flex justify-between mt-6 items-center">
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

      {/* 🔽 Bottom button */}
      <div className="flex justify-center mt-10">
        <Button
          size="lg"
          className="px-8 py-6 text-lg"
          onClick={() => alert("Redirect to all courses")}
        >
          Explore All Courses
        </Button>
      </div>
    </div>
  );
};

export default ExplorePage;

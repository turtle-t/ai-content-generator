"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/schema/schema";
import { CourseType } from "@/types/types";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SkeletonLoading from "../_components/SkeletonLoading";

const ExplorePage = () => {
  const [courseList, setCourseList] = useState<CourseType[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  const getAllCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .limit(8)
        .offset(pageIndex * 8);

      setCourseList(result as CourseType[]);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setCourseList([]); // prevent crash
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
        {courseList.length > 0 ? (
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
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Prev
        </Button>
        <Badge>Page : {pageIndex + 1}</Badge>
        <Button
          onClick={() => setPageIndex((prev) => prev + 1)}
          disabled={courseList.length < 8}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ExplorePage;

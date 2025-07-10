import React, { useState } from "react";
import Cours from "../../components/StudentDashboard/Cours/Cours";
import CourseDetails from "../../components/StudentDashboard/Cours/CourseDetails";

const StudentCours = () => {
  const [showCourse, setShowCourse] = useState(false);
  const [courseId, setCourseId] = useState(null);
  // array of courses
  const courses = [
    {
      id: 1,
      title: "Math",
      teacher: "Teacher1",
      chapters: 5,
      duration: 3,
    },
    {
      id: 2,
      title: "Physics",
      teacher: "Teacher2",
      chapters: 4,
      duration: 2,
    },
    {
      id: 3,
      title: "Chemistry",
      teacher: "Teacher3",
      chapters: 3,
      duration: 1,
    },
    {
      id: 4,
      title: "Biology",
      teacher: "Teacher4",
      chapters: 6,
      duration: 4,
    },
    {
      id: 5,
      title: "English",
      teacher: "Teacher5",
      chapters: 2,
      duration: 1,
    },
  ];

  return (
    <div>
      <h2 className="my-5 text-[#2f3f68]">Cours</h2>
      {showCourse ? (
        <CourseDetails
          setShowCourse={setShowCourse}
          courseId={courseId}
          courses={courses}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {courses.map((course, index) => (
            <Cours
              key={index}
              id={index}
              setCourseId={setCourseId}
              setShowCourse={setShowCourse}
              course={course}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCours;

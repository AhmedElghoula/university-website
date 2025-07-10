import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const CourseDetails = ({ setShowCourse, courseId, courses }) => {
  return (
    <div>
      <div className="flex items-center space-x-5 text-base">
        <div className="pt-1 cursor-pointer" onClick={() => setShowCourse(false)}>
          <IoIosArrowBack />
        </div>
        <h3>{courses[courseId].title}</h3>
      </div>
    </div>
  );
};

export default CourseDetails;

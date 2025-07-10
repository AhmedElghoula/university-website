import React, { useState } from 'react'
import { IoPerson } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import './Cours.css'


const Cours = ({course, id, setShowCourse, setCourseId}) => {

  return (
    <div onClick={()=>{setShowCourse(true); setCourseId(id)}}  className="cours relative flex flex-col cursor-pointer overflow-hidden space-y-6 px-6 py-4 pb-8  rounded-3xl bg-white shadow-[1px_1px_30px_-15px_rgba(0,0,0,0.6)]">
      <div className="h-4 cours absolute left-0 top-0 bg-primary-blue w-[100%]"></div>
      <div className="text-xl">{course.title}</div>
      <div className="flex items-center gap-x-2 opacity-60">
        <IoPerson />
        <div>{course.teacher}</div>
      </div>
      <div className="flex items-center justify-between sm:w-[80%]  md:w-[100%] lg:w-[80%] opacity-60">
        <div className="flex items-center gap-x-2">
          <GiNotebook />
          <div>{course.chapters} chapitres</div>
        </div>
        <div className="flex items-center gap-x-2">
          <MdTimer />
          <div>{course.duration} Hours</div>
        </div>
      </div>
    </div>
  );
}

export default Cours
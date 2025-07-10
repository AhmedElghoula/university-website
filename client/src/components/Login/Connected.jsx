import React from 'react'
import exit from "../../assets/exit.svg";



const Connected = ({profile,name}) => {
  return (
    <div className="w-48 h-60 bg-[#edf7ff] rounded-xl shadow-2xl mb-10 xl:mb-0 mr-0 ">
      <div className="flex justify-end mr-2 mt-2">
        <img src={exit} alt="exit" className="w-4" />
      </div>
      <div className="flex items-center justify-center flex-col">
        <div className="mr-2 text-right">
          <img className='w-24' src={profile} alt="" />
        </div>
        <div className="text-center leading-4">
          <h4 className="font-semibold font-sans">{name}</h4>
          <p className="text-gray-400 text-sm font-sans">Actif il y a 1 jour</p>
        </div>
      </div>
    </div>
  );
}

export default Connected
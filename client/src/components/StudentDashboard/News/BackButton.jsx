import React from "react";

const BackButton = ({setShowDetails}) => {
  return (
    <div>
      <button
      onClick={()=>setShowDetails((prev)=>!prev)}
        className="bg-[#84a5ff] border-none text-center  h-10 rounded-lg w-10 cursor-pointer duration-200 hover:scale-125 active:scale-100"
        title="Go Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 26 21"
          class="stroke-white"
        >
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            d="M11 6L5 12M5 12L11 18M5 12H19"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default BackButton;

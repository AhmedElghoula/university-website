import React from "react";
import { useLocation } from "react-router-dom";
const ProfileIcon = ({ link }) => {
  const location = useLocation();
  const stroke = location.pathname == link ? "#3366FF" : "#8F9BB3";
  return (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.30737 18.5C1.30737 17.1739 1.83956 15.9021 2.78685 14.9645C3.73414 14.0268 5.01894 13.5 6.35862 13.5H16.4611C17.8008 13.5 19.0856 14.0268 20.0329 14.9645C20.9802 15.9021 21.5124 17.1739 21.5124 18.5C21.5124 19.163 21.2463 19.7989 20.7726 20.2678C20.299 20.7366 19.6566 21 18.9867 21H3.833C3.16316 21 2.52076 20.7366 2.04711 20.2678C1.57346 19.7989 1.30737 19.163 1.30737 18.5Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.4098 8.5C13.5021 8.5 15.1982 6.82107 15.1982 4.75C15.1982 2.67893 13.5021 1 11.4098 1C9.31748 1 7.62134 2.67893 7.62134 4.75C7.62134 6.82107 9.31748 8.5 11.4098 8.5Z"
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ProfileIcon;

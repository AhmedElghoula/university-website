import React from "react";
import SidebarItem from "./SidebarItem";
import issat from "../assets/issat.svg";
import DashboardIcon from "../assets/DashboardIcon";
import CourseIcon from "../assets/CourseIcon";
import TimeTableIcon from "../assets/TimeTableIcon";
import CalenderIcon from "../assets/CalenderIcon";
import ProfileIcon from "../assets/ProfileIcon";
import OffreIcon from "../assets/OffreIcon";
import LogoutIcon from "../assets/LogoutIcon";
import { Layout } from "antd";
import { LuBook, LuCalendarDays } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import { IoLibraryOutline } from "react-icons/io5";
import { LiaBusinessTimeSolid, LiaBookSolid } from "react-icons/lia";
const { Header, Content, Footer, Sider } = Layout;
const SideBar = ({ collapsed }) => {
  return (
    <Sider
      className="bg-soft-gray  shadow-sm"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#F7F9FC",
      }}
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <Link to='/'>
      <img
        src={issat}
        className={`overflow-hidden transition-all     ${
          collapsed ? "w-14 m-2" : " m-5 w-36"
        }`}
      />
      </Link>
    <div >
  

    <SidebarItem
        icon={<DashboardIcon link="/" />}
        link={"/"}
        text={"Acceuil"}
        collapsed={collapsed}
      />
      <SidebarItem
        icon={<CourseIcon link="/courses" />}
        link={"/courses"}
        text={"Cours"}
        collapsed={collapsed}
      />
      <SidebarItem
        icon={<TimeTableIcon link="/timetable" />}
        link={"/timetable"}
        text={"Timetable"}
        collapsed={collapsed}
      />
      <SidebarItem
        icon={<CalenderIcon link="/Calendar"/>}
        link={"/Calendar"}
        text={"Calendar"}
        collapsed={collapsed}
      />
      <SidebarItem
        icon={<OffreIcon link="/offres" />}
        link={"/offres"}
        text={"Interships offres"}
        collapsed={collapsed}
      />
    
    <div className="mt-20">
      <SidebarItem
        icon={<ProfileIcon link="/profile" />}
        link={"/profile"}
        text={"profile"}
        collapsed={collapsed}
      />
        <SidebarItem
        icon={<LogoutIcon  />}
        //link={"/profile"}
        text={"Logout"}
        collapsed={collapsed}
      />
      </div>
</div>
    </Sider>
  );
};

export default SideBar;

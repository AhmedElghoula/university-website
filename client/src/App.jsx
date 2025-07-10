import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import issat from "./assets/issat.svg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import OurFooter from "./components/OurFooter";
import AdminRoutes from "./Routers/AdminRoutes";
import StudentRoutes from "./Routers/StudentRoutes";
import SidebarItem from "./components/SidebarItem";
import DashboardIcon from "./assets/DashboardIcon";
import CourseIcon from "./assets/CourseIcon";
import TimeTableIcon from "./assets/TimeTableIcon";
import CalenderIcon from "./assets/CalenderIcon";
import OffreIcon from "./assets/OffreIcon";
import ProfileIcon from "./assets/ProfileIcon";
import LogoutIcon from "./assets/LogoutIcon";
import FormationsIcon from "./assets/FormationsIcon";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ValidationCode from "./pages/ValidationCode";
import NewPassword from "./pages/NewPassword";
import SuccessNewPassword from "./pages/SuccessNewPassword";
import NewsAdminRoutes from "./Routers/NewsAdminRoutes";
import SuperAdminRoutes from "./Routers/SuperAdminRoutes";
import Accounts from "./assets/AccountsIcon";
import {
  SUPERADMIN_DASHBOARD_LINKS,
  NEWSADMIN_DASHBOARD_LINKS,
  STUDENT_DASHBOARD_LINKS,
  TEACHER_DASHBOARD_LINKS,
} from "./lib/consts/sidebarLinks";
// import FormationsIcon from "./assets/FormationsIcon";

import { useSelector } from "react-redux";
import TeacherRoutes from "./Routers/TeacherRoutes";
const { Content, Footer, Sider } = Layout;

const App = () => {
  const a=localStorage.getItem("user")
  const isAuthenticated = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : useSelector((state) => state.Auth.role);


  
  const [collapsed, setCollapsed] = useState(false);
  const role = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.role
    : useSelector((state) => state.Auth.role);
  // const role = "newsAdmin";

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = () => {
    if (role === "admin") {
      return <AdminRoutes isAuthenticated={isAuthenticated} />;
    } else if (role === "etudiant") {
      return <StudentRoutes isAuthenticated={isAuthenticated} />;
    } else if (role === "newsAdmin") {
      return <NewsAdminRoutes isAuthenticated={isAuthenticated} />;
    } else if (role === "superAdmin") {
      return <SuperAdminRoutes isAuthenticated={isAuthenticated} />;
    }else if (role === "enseignant") {
      return <TeacherRoutes isAuthenticated={isAuthenticated} />;
    }
  };

  const sidebar = () => {
    if (role === "superAdmin") {
      return SUPERADMIN_DASHBOARD_LINKS.map((item) => (
        <SidebarItem
          key={item.key}
          link={item.link}
          text={item.text}
          icon={item.icon}
          collapsed={collapsed}
        />
      ));
    } else if (role === "etudiant") {
      return STUDENT_DASHBOARD_LINKS.map((item) => (
        <SidebarItem
          key={item.key}
          link={item.link}
          text={item.text}
          icon={item.icon}
          collapsed={collapsed}
        />
      ));
    } else if (role === "newsAdmin") {
      return NEWSADMIN_DASHBOARD_LINKS.map((item) => (
        <SidebarItem
          key={item.key}
          link={item.link}
          text={item.text}
          icon={item.icon}
          collapsed={collapsed}
        />
      ));
    }else if (role === "enseignant") {
      return TEACHER_DASHBOARD_LINKS.map((item) => (
        <SidebarItem
          key={item.key}
          link={item.link}
          text={item.text}
          icon={item.icon}
          collapsed={collapsed}
        />
      ));
    }
  };

  return (
    <>
      <BrowserRouter>
        {isAuthenticated ? (
          <Layout hasSider>
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
              <img
                src={issat}
                className={`overflow-hidden transition-all     ${
                  collapsed ? "w-14 m-2" : " m-5 w-36"
                }`}
              />
              <div>
                {sidebar()}

                <div className="mt-20">
                  <SidebarItem
                    icon={<ProfileIcon link="/profile" />}
                    link={"/profile"}
                    text={"profil"}
                    collapsed={collapsed}
                  />
                  <SidebarItem
                    icon={<LogoutIcon />}
                    link={"/login"}
                    text={"Déconnecter"}
                    collapsed={collapsed}
                  />
                </div>
              </div>
            </Sider>
            <Layout className={`${collapsed ? "ml-[80px]" : "ml-[200px]"}`}>
              <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
              <Content
                style={{
                  margin: "24px 16px 0",
                  overflow: "initial",
                }}
              >
                <div
                  style={{
                    padding: 24,
                    // textAlign: "center",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  {user()}
                </div>
              </Content>
              <OurFooter />
            </Layout>
          </Layout>
        ) : (
          <Routes>
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Signup />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/validationCode" element={<ValidationCode />} />
            <Route path="/newPassword" element={<NewPassword />} />
            <Route
              path="/successNewPassword"
              element={<SuccessNewPassword />}
            />
            <Route path="/*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;

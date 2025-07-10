import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import logo from "../assets/react.svg";
import { Layout, Button, Avatar } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Header } = Layout;
const NavBar = ({ collapsed, setCollapsed }) => {
  const t = useSelector((state) => state.Auth.myData?.role);
  const name = t ?t: useSelector((state) => state.Auth.role)
  return (
    <Header
      className="bg-soft-gray flex  justify-between"
      style={{
        padding: 0,
        //background: colorBgContainer,
        position: "sticky",
        top: 0,
        zIndex: 45,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
        <Button
          type="text"
          icon={<RxHamburgerMenu />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />

        <p className=" hidden sm:flex flex-wrap ">
          <span className="text-blue-950 text-[14px] ">Bienvenue,</span>{" "}
          <span className="text-blue-950 font-bold ml-1 text-[14px]">
            {name} 👋
          </span>
        </p>
      </div>
      <div className="flex items-center">
        <div
         
          className="relative text-xl rounded-full p-3 "
        >
          <span
            style={{ background: "rgb(254, 201, 15)" }}
            className="absolute inline-flex rounded-full h-2 w-2 right-3 top-5"
          />
          <div className="flex gap-3 items-center ">
            <IoNotificationsOutline />
          </div>
        </div>
        <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
          <Link to="/profile">
            <Avatar
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
                verticalAlign: "middle",
              }}
              size="large"
              gap={4}
            >
              {name}
            </Avatar>
          </Link>
        </div>
      </div>
      </Header>
  );
};

export default NavBar;

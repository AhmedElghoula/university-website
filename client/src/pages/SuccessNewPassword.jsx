import React from "react";
import issat from "../assets/issat.svg";
import drapeau from "../assets/drapeau.svg";
import checkIcon from "../assets/checkIcon.svg";
import { Form, Input, Button, Row, Col } from "antd";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const SuccessNewPassword = () => {
  return (
    <div>
      <nav className="flex items-center justify-between sm:px-10">
      <Link to='/'> <img src={issat} alt="issat"  /></Link>
        <img src={drapeau} alt="drapeau" />
      </nav>
      <div className="flex justify-center items-center flex-col space-y-5  font-sans my-auto h-[70vh]">
        <div className="text-center leading-6">
          <img className="w-[100px] sm:w-[120px]" src={checkIcon} alt="issat" />
          <p className=" font-bold w-[90vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
            Réinitialisation du mot de passe réussie{" "}
          </p>
        </div>
        <div className="w-[80vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
          <Link to={"/login"}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                borderRadius: "10px",
                height: "7vh",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                fontWeight: "bolder",
                marginTop: "10px",
                marginBottom: "6px",
              }}
            >
              Retour à la page de connection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessNewPassword;

import React from "react";
import issat from "../assets/issat.svg";
import drapeau from "../assets/drapeau.svg";
import { Form, Input, Button, Row, Col } from "antd";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const NewPassword = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

 
  return (
    <div>
      <nav className="flex items-center justify-between sm:px-10">
      <Link to='/'> <img src={issat} alt="issat"  /></Link>
        <img src={drapeau} alt="drapeau" />
      </nav>
      <div className="flex justify-center items-center flex-col space-y-9  font-sans mt-10">
        <div className="text-center leading-6">
          <h1 className="text-2xl leading-9 sm:text-3xl">
            Réinitialiser le mot de passe{" "}
          </h1>
          <p className="opacity-60 w-[90vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
            Veuillez taper quelque chose que vous vous souviendrez !
          </p>
        </div>
        <div className="w-[80vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
          <Form
            name="forgotpassword"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            style={{ width: "100%" }}
          >
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre nouveau mot de passe!",
                },
              ]}
            >
              <Input.Password
               size='large'
                placeholder="Votre nouveau mot de passe"
              />
            </Form.Item>

            {/* Field */}
            <Form.Item
              name="password2"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre mot de passe à nouveau!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Le nouveau mot de passe que vous avez entré ne correspond pas!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
               size='large'
                placeholder="Confirmer votre mot de passe"
              />
            </Form.Item>

            <Form.Item>
              <Link to={"/successNewPassword"}>
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
                  Valider{" "}
                </Button>
              </Link>
            </Form.Item>
            <Form.Item>
              <Link to="/login">
                <Button
                  htmlType="submit"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    height: "7vh",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    fontWeight: "bolder",
                  }}
                >
                  Retour à la page de connection
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;

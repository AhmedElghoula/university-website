import React from "react";
import issat from "../assets/issat.svg";
import drapeau from "../assets/drapeau.svg";
import { Form, Input, Button, Row, Col } from "antd";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const ValidationCode = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  const validateCode = (_, value) => {
    if (!value) {
      return Promise.reject("Please enter the code!");
    }
    if (!/^\d{5}$/.test(value)) {
      return Promise.reject("The code must be a five-digit number!");
    }
    return Promise.resolve();
  };

  return (
    <div>
      <nav className="flex items-center justify-between sm:px-10">
        <img src={issat} alt="issat" />
        <img src={drapeau} alt="drapeau" />
      </nav>
      <div className="flex justify-center items-center flex-col space-y-9  font-sans mt-10">
        <div className="text-center leading-6">
          <h1 className="text-2xl leading-9 sm:text-3xl">
            Saisir le code reçu
          </h1>
          <p className="opacity-60 w-[90vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
            Nous avons envoyé un mail avec un code d'activation à votre adresse
            e-mail SamiJabeur@gmail.com.
          </p>
        </div>
        <div className="w-[80vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
          <Form
            name="code_verification"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              digit1: "",
              digit2: "",
              digit3: "",
              digit4: "",
              digit5: "",
            }}
            style={{ width: "100%" }}
          >
            <Form.Item
              name="code"
              validateFirst
              rules={[{ validator: validateCode }]}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "auto",
                  width: "70%",
                }}
              >
                <Input
                 size='large'
                  className="text-4xl"
                  style={{ width: "18%", height: "60px", textAlign: "center" }}
                  maxLength={1}
                />
                <Input
                 size='large'
                  className="text-4xl"
                  style={{
                    width: "18%",
                    height: "60px",
                    textAlign: "center",
                  }}
                  maxLength={1}
                />
                <Input
                 size='large'
                  className="text-4xl"
                  style={{ width: "18%", height: "60px", textAlign: "center" }}
                  maxLength={1}
                />
                <Input
                 size='large'
                  className="text-4xl"
                  style={{ width: "18%", height: "60px", textAlign: "center" }}
                  maxLength={1}
                />
                <Input
                 size='large'
                  className="text-4xl"
                  style={{ width: "18%", height: "60px", textAlign: "center" }}
                  maxLength={1}
                />
              </div>
            </Form.Item>
            <Form.Item>
              <Link to={"/newPassword"}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    height: "7vh",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    fontWeight: "bolder",
                    marginTop: "20px",
                    marginBottom: "6px",
                  }}
                >
                  Vérifier{" "}
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

export default ValidationCode;

import React from "react";
  import issat from "../assets/issat.svg";
  import drapeau from "../assets/drapeau.svg";
  import { Form, Input, Button, Row, Col } from "antd";
  import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
   
  };

  const validateEmail = (rule, value, callback) => {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      callback();
    } else {
      callback("S'il vous plaît, mettez une adresse email valide!");
    }
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
            Mot de passe oublié ?
          </h1>
          <p className="opacity-60 w-[90vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
            Ne vous inquiétez pas ! Cela arrive Veuillez saisir l'e-mail de
            votre compte !
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
              name="email"
              rules={[
                { required: true, message: "Veuillez entrer votre email!" },
                { validator: validateEmail },
              ]}
            >
              <Input
                placeholder="SamiJabeur@gmail.com"
                size='large'

              />
            </Form.Item>

            <Form.Item>
              <Link to={"/validationCode"}>
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
                  Envoyer code
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

export default ForgotPassword;

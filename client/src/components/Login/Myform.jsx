import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col ,message} from "antd";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useDispatch } from "react-redux";
import { login } from "../../redux/Thunk/AuthThunk";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  let navigate = useNavigate();
  const [IsSubmitted, setIsSubmitted] = useState(false)
  const dispatch = useDispatch();
  const onFinish = (values) => {
  
    const email=values.email;
    const password=values.password;
    const request = { email, password };
    dispatch(
      login(
        request,
        message,
        setIsSubmitted,
        navigate
      )
    );
    // Handle form submission logic here
  };


  const validateEmail = (rule, value, callback) => {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      callback();
    } else {
      callback("S'il vous plaît, mettez une adresse email valide!");
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      style={{ width: "70%" }}
    >
      <Form.Item
        label="Adresse email"
        name="email"
        rules={[
          { required: true, message: "Veuillez entrer votre email!" },
          { validator: validateEmail },
        ]}
      >
        <Input
          placeholder="Entrer votre adresse email"
          
          size='large'
        />
      </Form.Item>

      <Form.Item
        label="Mot de passe"
        name="password"
        rules={[
          { required: true, message: "Veuillez entrer votre mot de passe!" },
        ]}
      >
        <Input.Password
          placeholder="Entrer votre mot de passe"
         
          size='large'
        />
      </Form.Item>
      <Form.Item
        style={{ textAlign: "end", marginTop: "-20px", fontSize: "5px" }}
      >
        <span>Mot de passe oublié? </span>
        <Link style={{ textDecoration: "underline" }} to="/forgotPassword">
          Cliquez ici
        </Link>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            borderRadius: "10px",
            height: "6vh",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          Se Connecter
        </Button>
        <Form.Item style={{ textAlign: "center" }}>
          <span>Vous n'avez pas de compte? </span>
          <Link style={{ textDecoration: "underline" }} to="/register">
            S'inscrire
          </Link>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

import React, { useState } from "react";
import {
  Button,
  message,
  Steps,
  Input,
  Form,
  Select,
  DatePicker,
} from "antd";
import issat from "../assets/issat.svg";
import { Layout } from "antd";
import { Modal, Upload } from "antd";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, verifyAcc } from "../redux/Thunk/AuthThunk";
const Signup = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const Fullname = useSelector((state) => ({
    ...state.Auth.resigter,
  }));
  
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <HiOutlinePhotograph size={40} className="stroke-primary-blue" />
    </button>
  );
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Vous ne pouvez télécharger que des fichiers JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("L'image doit être inférieure à 2 Mo!");
    }
    return isJpgOrPng && isLt2M;
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onFinish = (e) => {
    if (e === "done") {
  
    } else {
      const req ={
        cin:form.getFieldValue('cin'),
        email:form.getFieldValue('email')
      }
      dispatch(verifyAcc(req,message,next))
  
    }
  };

  const handleDispatch = () => {

    form.validateFields().then(() => {
      const req ={
        cin:form.getFieldValue('cin'),
        email:form.getFieldValue('email'),
        password:form.getFieldValue('password'),
      
        sexe:form.getFieldValue('gender'),
        birthDate:form.getFieldValue('birthdate'),
        phoneNumber:form.getFieldValue('phone'),
        address:form.getFieldValue('Address'),
        postalCode:form.getFieldValue('Postalcode'),
        photo:fileList
      }
      dispatch(register(req,message,navigate));
    })
    .catch((error) => {
  
      message.error("Please fix form errors before submitting.");
    });
  }
  
  const onFinishFailed = () => {
    message.error("Veuillez revérifier vos données!");
  };
  const steps = [
    {
      title: "Adresse Email et Mot de passe",
      content: (
        <Layout>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="p-5"
          >
            <Form.Item
              className="  "
              name="cin"
              label="CIN"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre CIN !",
                },
                {
                  pattern: /^\d{8}$/,
                  message: "Le format de CIN est invalde!",
                },
              ]}
              style={{ display: "inline-block", width: "calc(100%)" }}
              hasFeedback
            >
              <Input className="p-3 " />
            </Form.Item>

            <Form.Item
              className=""
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: " Email invalid!",
                },
                {
                  required: true,
                  message: "Veuillez entrer votre e-mail !",
                },
              ]}
              style={{ display: "inline-block", width: "calc(100%)" }}
              hasFeedback
            >
              <Input className="p-3 " />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mot de passe"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir votre mot de passe!",
                },
                {
                  min: 8,
                  message:
                    "Le mot de passe doit comporter au moins 8 caractères.",
                },
                {
                  pattern:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#/$%^&*-]).{8,}$/,
                  message:
                    "Le mot de passe doit contenir une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial",
                },
              ]}
              hasFeedback
            >
              <Input.Password className="p-3 " />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirmez le mot de passe"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Veuillez confirmer votre mot de passe !",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Le nouveau mot de passe que vous avez saisi ne correspond pas !"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="p-3 " />
            </Form.Item>

            <div className="flex justify-end">
              <Button
                className=" rounded-full"
                type="primary"
                htmlType="submit"
              >
                Suivant
              </Button>
            </div>
          </Form>
        </Layout>
      ),
    },
    {
      title: "Information de profil",
      content: (
        <Layout>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleDispatch}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="p-5  "
          >
            <div className=" flex justify-around flex-wrap-reverse">
              <div className=" ">
                <div className="flex gap-4  justify-around">
                  <Form.Item
                    name={"firstname"}
                    label="Nom"
                
                   
                    hasFeedback
                    
                  >
                    <Input size="large"     defaultValue={Fullname?.name} disabled />
                  </Form.Item>
                  <Form.Item
                    name={"lastname"}
                    label="Prenom"
                   
                   
                    hasFeedback
              
                  >
                    <Input size="large"  defaultValue={Fullname?.secondName}       disabled />
                  </Form.Item>
                </div>

                <Form.Item
                  name="gender"
                  label="Sexe"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez sélectionner le sexe !",
                    },
                  ]}
                  hasFeedback
                >
                  <Select placeholder="select your gender" size="large">
                    <Option value="MALE">Homme</Option>
                    <Option value="FEMALE">Femme</Option>
                  </Select>
                </Form.Item>
                <div className="flex gap-4 ">
                  <Form.Item
                    name="birthdate"
                    label="Date de naissance"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez saisir votre date de naissance !",
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker size="large" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez saisir votre numéro de téléphone !",
                      },
                      {
                        pattern: /^\d{8}$/,
                        message:
                          "Format de numéro de téléphone invalide (10 chiffres)",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input addonBefore={"+216"} size="large" />
                  </Form.Item>
                </div>

                <Form.Item
                  name={"Address"}
                  label="Addresse"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir votre address!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  name={"Postalcode"}
                  label="Code Postale"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir votre Postalcode!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input size="large" />
                </Form.Item>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                {/* <Form.Item
        name="Photo"
        label="Photo"
        rules={[{ required: true, message: 'Veuillez saisir votre Photo de profil !' }]}
    
      > */}
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-circle"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img alt="example" src={previewImage} />
                </Modal>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                className=" rounded-full"
                style={{ margin: "0 8px" }}
                onClick={() => prev()}
              >
                Retour
              </Button>
              <Button
                type="primary"
                className=" rounded-full" 
               htmlType="submit"
               // onClick={() => handleDispatch()}
                
              >
                Terminer
              </Button>
            </div>
          </Form>
        </Layout>
      ),
    },
  ];


  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Link to="/">
        {" "}
        <img
          src={issat}
          className={`overflow-hidden transition-all     
                " m-5 w-36"
              `}
        />
      </Link>
      <div className=" mx-auto px-4  sm:px-6 lg:px-60 ">
        <div className=" grid place-items-center ">
          <h2>Créer un compte</h2>
          <div className="mt-1 mb-8">
             vous avez déja un compte?
         
            <span className="ml-2"> <Link to='/login' className=" text-primary-blue" > Se connecter</Link></span>
          </div>
        </div>
        <Steps
          className="text-primary-blue  "
          current={current}
          items={items}
        />

        <div className=" p-7 ">{steps[current].content}</div>
      </div>
    </>
  );
};

export default Signup;

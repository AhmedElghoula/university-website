import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import TextArea from "antd/es/input/TextArea";
import upload from "../../assets/upload.svg";
import { createNews, createNewsSuccess, updateNews, updateNewsSuccess } from "../../redux/Thunk/NewsThunk";
import { useDispatch } from "react-redux";

const CreateNews = ({handleCancelCreateNews, news, editNews, setEditNews, setOpenCreateNews}) => {
  const [form] = Form.useForm();
  console.log("edit: ",editNews)

  const initialValues= {
    title: editNews && news.title || editNews ==0 && news.title || "",
    description: editNews && news.description || editNews ==0 && news.description || "",
    content: editNews && news.content || editNews ==0 && news.content || "",
  };
  console.log("initial:",initialValues)
  

  const dispatch= useDispatch()
  console.log("form", form)

  useEffect(() => {
    if (editNews + 1 && form) {
      form.setFieldsValue(initialValues);
    }
  }, [editNews, form, initialValues]);


  const onFinish = (values) => {
  
    // Handle form submission logic here
    const title = values.title;
    const description = values.description
    const content= values.content
    const req= {title , description, content}
    console.log("req:",req)
    if(editNews || editNews == 0){
      dispatch(updateNewsSuccess({...req, _id: news._id},message))
    }else{

      dispatch(createNewsSuccess(req, message))
    }
    setOpenCreateNews(false);

  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Titre"
          name="title"
          rules={[{ required: true, message: "Veuillez entrer le titre!" }]}
        >
          <Input placeholder="Taper le titre" size="large" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Veuillez entrer La description !" },
          ]}
        >
          <Input placeholder="Taper la description" size="large" />
        </Form.Item>

        <Form.Item
          label="Contenu"
          name="content"
          rules={[{ required: true, message: "Veuillez entrer Le contenu !" }]}
        >
          <TextArea
            rows={6}
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Vitae amet optio fugiat ex rem sunt ducimus quae voluptate, accusantium tenetur nesciunt neque omnis reprehenderit debitis dignissimos laudantium, architecto, alias voluptatem."
            size="large"
          />
        </Form.Item>

        {/* <Form.Item
          //   label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          className="w-[100%] text-center py-10 px-5 border-[#3366FF] border-opacity-20 border-dashed"
        >
          <Upload
            action="/upload.do"
            // listType="picture-card"
          >
            <button className="cursor-pointer border-none bg-transparent" type="button">
              <img src={upload} alt="upload" />
              <div className="pt-3">
                <span className="font-bold">
                  Glissez et déposez vos fichiers, Parcourir
                </span>
                <br />
                Formats pris en charge: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
              </div>
            </button>
          </Upload>
        </Form.Item> */}

        <div className="flex items-center flex-row justify-between">
          <Form.Item>
            <Button
              onClick={() => {
                // handleCancelCreateNews();
                setEditNews(null);
              }}
              className="bg-white  text-[#3366FF] border-[#3366FF]  w-28 xl:w-36"
              htmlType="reset"
              style={{
                borderRadius: "10px",
                height: "6vh",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Annuler{" "}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className="w-28 xl:w-36"
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: "10px",
                height: "6vh",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              {editNews || editNews == 0 ? "Modifier" : "Confirmer"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CreateNews;

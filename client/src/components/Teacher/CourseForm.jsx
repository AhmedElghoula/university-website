import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Upload, Select,message } from "antd";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import TextArea from "antd/es/input/TextArea";
import upload from "../../assets/upload.svg";
import FileCard from "../FileCard";
import { useDispatch, useSelector } from "react-redux";
import { createCou } from "../../redux/Thunk/TeacherThunk";
const { Dragger } = Upload;





const CourseForm = ({ handleCancelCourseForm }) => {
  const courses = useSelector((state) => ({
    ...state.Teacher.courses,
  }));

  const tab=[]
  courses?.result?.map((course) =>{
    course.subjects?.map((item) =>{
      const obj={
        id:item._id,
        name:item.name
      }
      tab.push(obj)

    })
  })

  
  const [addForm] = Form.useForm();
  const dispatch = useDispatch();
  const [file, setFile] = useState()
  const [base64, setBase64] = useState(null);
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
  const onFinish = async (values) => {

   
    let fileListt = [...fileList];
  fileListt = fileListt.slice(-1);
 
  // fileListt.forEach(function (file, index) {
  //     let reader = new FileReader();
  //     reader.onload = (e) => {

  //       setBase64(e.target.result);
  //       file.base64 = e.target.result;
  //       //setFile(file.base64);

  //     };
  //     reader.readAsDataURL(file);
  //    // reader.readAsDataURL(file.originFileObj);
  // });
  //console.log(fileListt)
    const formData = new FormData();
    // fileList.forEach((file) => {
    //   formData.append("file", file);
    // });
    formData.append("file", fileList[0]);
    formData.append("subject", values.filière);

   // const a = courses?.result?.filter(item => item._id=== values.filière);
  //  formData.append("subject", );

  //console.log(await toBase64(fileList[0]));
    setUploading(true);
    const req={
      file:await toBase64(fileList[0]),
      subject:values.filière,
      name:fileList[0].name
    }
   
    dispatch(createCou(req,message,setUploading,addForm.resetFields));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);


  const table1 =[]
  courses?.result?.map((item,index)=>{
    table1.unshift({ id:index ,value: item._id, label: item.name})
})

const table2 =[]
tab.map((item,index)=>{
  table2.unshift({ id:index ,value: item.id, label: item.name})
})


  const props = {
    name: "file",
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {},
  };
  return (
    <div>
      <Form
      form={addForm}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          //   label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          className="w-[100%] text-center py-10 px-5 border-[#3366FF] border-opacity-20 border-dashed"
        >
          <Dragger {...props}>
            <img src={upload} alt="upload" />
            <div className="pt-3">
              <span className="font-bold">
                Glissez et déposez vos fichiers, Parcourir
              </span>
              <br />
              Formats pris en charge: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
              PPT
            </div>
          </Dragger>
        </Form.Item>

        <Form.Item
          label="Matiere"
          name="filière"
          rules={[{ required: true, message: "Veuillez entrer la Matiere!" }]}

        >
          <Select  size="large" options={table2} />
        </Form.Item>
        {/* <Form.Item
          label="course"
          name="cours"
          rules={[{ required: true, message: "Veuillez entrer le cours!" }]}
          className="w-[40%]"
        >
          <Select mode="multiple" size="large" options={codes2} />
        </Form.Item> */}

        <div className="flex flex-wrap-reverse items-center justify-between">
          <Form.Item>
            <Button
              onClick={handleCancelCourseForm}
              className="bg-white  text-[#3366FF] border-[#3366FF] px-10"
              htmlType="submit"
              style={{
                //   width: "100%",
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
              className="px-10"
              type="primary"
              htmlType="submit"
              disabled={uploading}
              style={{
                borderRadius: "10px",
                height: "6vh",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              {uploading ? "chargement" : "Confirmer"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;

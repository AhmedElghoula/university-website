import { Button, Form, Input, InputNumber, Modal, Select, message } from "antd";
import React from "react";
import CourseForm from "./CourseForm";


const AddCoursePopup = ({handleOkCreateNews, handleCancelCreateNews, openCreateNews}) => {
  return (
    <Modal
      title="Ajouter cours"
      width={"70%"}
      open={openCreateNews}
      onOk={handleOkCreateNews}
      onCancel={handleCancelCreateNews}
      footer={null}
    >
      <CourseForm/>
    </Modal>
  );
};

export default AddCoursePopup;
import { Button, Form, Input, InputNumber, Modal, Select, message } from "antd";
import React from "react";
import CreateNews from "./CreateNews";
import "./popup.css"


const CreateNewsPopup = ({handleOkCreateNews, handleCancelCreateNews, openCreateNews,setEditNews,editNews, news , setOpenCreateNews}) => {
  return (
    <Modal
      title="Créer actualité"
      width={"70%"}
      open={openCreateNews}
      onOk={handleOkCreateNews}
      onCancel={handleCancelCreateNews}
      footer={null}
      className="ant-modal-lg-only-visible"
    >
      <CreateNews
        setEditNews={setEditNews}
        editNews={editNews}
        news={news}
        setOpenCreateNews={setOpenCreateNews}
      />
    </Modal>
  );
};

export default CreateNewsPopup;

import { Button, Form, Input, InputNumber, Modal, Select, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSubj } from "../../redux/Thunk/SuperAdminThunk";

const AddModulePopup = ({
  openAddModule,
  handleOkAddModule,
  handleCancelAddModule,
}) => {
  const [addForm] = Form.useForm();
  const dispatch = useDispatch();
  const Formations = useSelector((state) => ({
    ...state.SuperAdmin.Fomations,
  }));
  const table2 = [];

  Formations?.allFormations?.map((item, index) => {
    table2.push({ id: index, value: item._id, label: item.code });
  });

  const handleOkAdd = () => {
    addForm
      .validateFields()
      .then(() => {
        const req = {
          name: addForm.getFieldValue("name"),
          hc: addForm.getFieldValue("hc"),
          htd: addForm.getFieldValue("htd"),
          htp: addForm.getFieldValue("htp"),
          semester:addForm.getFieldValue("semester"),
          coefficient: addForm.getFieldValue("coef"),
          formation: addForm.getFieldValue("Formation"),
        };

        dispatch(
          createSubj  (req, message, handleOkAddModule, addForm.resetFields)
        );
      })
      .catch((error) => {
        console.error("Validation failed:", error);
        message.error("Please fix form errors before submitting.");
      });
  };
  return (
    <Modal
      title="Ajouter Module"
      width={"70%"}
      style={{ top: 10 }}
      onCancel={handleCancelAddModule}
      open={openAddModule}
      footer={[
        <Button key="back" onClick={handleCancelAddModule}>
          Annuler
        </Button>,
        <Button key="submit" type="primary" onClick={handleOkAdd}>
          Ajouter
        </Button>,
      ]}
    >
      <Form form={addForm} layout="vertical" className="p-8">
        <Form.Item
          name={"name"}
          label="Nom"
          rules={[{ required: true, message: "Veuillez saisir le Nom!" }]}
        >
          <Input
            size="large"
            placeholder="A1-Licence en EEA-Tronc Commun [EEA: Electronique Electrotechnique et Automatique] "
          />
        </Form.Item>

        <Form.Item
          name={"coef"}
          label="coefficient"
          rules={[
            { required: true, message: "Veuillez saisir le coefficient !" },
          ]}
        >
          <InputNumber size="large" min={1} max={100000} />
        </Form.Item>

        <div>
          <span className="">Nombres des heures:</span>
          <div className="mt-5 flex flex-wrap gap-20">
            <Form.Item
              name={"hc"}
              label="Cours"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le Nombres des heures !",
                },
              ]}
            >
              <InputNumber size="large" min={1} max={30} />
            </Form.Item>

            <Form.Item
              name={"htd"}
              label="TD"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le Nombres des heures !",
                },
              ]}
            >
              <InputNumber size="large" min={1} max={30} />
            </Form.Item>

            <Form.Item
              name={"htp"}
              label="TP"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le Nombres des heures !",
                },
              ]}
            >
              <InputNumber size="large" min={1} max={30} />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          name={"semester"}
          label="Semester"
          rules={[{ required: true, message: "Veuillez saisir le semester!" }]}
        >
          <Select
            size="large"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name={"Formation"}
          label="Formation"
          rules={[
            { required: true, message: "Veuillez saisir les Formation!" },
          ]}
        >
          <Select
            mode="multiple"
            size="large"
            placeholder="Fomation..."
            style={{ flex: 1 }}
            options={table2}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModulePopup;

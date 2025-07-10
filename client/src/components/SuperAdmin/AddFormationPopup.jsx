import { Button, Form, Input, InputNumber, Modal, Select, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createForma } from "../../redux/Thunk/SuperAdminThunk";
const AddFormationPopup = ({
  openAddFormation,
  handleOkAddFormation,
  handleCancelAddFormation,
}) => {
  const dispatch = useDispatch();

  const Formations = useSelector((state) => ({
    ...state.SuperAdmin.Fomations,
  }));

  // const table2= []

  // Formations?.allFormations?.map((item,index)=>{
  //     table2.unshift({ id:index ,value: item._id, label: item.code})
  // })
  const [addForm] = Form.useForm();

  const handleOkAdd = () => {
    addForm
      .validateFields()
      .then(() => {

        const req = {
          name: addForm.getFieldValue('name'),
          code: addForm.getFieldValue('code'),
          type: addForm.getFieldValue('type'),
          numberOfGroups: addForm.getFieldValue('nbGrp'),
        };
        //handleOkAddFormation();
        dispatch(createForma(req,message, handleOkAddFormation, addForm.resetFields))
      })
      .catch((error) => {
        console.error("Validation failed:", error);
        message.error("Please fix form errors before submitting.");
      });
  };
  return (
    <Modal
      title="Ajouter Formation"
      width={"70%"}
      onCancel={handleCancelAddFormation}
      open={openAddFormation}
      footer={[
        <Button key="back" onClick={handleCancelAddFormation}>
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
          name={"code"}
          label="Code"
          rules={[{ required: true, message: "Veuillez saisir le Code!" }]}
        >
          <Input size="large" placeholder="LEEA-A1" />
        </Form.Item>

        <Form.Item
          name={"type"}
          label="Type de formation"
          rules={[{ required: true, message: "Veuillez saisir le type!" }]}
        >
          <Select
            size="large"
            options={[
              { value: "LISENCE", label: "Licence" },
              { value: "MASTERE", label: "Mastere" },
              { value: "PREPARATOIRE", label: "Cycle Préparatoire" },
              { value: "INGENIEUR", label: "Cycle Ingénieur" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name={"nbGrp"}
          label="Nombre de groupes"
          rules={[
            {
              required: true,
              message: "Veuillez saisir le nombre de groupes!",
            },
          ]}
        >
          <InputNumber size="large" min={1} max={100000}  />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFormationPopup;

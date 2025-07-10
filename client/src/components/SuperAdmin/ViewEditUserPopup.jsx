import { Button, Form, Input, Modal, Radio, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAccountByCIN,
  getSubjectsFormation,
} from "../../redux/Thunk/SuperAdminThunk";

const ViewEditUserPopup = ({
  type,account,
  openViewEditUser,
  handleOkViewEditUser,
  handleCancelViewEditUser,}) => {
    const dispatch = useDispatch();
  
    console.log(account)

    const FormationsWithGrp=useSelector((state)=>({...state.SuperAdmin.Fomationswithgrp}));
    const table= []
  
    FormationsWithGrp?.formattedFormations?.map((item,index)=>{
        table.unshift({ id:index ,value: item, label: item})
    })
    const Formations=useSelector((state)=>({...state.SuperAdmin.Fomations}));
    const table2= []
   
    Formations?.allFormations?.map((item,index)=>{
        table2.unshift({ id:index ,value: item._id, label: item.code})
    })

    const Subjects=useSelector((state)=>({...state.SuperAdmin.subjects}));
    const table3= []
   
    Subjects?.formationsWithSubjects?.map((item,index)=>{
            item?.subjects?.map((subject,index)=>{table3.unshift({ id:index ,value: subject._id, label: subject.name})})
        
    })
    const codes2=[]
  
    Subjects?.formattedFormations?.map((item,index)=>{
      codes2.unshift({ id:index ,value: item, label: item})
  })
  

    const [roletype, setroletype] = useState("");
   
    const [addUser] = Form.useForm();
  
  const handleOkAdd = () => {
    addUser
      .validateFields()

      .then(() => {
        let req;
        if (addUser.getFieldValue("role") === "admin") {
          req = {
            cin: addUser.getFieldValue("cin"),
            name: addUser.getFieldValue("firstname"),
            secondName: addUser.getFieldValue("lastname"),
            role: addUser.getFieldValue("AdminRole"),
          };
        } else {
          req = {
            cin: addUser.getFieldValue("cin"),
            name: addUser.getFieldValue("firstname"),
            secondName: addUser.getFieldValue("lastname"),
            role: addUser.getFieldValue("role"),
            class: addUser.getFieldValue("Niveau"),
            classesToTeach: {
              groups: addUser.getFieldValue("grp"),
              Formations: addUser.getFieldValue("class"),
              subjects: addUser.getFieldValue("subject"),
            },
          };
        }
        //dispatch(addCompte(req, message, handleOkViewEditUser, addUser.resetFields));
      })
      .catch((error) => {
        message.error("Please fix form errors before submitting.");
      });
  };

  return (
    <Modal
      title={type="view"? "Consulter Compte" :"Modifier Compte"}
      width={"60%"}
      style={{ top: 10 }}
      onCancel={handleCancelViewEditUser}
      open={openViewEditUser}
      footer={[
        <Button key="back" onClick={handleCancelViewEditUser}>
          Annuler
        </Button>,
        <Button key="submit" type="primary" onClick={handleOkAdd}>
       {type="view"? "fermer" :"Modifier"}
        </Button>,
      ]}
    >
      <Form form={addUser} layout="vertical" className="p-8">
        {/* <Form.Item
          name={"role"}
          label="Role"
          rules={[{ required: true, message: "Veuillez Choisir le Role !" }]}
        >
          <Radio.Group buttonStyle="solid" className="flex justify-center">
            <Radio.Button
              value="etudiant"
              onClick={() => {
                setroletype("Etudiant");
              }}
            >
              Etudiant
            </Radio.Button>
            <Radio.Button
              value="enseignant"
              onClick={() => {
                setroletype("Enseignant");
              }}
            >
              Enseignant
            </Radio.Button>
            <Radio.Button
              value="admin"
              onClick={() => {
                setroletype("Admin");
              }}
            >
              Admin
            </Radio.Button>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item
          name={"cin"}
          label="CIN"
          rules={[
            { required: true, message: "Veuillez saisir le CIN!" },
            {
              pattern: /^\d{8}$/,
              message: "Le format de CIN est invalde!",
            },
          ]}
        >
          <Input defaultValue={account?.cin} size="large" />
        </Form.Item>
        <Form.Item
          name={"firstname"}
          label="Nom"
          rules={[{ required: true, message: "Veuillez saisir le Nom !" }]}
        >
          <Input  size="large" />
        </Form.Item>
        <Form.Item
          name={"lastname"}
          label="Prenom"
          rules={[{ required: true, message: "Veuillez saisir le Prenom !" }]}
        >
          <Input  size="large" />
        </Form.Item>

        {account?.role === "etudiant" && (
          <Form.Item
            name="Niveau"
            label={"Niveau d'etude"}
            rules={[
              {
                required: true,
                message: "Veuillez Choisir le niveau d'etude !",
              },
            ]}
          >
            <Select options={table} />
          </Form.Item>
        )}

        {roletype === "enseignant" && (
          <>
            <Form.Item
              name="class"
              label={"Formations"}
              rules={[
                {
                  required: true,
                  message: "Veuillez Choisir les Formations !",
                },
              ]}
            >
              <Select
                mode="multiple"
                options={table2}
                onChange={() => {
                  handleDispatchSubjects();
                }}
              />
            </Form.Item>
            <Form.Item
              name="grp"
              label={"Groupes"}
              rules={[
                { required: true, message: "Veuillez Choisir les Groupes !" },
              ]}
            >
              <Select mode="multiple" options={codes2} />
            </Form.Item>
            <Form.Item
              name="subject"
              label={"Module"}
              rules={[
                { required: true, message: "Veuillez Choisir le Module !" },
              ]}
            >
              <Select mode="multiple" options={table3} />
            </Form.Item>
          </>
        )}

        {roletype === "Admin" && (
          <Form.Item name="z" label={"Niveau d'etude de "}>
            <Form.Item
              name={"AdminRole"}
              label="Cadre"
              rules={[
                { required: true, message: "Veuillez Choisir le Cadre !" },
              ]}
            >
              <Radio.Group buttonStyle="solid" className="">
                <Radio.Button value="superAdmin">super Admin</Radio.Button>
                <Radio.Button value="respNote">Responsable Note</Radio.Button>
                <Radio.Button value="respDocAdmins">
                  Responsable Documentation Adminstratif
                </Radio.Button>
                <Radio.Button value="respPlanAcad">
                  Responsable Plan Acadimique
                </Radio.Button>
                <Radio.Button value="respActu">
                  Responsable Actualités
                </Radio.Button>
                <Radio.Button value="respBib">
                  Responsable Bibliotheque
                </Radio.Button>
                <Radio.Button value="respOffreStage">
                  Responsable Offres de stages
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ViewEditUserPopup;

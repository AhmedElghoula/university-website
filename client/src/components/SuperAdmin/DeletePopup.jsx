import { Button, Form, Input, InputNumber, Modal, Select, message } from 'antd'
import React from 'react'

const DeletePopup = ({open,handleOk,handleCancel,title}) => {
    const [addForm] = Form.useForm();
   
    const handleOkAdd=()=>{
        addForm.validateFields()
        .then(() => {

            
            handleOk()
        })
        .catch((error) => {
          console.error('Validation failed:', error);
          message.error('Please fix form errors before submitting.');
        });
    }
  return (
    <Modal
    title={`Vous etrêtes-vous sûr de supprimer ce ${title}! `}
    //width={'50%'}
    style={{ top: 250 }}
    onCancel={handleCancel}
    open={open}
    footer={[
        <Button key="back" onClick={handleCancel}>
          Annuler
        </Button>,
        <Button key="submit"  danger  onClick={handleOkAdd}>
          Supprimer
        </Button>,
     
      ]}
  >
   
  </Modal>

  )
}

export default DeletePopup
import React from 'react'
import { Button, Popconfirm, message } from "antd";
import File from "../assets/file.svg";
import pdf from "../assets/pdf.svg";
import image from "../assets/image.svg";
import ppt from "../assets/ppt.svg";
import word from "../assets/word.svg";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteCou } from '../redux/Thunk/TeacherThunk';
const FileType = (type) => {

  
    if (type.endsWith("presentation")) {
      return <img   src={ppt} className=" w-5 h-5"/>;
    } else if (type.endsWith("pdf")) {
      return <img src={pdf}  className=" w-5 h-5"/>;
    } else if (type.startsWith("image/")) {
      return <img src={image} className=" w-5 h-5"/>;
    } else if (type.endsWith("document")) {
      return  <img src={word} className=" w-5 h-5"/> ;
    }else {
        return  <img src={File} className=" w-5 h-5"/> ;
    }
  };


const FileCard = ({files,name,id}) => {
  
  const dispatch = useDispatch();

  function openBlobInNewWindow(blob) {
    // Create a URL for the Blob
    var blobURL = URL.createObjectURL(blob);
    
    // Open a new window with the Blob URL
    window.open(blobURL, '_blank');
}

  const confirm = async(e) => {

    dispatch(deleteCou(id,message));
    
  };
  const cancel = (e) => {
  
    message.error('Click on No');
  };

  const base64toBlob = (data) => {
    // Extract the data type from the prefix
    const dataType = data.match(/^data:(.+?);base64,/)[1];
  
    // Remove the prefix
    const base64Data = data.replace(/^data:.+?;base64,/, '');
  
    const bytes = atob(base64Data);
    const array = new Uint8Array(bytes.length);
  
    for (let i = 0; i < bytes.length; i++) {
      array[i] = bytes.charCodeAt(i);
    }
  
    return new Blob([array], { type: dataType });
  };


const f= base64toBlob(files)

   

    const handleDownload = () => {

 if (f.type.endsWith("pdf")){
  openBlobInNewWindow(f)

 }else{ const blob = new Blob([f]);
  const url = URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.download = name || "downloaded-file";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}, 2000);}
       


        
      };
  return (
    <div className='flex items-center justify-center gap-1'>
        <div>
        <Popconfirm
    title="Supprimer ce cours"
    description="Êtes-vous sûr de supprimer ce cours?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Supprimer"
    cancelText="Annuler"
  >
    <Button danger shape="circle" type="text"> <AiOutlineDelete/></Button>
  </Popconfirm>
        </div>
     <Button  onClick={handleDownload} size='large' className='bg-[#F4F4F4] text-sm  '>
        <div className='flex gap-2  justify-center items-center'>
        <span>

      { f?.type ? FileType(f?.type):""}
           
        </span>
     {name? name.substring(0, 13)+".." :""}
     </div>
      </Button>
      </div>
  )
}

export default FileCard
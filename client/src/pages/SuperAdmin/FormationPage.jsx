import { Button, Collapse, Radio, theme } from "antd";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import FormationTable from "../../components/SuperAdmin/FormationTable";
import { CaretRightOutlined } from "@ant-design/icons";
import ModuleTable from "../../components/SuperAdmin/ModuleTable";
import AddFormationPopup from "../../components/SuperAdmin/AddFormationPopup";
import AddModulePopup from "../../components/SuperAdmin/AddModulePopup";
import { useDispatch, useSelector } from "react-redux";
import { getAllFormations, getAllSubjects } from "../../redux/Thunk/SuperAdminThunk";


const FormationPage = () => {
    const [openAddFormation, setOpenAddFormation] = useState(false);
    const [openAddModule, setOpenAddModule] = useState(false);


    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllFormations());
      dispatch(getAllSubjects());
    },[])
  



    const showModalAddFormation = () => {
    setOpenAddFormation(true);
    };
    const handleOkAddFormation = (e) => {
    
    setOpenAddFormation(false);
    };
    const handleCancelAddFormation = (e) => {
    
    setOpenAddFormation(false);
    };


    const showModalAddModule = () => {
        setOpenAddModule(true);
        };
        const handleOkAddModule = (e) => {
        
        setOpenAddModule(false);
        };
        const handleCancelAddModule = (e) => {
        
        setOpenAddModule(false);
        };

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("large");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "Liste des Formations",
      children: (
        <>
          <div className="mb-3">
            <h3 className="font-bold flex items-start">Liste des Formations</h3>
          </div>
          <div className="flex  justify-between  flex-wrap  pb-3">
            <div className="my-1">
              <label className="mb-1">Taille du tableau:</label>{" "}
              <Radio.Group
                value={size}
                onChange={handleSizeChange}
                buttonStyle="solid"
              >
                <Radio.Button value="large">Gande</Radio.Button>
                <Radio.Button value="middle">Moyen</Radio.Button>
                <Radio.Button value="small">Petite</Radio.Button>
              </Radio.Group>
            </div>
            <div className="my-1">
              <Button
                type="primary"
                shape="round"
                
                onClick={() => showModalAddFormation()}
              >
                <div className="flex items-center gap-1 justify-center">
                  <IoIosAddCircleOutline size={18} />
                  Ajouter une Formation
                </div>
              </Button>
            </div>
          </div>
         <AddFormationPopup openAddFormation={openAddFormation} handleOkAddFormation={handleOkAddFormation} handleCancelAddFormation={handleCancelAddFormation}/>
          <FormationTable size={size} />
        </>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: "Liste des Modules",
      children: (
        <>
          <div className="mb-3">
            <h3 className="font-bold flex items-start">Liste des Modules</h3>
          </div>
          <div className="flex  justify-between  flex-wrap  pb-3">
            <div className="my-1">
              <label className="mb-1">Taille du tableau:</label>{" "}
              <Radio.Group
                value={size}
                onChange={handleSizeChange}
                buttonStyle="solid"
              >
                <Radio.Button value="large">Gande</Radio.Button>
                <Radio.Button value="middle">Moyen</Radio.Button>
                <Radio.Button value="small">Petite</Radio.Button>
              </Radio.Group>
            </div>
            <div className="my-1">
              <Button
                type="primary"
                shape="round"
                onClick={() => showModalAddModule()}
              >
                <div className="flex items-center gap-1 justify-center">
                  <IoIosAddCircleOutline size={18} />
                  Ajouter un Module
                </div>
              </Button>
            </div>
          </div>
          <AddModulePopup openAddModule={openAddModule} handleOkAddModule={handleOkAddModule} handleCancelAddModule={handleCancelAddModule}/>
          <ModuleTable size={size} />
        </>
      ),
      style: panelStyle,
    },
  ];

  return (
    <div className="pt-4">
      {loading ? (
        <div className="d-flex justify-content-center">
          <FaSpinner size="large" />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-4 shadow-sm ">
          <h3>Fomations et Modules</h3>
          <Collapse
            bordered={false}
            //defaultActiveKey={['1']}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{
              background: token.colorBgContainer,
            }}
            items={getItems(panelStyle)}
          />
        </div>
      )}
    </div>
  );
};

export default FormationPage;

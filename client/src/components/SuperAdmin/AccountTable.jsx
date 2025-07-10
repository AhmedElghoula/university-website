import { useState, useEffect, useRef, useContext } from "react";
import {
  Table,
  Typography,
  Space,
  Spin,
  Button,
  Input,
  Form,
  Modal,
  InputNumber,
  message,
  Tag,
  Radio,
  Select,
} from "antd";
import { FaEye } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdModeEdit, MdDelete } from "react-icons/md";
import {
  SearchOutlined,
  ExclamationCircleFilled,
  UserAddOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import Highlighter from "react-highlight-words";
import {  deteleAcc, getAccByCIN } from "../../redux/Thunk/SuperAdminThunk";
import { useNavigate } from "react-router-dom";
import AddUserPopup from "./AddUserPopup";
//import axios from "../../../Utils/axios";
import moment from "moment";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faFileExport } from "@fortawesome/free-solid-svg-icons";

const { Text } = Typography;
const { confirm, info } = Modal;
import { useDispatch, useSelector } from "react-redux";
import ViewEditUserPopup from "./ViewEditUserPopup";
const AccountTable = (loading,currentPage,numberOfPages) => {
  const comptes=useSelector((state)=>({...state.SuperAdmin.comptes}));

  const [openViewEditUser, setopenViewEditUser] = useState(false);
  const [Cin, setCin] = useState();

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



  const [openAddUser, setopenAddUser] = useState(false);
  const [openAddModule, setOpenAddModule] = useState(false);
  const showModalopenAddUser = () => {
  setopenAddUser(true);
  };
  const handleOkAddUser = (e) => {
  
  setopenAddUser(false);
  };
  const handleCancelAddUser = (e) => {
  
  setopenAddUser(false);
  };


  const dispatch = useDispatch();
  const [soldForm] = Form.useForm();
  const [addUser] = Form.useForm();
  const [roletype, setroletype] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [size, setSize] = useState("large");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  

  const showDeleteItem=(id)=>{ 
    confirm({
      title: 'Modifier ce compte!',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Supprimer',
      okType: 'danger',
     
      cancelText: 'Annuler',
      onOk() {
          dispatch(deteleAcc(id,message))
      },
      onCancel() {
        console.log('Annuler');
      },
    });
    }




    const showEditItem=(account)=>{ 
      confirm({
        title: 'Vous etrêtes-vous sûr de supprimer ce compte!',
        icon: <ExclamationCircleFilled />,
        content:(
          
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
            <Input  defaultValue={account?.name} size="large" />
          </Form.Item>
          <Form.Item
            name={"lastname"}
            label="Prenom"
            rules={[{ required: true, message: "Veuillez saisir le Prenom !" }]}
          >
            <Input  defaultValue={account?.secondName}  size="large" />
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
              <Select defaultValue={account.class} options={table} />
            </Form.Item>
          )}
  
          {account?.role === "enseignant" && (
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
  
          {account?.role === "Admin" && (
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
        ),
        okText: 'Modifier',
       // okType: 'danger',
       
        cancelText: 'Annuler',
        onOk() {
            dispatch(deteleAcc(id,message))
        },
        onCancel() {
          console.log('Annuler');
        },
      });
    
      
    }
  
  //   info({
  //     title: "Voulez-vous",
  //     icon: <ExclamationCircleFilled />,
  //     content: (
  //       <Form form={addUser} layout="vertical" className="pt-4">
         
  //         {role==='Etudiant'&&
  //         <Form.Item name="Niveau" label={<Text strong>Niveau d'etude de {nom}</Text>}>
  //         <Select options={[{ value: 'lucy', label: 'Lucy' }]}/>
  //         </Form.Item> }

  //         {role==='Enseignant'&&
  //         <Form.Item name="class" label={<Text strong>Niveau d'etude de {nom}</Text>}>
  //         <Select options={[{ value: 'lucy', label: 'Lucy' }]}/>
  //         </Form.Item> }

  //         {role==='Admin'&&
  //         <Form.Item name="z" label={<Text strong>Niveau d'etude de {nom}</Text>}>
  //          <Form.Item
  //           name={"AdminRole"}
  //           label="Cadre"
  //           rules={[{ required: true, message: "Veuillez Choisir le Cadre !" }]}
  //         >
  //           <Radio.Group buttonStyle="solid" className="flex justify-center">
  //             <Radio.Button
  //               value="Admin A"
              
  //             >
  //               Admin A
  //             </Radio.Button>
  //             <Radio.Button
  //               value="Admin B"
              
  //             >
  //               Admin B
  //             </Radio.Button>
  //             <Radio.Button
  //               value="Admin c"
  //             >
  //               Admin c
  //             </Radio.Button>
  //           </Radio.Group>
  //         </Form.Item>
  //         </Form.Item> }
  //       </Form>
       
  //     ),
  //     okText: "Terminer",
  //     onOk() {
  //       addUser.validateFields()
  //       .then(() => {
  //         // Handle form submission logic based on role and form values
  //         console.log('Form values:', addUser.getFieldsValue()); // Example usage
  //       })
  //       .catch((error) => {
  //         console.error('Validation failed:', error);
  //         message.error('Please fix form errors before submitting.');
  //       });
  //     },
  //     onCancel() {},
  //   });
  // }

 
  // const showAddAccount = () => {
  //   confirm({
  //     width: "70%",
  //     title: "Ajouter un Compte",
  //     icon: <UserAddOutlined />,
  //     content: (
  //       <Form form={addUser} layout="vertical" className="p-8">
  //         <Form.Item
  //           name={"role"}
  //           label="Role"
  //           rules={[{ required: true, message: "Veuillez Choisir le Role !" }]}
  //         >
  //           <Radio.Group buttonStyle="solid" className="flex justify-center">
  //             <Radio.Button
  //               value="Etudiant"
  //               onClick={() => {
  //                 setroletype("Etudiant");
  //               }}
  //             >
  //               Etudiant
  //             </Radio.Button>
  //             <Radio.Button
  //               value="Enseignant"
  //               onClick={() => {
  //                 setroletype("Enseignant");
  //               }}
  //             >
  //               Enseignant
  //             </Radio.Button>
  //             <Radio.Button
  //               value="Admin"
  //               onClick={() => {
  //                 setroletype("Admin");
  //               }}
  //             >
  //               Admin
  //             </Radio.Button>
  //           </Radio.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name={"cin"}
  //           label="CIN"
  //           rules={[
  //             { required: true, message: "Veuillez saisir le CIN!" },
  //             {
  //               pattern: /^(?=.*\d).{8,}$/,
  //               message: "Le format de CIN est invalde!",
  //             },
  //           ]}
  //         >
  //           <Input size="large" />
  //         </Form.Item>
  //         <Form.Item
  //           name={"firstname"}
  //           label="Nom"
  //           rules={[{ required: true, message: "Veuillez saisir le Nom !" }]}
  //         >
  //           <Input size="large" />
  //         </Form.Item>
  //         <Form.Item
  //           name={"lastname"}
  //           label="Prenom"
  //           rules={[{ required: true, message: "Veuillez saisir le Prenom !" }]}
  //         >
  //           <Input size="large" />
  //         </Form.Item>
  //       </Form>
  //     ),
  //     okText: "Ajouter",
  //     onOk() {
  //       addUser.validateFields()
  //       .then(() => {
        
         
  //       })
  //       .catch((error) => {
  //         message.error('Validation failed ');

  //       });
  //     },
  //     onCancel() {},
  //   });
  // };


  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Recherche ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            // style={{
            //   width: 90,
            // }}
          >
            Recherche
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Réinitialiser
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "CIN",
      dataIndex: "cin",
      ...getColumnSearchProps("cin", "CIN"),
    },
    {
      title: "Nom",
      dataIndex: "name",
      ...getColumnSearchProps("name", "Nom"),
    },
    {
      title: "Prénom",
      dataIndex: "secondName",
      ...getColumnSearchProps("secondName", "Prénom"),
    },

    {
      title: "Role",
      render: (_, account) => (
        <Text>
          <Tag>{account.role} </Tag>
        </Text>
      ),
      filters: [
        {
          text: <Tag>Admin</Tag>,
          value: true,
        },
        {
          text: <Tag>Etudient</Tag>,
          value: false,
        },
        {
          text: <Tag></Tag>,
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
  

    {
      title: "Statut",
      render: (_, account) => (
        <Text>
          {account.status === true ? (
            <Tag color="green">Actif</Tag>
          ) : (
            <Tag color="red">Inactif</Tag>
          )}
        </Text>
      ),
      filters: [
        {
          text: <Tag color="green">Actif</Tag>,
          value: true,
        },
        {
          text: <Tag color="red">Inactif</Tag>,
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      width: 180,
      render: (_, account) => (
        <Space size="middle">
       

          <Button shape="circle" icon={<FaEye />} size={size} />
          <Button shape="circle" icon={<MdModeEdit />} size={size}  onClick={()=>{showEditItem(account)}}/>
          <Button shape="circle" danger icon={<MdDelete />} size={size}  onClick={()=>showDeleteItem(account.cin)}/>
           
          <>
            {account.status === true ? (
              <Button
                size="small"
                type="primary"
                danger
                //   onClick={async () => {
                //     await axios.patch(
                //       "/api/auth/disable/" + account.matricule
                //     );
                //     account.status = false;
                //     const temp = accounts.filter((emp) =>
                //       emp.matricule === account.matricule ? account : emp
                //     );
                //     setaccounts(temp);
                //   }}
              >
                Désactiver
              </Button>
            ) : (
              <Button
                size={size}
                shape="round"
                //   onClick={async () => {
                //     await axios.patch(
                //       "/api/auth/activate/" + account.matricule
                //     );
                //     account.status = true;
                //     const temp = accounts.filter((emp) =>
                //       emp.matricule === account.matricule ? account : emp
                //     );
                //     setaccounts(temp);
                //   }}
              >
                Activer
              </Button>
            )}
            {/* <Button
              size="small"
              type="primary"
              onClick={() => showConfirm(account.matricule, account.sold)}
            >
              Modifier solde
            </Button>{" "} */}
          </>
        </Space>
      ),
    },
  ];

  const Navigate = useNavigate();

  const [accounts, setaccounts] = useState([
    {
      cin: 1,
      name: "John",
      secondName: " Brown",
      role: "Admin",
      embaucheDate: 32,
      Statut:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      cin: 2,
      name: "Jim ",
      secondName: " Green",
      role: "Etudiant",
      embaucheDate: 42,
      sold: "London No. 1 Lake Park",
      Statut:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
  ]);
 

  //   const handleExportToXLSX = () => {
  //     const data = employees.map((record) => {
  //       return {
  //         "Nom et prénom": record.fullName,
  //         Matricule: record.matricule,
  //         Poste: record.Poste,
  //         "Numéro CIN": record.CIN,
  //         RIB: record.Rib,
  //         "Date d'embauche": moment(record.embaucheDate).format("DD/MM/YYYY"),
  //         "Email professionnel": record.email,
  //         "Email personnel": record._personal_email,
  //         Téléphone: record.phoneNum,
  //         Adresse: record.address,
  //         "Date de naissance": moment(record.birthDate).format("DD/MM/YYYY"),
  //         "Lieu de naissance": record.birthPlace,
  //         "Type de contrat": record.contractType,
  //         "Solde de congé": record.sold,
  //       };
  //     });

  //     const worksheet = XLSX.utils.json_to_sheet(data);

  //     const workbook = XLSX.utils.book_new();

  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  //     XLSX.writeFile(
  //       workbook,
  //       Liste des collaborateur ${moment().format("DD/MM/YYYY HH-mm")}.xlsx
  //     );
  //   };

  //   useEffect(() => {
  //     async function fetchEmployees() {
  //       const { data } = await axios.get("/api/employees/");
  //       if (data.status === "success") {
  //         setEmployees(data.employees);
  //         setLoading(false);
  //       }
  //     }
  //     fetchEmployees();
  //   }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  /* eslint-disable-next-line */
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };
  return (
    <div className="pt-4">
      {!loading ? (
        <div className="d-flex justify-content-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-4 shadow-sm ">
          <div className="mb-3">
            <h3 className="font-bold flex items-start">Liste des Comptes</h3>
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
                //onClick={handleExportToXLSX}
                onClick={() => showModalopenAddUser()}
              >
                <div className="flex items-center gap-1 justify-center">
                  <IoIosAddCircleOutline size={18} />
                  Ajouter
                </div>
              </Button>
            </div>
          </div>
        <AddUserPopup openAddUser={openAddUser} handleOkAddUser={handleOkAddUser} handleCancelAddUser={handleCancelAddUser}/>
   
          <Table
            className="shadow-sm"
            columns={columns}
            size={size}
            dataSource={comptes.allAccounts}
            scroll={{ x: "max-content" }}
          />
        </div>
      )}
    </div>
  );
};

export default AccountTable;

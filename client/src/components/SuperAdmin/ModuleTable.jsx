import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
  Typography,
} from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { FaEye } from "react-icons/fa";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { SearchOutlined,ExclamationCircleFilled } from "@ant-design/icons";
import DeletePopup from "./DeletePopup";
import { useDispatch, useSelector } from "react-redux";
import { deteleSubj } from "../../redux/Thunk/SuperAdminThunk";
const { confirm } = Modal;
const ModuleTable = ({ size }) => {
  const dispatch = useDispatch();

  const Subjects = useSelector((state) => ({
    ...state.SuperAdmin.subjects,
  }));


   
    const [openDelete, setOpenDelete] = useState(false);
    const showModalDelete = () => {
    setOpenDelete(true);
    };
    const handleOkDelete = (e) => {
    
    setOpenDelete(false);
    };
    const handleCancelDelete = (e) => {
    
    setOpenDelete(false);
    };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [subjects, setsubjects] = useState([
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

  const showDeleteItem=(id)=>{ 
    confirm({
      title: 'Vous etrêtes-vous sûr de supprimer ce compte!',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        dispatch(deteleSubj(id, message));
      },
      onCancel() {
        console.log('Annuler');
      },
    });
    }
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
      title: "Nom",
      dataIndex: "name",
      ...getColumnSearchProps("name", "Nom"),
    },
    {
      title: "Code",
      dataIndex: "code",
      ...getColumnSearchProps("code", "Code"),
    },

    // {
    //   title: "Role",
    //   render: (_, subject) => (
    //     <Text>
    //       <Tag>{subject.role} </Tag>
    //     </Text>
    //   ),
    //   filters: [
    //     {
    //       text: <Tag>Admin</Tag>,
    //       value: true,
    //     },
    //     {
    //       text: <Tag>Etudient</Tag>,
    //       value: false,
    //     },
    //     {
    //       text: <Tag></Tag>,
    //       value: false,
    //     },
    //   ],
    //   onFilter: (value, record) => record.status === value,
    // },
    // {
    //   title: "Date d'embauche",
    //   dataIndex: "embaucheDate",
    //   sorter: (a, b) => moment(a.embaucheDate) - moment(b.embaucheDate),
    //   render: (text) => <Text>{moment(text).format("DD/MM/YYYY")}</Text>,
    // },

    // {
    //   title: "Statut",
    //   render: (_, subject) => (
    //     <Text>
    //       {subject.status === true ? (
    //         <Tag color="green">Actif</Tag>
    //       ) : (
    //         <Tag color="red">Inactif</Tag>
    //       )}
    //     </Text>
    //   ),
    //   filters: [
    //     {
    //       text: <Tag color="green">Actif</Tag>,
    //       value: true,
    //     },
    //     {
    //       text: <Tag color="red">Inactif</Tag>,
    //       value: false,
    //     },
    //   ],
    //   onFilter: (value, record) => record.status === value,
    // },
    {
      title: "Actions",
      width: 250,
      render: (_, subject) => (
        <Space size="middle">
          {/* <Button
                size="small"
                type="primary"
                // onClick={() => {
                //   Navigate("/administration/subjects/" + subject.matricule);
                // }}
                onClick={() => showConfirm(subject.matricule, subject.sold)}
              >
                Voir
              </Button> */}

          <Button shape="circle" icon={<FaEye />} size={size} />
          <Button shape="circle" icon={<MdModeEdit />} size={size} />
          <Button shape="circle" danger icon={<MdDelete />} size={size}  onClick={()=>showDeleteItem(subject._id)}/>
        </Space>
      ),
    },
  ];


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
 

  return (
    <>
   
    <Table
      className="shadow-sm"
      columns={columns}
      size={size}
      dataSource={Subjects.allSubjects}
      scroll={{ x: "max-content" }}
    />
    </>
  );
};

export default ModuleTable;

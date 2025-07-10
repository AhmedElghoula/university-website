import { Button, Input, Modal, Space, Table, message } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { FaEye } from "react-icons/fa";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { deteleForma } from "../../redux/Thunk/SuperAdminThunk";
import { SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

const { confirm } = Modal;
const FormationTable = ({ size }) => {
  const Formations = useSelector((state) => ({
    ...state.SuperAdmin.Fomations,
  }));

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();

  const showDeleteItem = (id) => {
    confirm({
      title: "Vous etrêtes-vous sûr de supprimer ce compte!",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Supprimer",
      okType: "danger",
      cancelText: "Annuler",
      onOk() {
        dispatch(deteleForma(id, message));
      },
      onCancel() {
        console.log("Annuler");
      },
    });
  };

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
    //   render: (_, formation) => (
    //     <Text>
    //       <Tag>{formation.role} </Tag>
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
    //   render: (_, formation) => (
    //     <Text>
    //       {formation.status === true ? (
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
      render: (_, formation) => (
        <Space size="middle">
          {/* <Button
                size="small"
                type="primary"
                // onClick={() => {
                //   Navigate("/administration/formations/" + formation.matricule);
                // }}
                onClick={() => showConfirm(formation.matricule, formation.sold)}
              >
                Voir
              </Button> */}

          <Button shape="circle" icon={<FaEye />} size={size} />
          <Button shape="circle" icon={<MdModeEdit />} size={size} />
          <Button
            shape="circle"
            danger
            icon={<MdDelete />}
            size={size}
            onClick={() => showDeleteItem(formation._id)}
          />
        </Space>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <>
      <Table
        className="shadow-sm"
        columns={columns}
        size={size}
        dataSource={Formations.allFormations}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default FormationTable;

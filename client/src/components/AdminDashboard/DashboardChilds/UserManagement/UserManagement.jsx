import { useEffect, useRef, useState } from "react";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { useAdminStore } from "../../../../store/adminStore.js";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    phone: "1234567890",
    dob: "1990-01-01",
    nic: "1234567890V",
  },
];

const UserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();
  const { getStudentData, studentData,deleteStudentData, isLoading, error } = useAdminStore();
  const searchInput = useRef(null);

// GET student data
useEffect(() => {
  const fetchStudentData = async () => {
    try {
      await getStudentData();
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  console.log("Fetching student data");
  fetchStudentData();

  const intervalId = setInterval(() => {
    console.log("Fetching student data at interval");
    fetchStudentData();
  }, 60000); 

  // Cleanup interval on component unmount
  return () => clearInterval(intervalId);
}, [getStudentData]);

  // Edit user
  const handleEditUser = (userId) => {
    if (userId) {
      navigate(`/admin/users/adduser/${userId}`);
    } else {
      console.error("User ID is undefined");
    }
  };

  // Delete user
const handleDeleteUser = (userId, name) => {
  if (userId) {
    const confirmDelete = async () => {
      try {
        await deleteStudentData(userId);
        toast.success("Student deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
      } catch (error) { 
        toast.error("Error deleting student");
        console.error("Error deleting student:", error);
      }
    };

    Modal.confirm({
      title: "Are you sure you want to delete this student?",
      content: `Name: ${name}`,
      okText: "Yes",
      okType: "danger",
      icon: <DeleteOutlined />,
      cancelText: "No",
      style: {
        position: "relative",
        top: "40%",
      },
      onOk: confirmDelete,
      onCancel() {
        console.log("Delete action cancelled");
      },
    });
  } else {
    console.error("User ID is undefined");
  }
};
  

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

    const filtered = data.filter((record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(selectedKeys[0].toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setFilteredData(data);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
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
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
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
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
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

  console.log("Student Data:", studentData);



  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "5%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "15%",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      width: "10%",
      ...getColumnSearchProps("dob."),
    },
    {
      title: "NIC",
      dataIndex: "nic",
      key: "nic",
      width: "10%",
      ...getColumnSearchProps("nic"),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="bg-blue-400 hover:bg-blue-600"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record._id)}
          />
          <Button
            type="primary"
            danger
            className="bg-red-400 hover:bg-red-600 text-white"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record._id,record.name)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col p-10">
      <Table
        className="mt-4"
        columns={columns}
        dataSource={studentData}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};

export default UserManagement;

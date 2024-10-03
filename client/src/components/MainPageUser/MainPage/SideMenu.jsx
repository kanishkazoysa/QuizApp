import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, ConfigProvider, Typography } from "antd";
import { 
  DashboardOutlined, 
  UserOutlined, 
  FormOutlined, 
} from '@ant-design/icons';
import logo from "../../../assets/logo.jpg";
import './MainDashboard.css';

const { Title } = Typography;

function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type };
}

const items = [
    getItem("Home", "/user", <DashboardOutlined />),
    getItem("Quiz", "/user/quiz", <UserOutlined />),
    getItem("Contact", "/user/contact", <FormOutlined />),
];

function SideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState("/user");

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#001f3f', // Dark blue color
                    borderRadius: 6,
                },
                components: {
                    Menu: {
                        itemHeight: 50,
                        itemHoverColor: '#001f3f', // Dark blue color
                        itemSelectedColor: '#ffffff', // White color for selected text
                        itemSelectedBg: '#001f3f', // Dark blue color for selected background
                    },
                },
            }}
        >
            <div className="Admin_SideMenu" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", marginBottom: '30px', cursor: 'pointer' }}>
                    <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKeys]}
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    items={items}
                    style={{
                        borderRight: 'none',
                    }}
                />
            </div>
        </ConfigProvider>
    );
}

export default SideMenu;
import React, { useState } from 'react';
import { Layout, Menu, Typography, Row, Col, Badge, Button } from 'antd';
import { BookOutlined, BarChartOutlined, FileDoneOutlined, MessageOutlined, SettingOutlined, BellOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import "antd/dist/reset.css";
import Chatbot from "./Chatbot.jsx";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from 'react-router-dom';
import ExamList from './ExamList.jsx';
import Stats from './Stats.jsx';
import Notes from './Notes.jsx';
import Param from './Param.jsx';
import MesExams from './MesExams.jsx';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

// Définir les couleurs
const BLUE_COLOR = '#1976d2'; // Couleur principale (bleu)
const WHITE_COLOR = '#fff'; // Blanc
const LIGHT_GRAY_COLOR = '#f0f2f5'; // Gris clair

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('1');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/connexion");
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case '1':
                return <ExamList />;
            case '3':
                return <Stats />;
            case '4':
                return <Notes />;
            case '5':
                return <Chatbot />;
            case '6':
                return <Param />;
            default:
                return <MesExams />;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', background: BLUE_COLOR, color: WHITE_COLOR }}>
            {/* Sider */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                theme="light"
                style={{ background: BLUE_COLOR, color: WHITE_COLOR }}
                trigger={
                    <div
                        style={{
                            background: BLUE_COLOR,
                            color: WHITE_COLOR,
                            textAlign: 'center',
                            padding: '10px 0',
                            cursor: 'pointer',
                        }}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </div>
                }
            >
                {!collapsed && (
                    <div style={{ textAlign: 'center', padding: 20, color: WHITE_COLOR, fontSize: 18, background: BLUE_COLOR }}>
                        Dashboard
                    </div>
                )}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={(e) => setSelectedMenu(e.key)}
                    style={{ background: BLUE_COLOR, color: WHITE_COLOR }}
                >
                    <Menu.Item key="1" icon={<BookOutlined />}>Mes Soumissions</Menu.Item>
                    <Menu.Item key="7" icon={<BookOutlined />}>Mes Examens</Menu.Item>
                    <Menu.Item key="3" icon={<BarChartOutlined />}>Statistiques</Menu.Item>
                    <Menu.Item key="4" icon={<FileDoneOutlined />}>Notes et Appréciations</Menu.Item>
                    <Menu.Item key="5" icon={<MessageOutlined />}>ChatBot</Menu.Item>
                    <Menu.Item key="6" icon={<SettingOutlined />}>Paramètres</Menu.Item>
                </Menu>
            </Sider>

            {/* Layout principal */}
            <Layout style={{ background: BLUE_COLOR }}>
                {/* Header */}
                <Header style={{ background: WHITE_COLOR, padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ color: BLUE_COLOR }}
                    />
                    <Title level={4} style={{ margin: 0, color: BLUE_COLOR }}>
                        Bienvenue, {localStorage.getItem("prenom")} {localStorage.getItem("nom")}
                    </Title>
                    <div>
                        <Badge count={5} style={{ marginRight: 30 }}>
                            <BellOutlined style={{ fontSize: 18, marginRight: 30, color: BLUE_COLOR }} />
                        </Badge>
                        <Button
                            onClick={handleLogout}
                            icon={<LogoutIcon />}
                            style={{ backgroundColor: BLUE_COLOR, color: WHITE_COLOR, fontSize: 16 }}
                        >
                            Déconnexion
                        </Button>
                    </div>
                </Header>

                {/* Content */}
                <Content style={{ padding: 20, background: LIGHT_GRAY_COLOR, minHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
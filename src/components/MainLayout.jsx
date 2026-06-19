import { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, theme } from 'antd';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  CalendarOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import useAuth from '@/hooks/useAuth';

const { Header, Sider, Content } = Layout;

const itensMenu = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/alunos',
    icon: <TeamOutlined />,
    label: 'Alunos',
  },
  {
    key: '/turmas',
    icon: <BookOutlined />,
    label: 'Turmas & Disciplinas',
  },
  {
    key: '/calendario',
    icon: <CalendarOutlined />,
    label: 'Calendário Letivo',
  },
  {
    key: '/configuracoes',
    icon: <SettingOutlined />,
    label: 'Configurações',
  },
];

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const itensDropdown = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sair',
      onClick: logout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" width={240}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#002140', padding: '0 16px', gap: 8 }}>
          <BookOutlined style={{ color: '#1890ff', fontSize: 22 }} />
          {!collapsed && (
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, whiteSpace: 'nowrap' }}>
                Plataforma - TCC
            </span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={itensMenu}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px 0 16px', background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)', zIndex: 1 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Dropdown menu={{ items: itensDropdown }} placement="bottomRight">
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                <span style={{ fontWeight: '600', color: '#262626' }}>{usuario?.nome || 'Diretor'}</span>
                <span style={{ fontSize: '11px', color: '#8c8c8c' }}>{usuario?.role || 'Administradores'}</span>
              </div>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, minHeight: 280, overflow: 'initial' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;

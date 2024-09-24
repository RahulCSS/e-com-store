import React, { useState } from 'react';
import { Layout, Menu, Table, Button, Tag } from 'antd';
import {
  ShoppingOutlined,
  UserOutlined,
  RadarChartOutlined,
  ShopOutlined,
  ProductOutlined,
  TruckOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';
import Sellers from '../components/Sellers';
import Products from '../components/Products';
import Dashboard from '../components/Dashboard';
import Orders from '../components/Orders';
import Customers from '../components/Customers';
import Complaints from '../components/CustomerService';
import DeliveryPartner from '../components/DeliveryPartner';

const { Header, Content, Sider } = Layout;
const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  

  const menuClickHandler = (e) => {
    setSelectedMenu(e.key);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <Customers/>;
      case 'orders':
        return <Orders />;
      case 'sellers':
        return <Sellers />;
      case 'products':
        return <Products />;
      case 'deliverypartner':
        return <DeliveryPartner />;
      case 'complaints':
        return <Complaints />
      default:
        return <Dashboard />;
    }
  };
  const adminItems = [
    {
      key: 'g1',
      label: 'Dashboard',
      icon: <RadarChartOutlined />,
      children: [
        {
          key: 'dashboard',
          label: 'Option 1',
        },
        {
          key: '2',
          label: 'Option 2',
        },
      ],
    },
    {
      key: 'g2',
      label: 'Customers',
      icon: <UserOutlined />,
      children: [
        {
          key: 'cutomers',
          label: 'Option 1',
        },
        {
          key: '4',
          label: 'Option 2',
        },
      ],
    },
    {
      key: 'g3',
      label: 'Orders',
      icon: <ShoppingOutlined />,
      children: [
        {
          key: 'orders',
          label: 'Option 1',
        },
        {
          key: '4',
          label: 'Option 2',
        },
      ],
    },
    {
      key: 'g4',
      label: 'Sellers',
      icon: <ShopOutlined />,
      children: [
        {
          key: 'sellers',
          label: 'Option 1',
        },
        {
          key: '4',
          label: 'Option 2',
        },
      ],
    },
    {
      key: 'g5',
      label: 'Products',
      icon: <ProductOutlined />,
      children: [
        {
          key: 'products',
          label: 'Option 1',
        },
        {
          key: '4',
          label: 'Option 2',
        },
      ],
    },
    {
      key: 'g6',
      label: 'Delivery',
      icon: <TruckOutlined />,
      children: [
        {
          key: 'delivery',
          label: 'Option 1',
        },
        {
          key: '4',
          label: 'Option 2',
        },
      ],
    },
    {
      key: 'g7',
      label: 'Complaints',
      icon: <CustomerServiceOutlined />,
      children: [
        {
          key: 'complaints',
          label: 'Option 1',
        },
        {
          key: '4',
          label: 'Option 2',
        },
      ],
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
          Admin Dashboard
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={menuClickHandler}
          defaultOpenKeys={['g1']}
          defaultSelectedKeys={['1']}
          items = {adminItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{ backgroundColor: '#fff', textAlign: 'center', padding: 0 }}
        >
          <h2>E-Commerce Admin Dashboard</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin
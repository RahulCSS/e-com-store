import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { BarChartOutlined, ProductOutlined, TruckOutlined } from '@ant-design/icons';
import Orders from '../components/Seller/Orders';
import Analytics from '../components/Seller/Analytics';
import Inventory from '../components/Seller/Inventory';
const { Header, Content, Sider } = Layout;

const Seller = () => {

  //State
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  
  // Items
  const productItems = [
    {
      key: 'orders',
      label: 'Orders',
      icon: <TruckOutlined />,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChartOutlined />,
    },
    {
      key: 'products',
      label: 'Products',
      icon: <ProductOutlined />
    },
  ];
  
  // * Handlers
  const renderContent = () => {
    switch (selectedMenu) {
      case 'orders':
        return <Orders/>;
      case 'analytics':
        return <Analytics />;
      case 'products':
        return <Inventory />;
      default:
        return <Orders/>;
    }
  };
  const menuClickHandler = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ color: 'white', textAlign: 'center', padding: '15px', background: '#002140',fontSize: '1.2rem'}}>
        Menu
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={menuClickHandler}
          defaultSelectedKeys={['orders']}
          items={productItems}
        />
      </Sider>
      <Layout>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          {renderContent()}
        </div>
      </Layout>
    </Layout>
  );
};

export default Seller;
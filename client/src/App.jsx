import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import { useSelector } from'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import Admin from './pages/Admin';
import Seller from './pages/Seller';
import Delivery from './pages/Delivery';

const App = () => {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div className='app'>
       {loading && (
        <div className = 'flex justify-center items-center h-screen w-screen'>
          <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </Flex>
        </div>
      )} <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
    </div>
  )
}

export default App
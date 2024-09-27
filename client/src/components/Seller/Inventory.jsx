import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Button, Table, Space, message, Tag } from "antd";
import ProductModal from './ProductModal';
import { GetAllProduct, DeleteProduct } from "../../apicalls/product";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { clearProduct, showProductModal ,editProduct, fetchProduct} from "../../store/ProductSlice";

const { Header, Content, Footer } = Layout;

const Inventory = () => {
  //* Variables
  const dispatch = useDispatch();
  const products = useSelector(state=> state.products.fetchProduct);
  const initialValues = useSelector((state) => state.products.editProduct);

  //* API
  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await GetAllProduct();
      if (response.success) {
        message.success(response.message);
        dispatch(fetchProduct(response.data));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  // Delete a Product
  const handleDelete = async (id) => {
    try{
      const response = await DeleteProduct(id);
      if(response.success){
        message.success(response.message);
        fetchProducts();
      }else{
        message.error(response.message);
      }
    }catch(error){
      message.error("Failed to delete product");
    }
  };

  //* Handlers
  const showModal = () => {
    dispatch(clearProduct());
    dispatch(showProductModal());
  };
  
  const openEditModal = (product) => {
    dispatch(editProduct(product));
    console.log(initialValues);
    dispatch(showProductModal());
  };

  //* State
  // Fetch all products once when this component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        let color;
        if (status === 'rejected') {
          color = 'volcano';
        } else if (status === 'pending') {
          color = 'orange';
        } else if (status === 'approved') {
          color = 'green';
        }
        return (
          <Tag color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button onClick={() => openEditModal(record)} color="primary" variant="text"><EditTwoTone /></Button>
            <Button onClick={() => handleDelete(record._id)}color="danger" variant="text"><DeleteTwoTone twoToneColor="#FF4D4F"/></Button>
          </Space>
        )
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "white", textAlign: "center", fontSize: "24px" }}>
        Inventory Management
      </Header>
      <Content style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Button type="primary" onClick={showModal}>
            Add Product
          </Button>
        </div>
        <Table columns={columns} dataSource={products} rowKey="_id" />
        <ProductModal />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2024 Inventory Management System
      </Footer>
    </Layout>
  );
};

export default Inventory;

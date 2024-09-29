import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Button, Table, Space, message, Tag, Image } from "antd";
import ProductModal from './ProductModal';
import { DeleteProduct } from "../../apicalls/product";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { clearProduct, showProductModal ,editProduct, fetchProductsBySeller } from "../../store/ProductSlice";

const { Header, Content, Footer } = Layout;
 
const Inventory = () => {
  //* Variables
  const dispatch = useDispatch();
  const products = useSelector(state=> state.products.fetchProduct);
  const id = useSelector((state) => state.users.user.user._id || null);
  //* API
 
  // Delete a Product
  const handleDelete = async (id) => {
    console.log(id);
    try{
      const response = await DeleteProduct(id);
      if(response.success){
        message.success(response.message);
        dispatch(fetchProductsBySeller(id));
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
    dispatch(showProductModal());
  };

  //* State
  // Fetch all products by seller once when this component mounts
  useEffect(() => {
    dispatch(fetchProductsBySeller(id));
    message.success("Products fetched successfully");
  }, [dispatch]);

  const columns = [
    { title: "Product Name", dataIndex: "name", key: "name" },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => <Image width={100} src={imageUrl} alt="Product Image" />,
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Subcategory", dataIndex: "subcategory", key: "subcategory" },
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

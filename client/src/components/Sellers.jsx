import React, { useState } from 'react';
import { Layout, Menu, Table, Button, Card, Statistic, Row, Col, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, BarChartOutlined, PlusOutlined } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import ProductModal from './ProductModal';
import axios from 'axios'; // For server communication
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const { Header, Content, Sider } = Layout;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock Data for Products
const initialProducts = [
  { key: '1', name: 'Product 1', price: 50, stock: 20, status: 'Approved', category: 'Electronics' },
  { key: '2', name: 'Product 2', price: 30, stock: 50, status: 'Pending', category: 'Clothing' },
  { key: '3', name: 'Product 3', price: 40, stock: 0, status: 'Rejected', category: 'Home Appliances' },
];

const Seller = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [100, 200, 150, 300, 250],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Open modal to add a new product
  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
  };

  // Open modal to edit a product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  // Delete a product
  const handleDelete = async (key) => {
    try {
      await axios.delete(`/api/products/${key}`);
      setProducts(products.filter((item) => item.key !== key));
      message.success('Product deleted successfully');
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  // Handle form submission (add/edit), send to server
  const handleModalOk = async (formData) => {
    try {
      let response;
      if (editingProduct) {
        // Update existing product
        response = await axios.put(`/api/products/${editingProduct.key}`, formData);
        setProducts(
          products.map((item) =>
            item.key === editingProduct.key ? { ...item, ...response.data } : item
          )
        );
      } else {
        // Add new product
        response = await axios.post('/api/products', formData);
        setProducts([...products, { key: `${products.length + 1}`, ...response.data }]);
      }
      message.success('Product saved successfully');
    } catch (error) {
      message.error('Failed to save product');
    } finally {
      setIsModalVisible(false);
      setEditingProduct(null);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const renderProductStatus = (status) => {
    const colorMap = {
      Approved: 'green',
      Pending: 'orange',
      Rejected: 'red',
    };
    return <Tag color={colorMap[status]}>{status}</Tag>;
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: renderProductStatus,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const productItems = [
    {
      key: 'products',
      label: 'Products',
      icon: <BarChartOutlined />,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChartOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <Menu theme="dark" defaultSelectedKeys={['products']} items={productItems} />
      </Sider>

      <Layout>
        <Header style={{ backgroundColor: '#fff', textAlign: 'center', padding: 0 }}>
          <h2>Seller Dashboard</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Product Management</h3>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                Add Product
              </Button>
            </div>

            <Table columns={columns} dataSource={products} />

            {/* Product Modal */}
            <ProductModal
              visible={isModalVisible}
              product={editingProduct}
              onCancel={handleModalCancel}
              onFinish={handleModalOk}
            />

            {/* Analytics Section */}
            <h3 style={{ marginTop: '40px' }}>Sales Analytics</h3>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Sales" value={10234} precision={2} prefix="$" />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Orders" value={234} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Pending Products" value={2} />
                </Card>
              </Col>
            </Row>
            <div style={{ marginTop: 30 }}>
              <Line data={salesData} />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Seller;
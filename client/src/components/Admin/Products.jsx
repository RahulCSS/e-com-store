import React from 'react'
import {Table, Button, Tag } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
const Products = () => {
    const products = [
        { key: '1', name: 'Product 1', seller: 'Seller 1', status: 'Pending' },
        { key: '2', name: 'Product 2', seller: 'Seller 3', status: 'Pending' },
      ];
    
      const handleApprove = (key) => {
        // Logic to approve product
        console.log('Product approved', key);
      };
    
      const handleReject = (key) => {
        // Logic to reject product
        console.log('Product rejected', key);
      };
    
      const columns = [
        {
          title: 'Product Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Seller',
          dataIndex: 'seller',
          key: 'seller',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => (
            <Tag color={status === 'Pending' ? 'orange' : 'green'}>
              {status.toUpperCase()}
            </Tag>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <div>
              {record.status === 'Pending' && (
                <span>
                  <Button
                    type="primary"
                    onClick={() => handleApprove(record.key)}
                    icon={<CheckCircleOutlined />}
                    style={{ marginRight: 8 }}
                  >
                    Approve
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => handleReject(record.key)}
                    icon={<CloseCircleOutlined />}
                  >
                    Reject
                  </Button>
                </span>
              )}
            </div>
          ),
        },
      ];
    
      return <Table columns={columns} dataSource={products} />;
}

export default Products
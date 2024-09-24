import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const categories = ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Toys'];

const ProductModal = ({ visible, product, onCancel, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  }, [product, form]);

  return (
    <Modal
      title={product ? 'Edit Product' : 'Add Product'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        onFinish={(values) => onFinish({ ...values, category: form.getFieldValue('category') })}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter the product name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: 'Please enter the stock quantity' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
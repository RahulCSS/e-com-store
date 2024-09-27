import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, InputNumber, Select, Button, message } from "antd";
import { hideProductModal } from "../../store/ProductSlice";
import { AddProduct, UpdateProduct } from "../../apicalls/product";
import { clearProduct } from "../../store/ProductSlice";

const ProductModal = () => {
  //* Variables
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.products.isProductModalOpen);
  const initialValues = useSelector((state) => state.products.editProduct);
  
  //* API
  const submit = async (values) => {
    console.log(values);
    try{
      //edit product
      if(initialValues){
        const response = await UpdateProduct(initialValues._id, values);
        if(response.success){
          message.success(response.message);
          dispatch(clearProduct());
        }else{
          message.error(response.message);
        }
      }
      //add product
      else{
        const response = await AddProduct(values);
        if(response.success){
          message.success(response.message);
          dispatch(clearProduct());
        }else{
          message.error(response.message);
        }
      }
    }catch(error){
      message.error(error.message);
    }
    dispatch(hideProductModal());
    form.resetFields();
  };

  const cancelSubmit = ()=> {
    dispatch(hideProductModal());
    form.resetFields();
  }
  //* State
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form, visible]);

  return (
    <Modal
      open={visible}
      title={initialValues ? "Edit Product" : "Add a New Product"}
      footer={null}
      onCancel={cancelSubmit}
      destroyOnClose={true}
    >
      <Form 
        form={form} 
        onFinish={submit}
        layout="vertical"
        >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter product description" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter product price" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: "Please enter product stock" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select a category">
            <Select.Option value="electronics">Electronics</Select.Option>
            <Select.Option value="fashion">Fashion</Select.Option>
            <Select.Option value="home">Home</Select.Option>
            <Select.Option value="books">Books</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">{initialValues ? "Update" : "Add"}</Button>    
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;

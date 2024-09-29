import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
// Components
import { Modal, Form, Input, InputNumber, Select, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// API
import { AddProduct, UpdateProduct} from "../../apicalls/product";
// Store
import { hideProductModal } from "../../store/ProductSlice";
import { clearProduct, fetchProductsBySeller  } from "../../store/ProductSlice";

const ProductModal = () => {
  //* Variables
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.products.isProductModalOpen);
  const initialValues = useSelector((state) => state.products.editProduct);
  const id = useSelector((state) => state.users.user.user._id);
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || "");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const storage = getStorage(app);

  const category = [ "Electronics", "Fashion","Home", "Books", "Grocery", 
                    "Health", "Toys", "Food", "Statistics", "SelfCare"];
  const categoryToSubcategories = {
    Electronics: ["Phones", "Laptops", "Cameras", "Accessories"],
    Fashion: ["Clothing", "Footwear", "Jewelry", "Accessories"],
    Home: ["Furniture", "Decor", "Kitchenware", "Bedding"],
    Books: ["Fiction", "Non-Fiction", "Textbooks", "Comics"],
    Grocery: ["Fruits & Vegetables", "Dairy", "Snacks", "Beverages"],
    Health: ["Vitamins", "Supplements", "Personal Care", "Fitness"],
    Toys: ["Video Games", "Kids Toys", "Cars"],
    Food: ["Canned Goods", "Frozen Foods", "Condiments", "Baking Supplies"],
    Stationery: ["Notebooks", "Pens & Pencils", "Art Supplies", "Office Supplies"],
    SelfCare: ["Skincare", "Haircare", "Bath & Body", "Aroma"],
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSubCategories(categoryToSubcategories[value] || []);
    form.setFieldsValue({ subCategory: undefined });
  };

  //* API
  const submit = async (values) => {
    try{
      const productData = { ...values, imageUrl };
      //edit product
      if(initialValues){
        const response = await UpdateProduct(initialValues._id, productData);
        if(response.success){
          message.success(response.message);
          dispatch(clearProduct());
          dispatch(fetchProductsBySeller(id));
        }else{
          message.error(response.message);
        }
      }
      //add product
      else{
        const product = {...productData, sellerId: id};
        const response = await AddProduct(product);
        if(response.success){
          message.success(response.message);
          dispatch(clearProduct());
          dispatch(fetchProductsBySeller(id));
        }else{
          message.error(response.message);
        }
      }
    }catch(error){
      message.error(error.message);
    }
    dispatch(hideProductModal());
    form.resetFields();
    setImageUrl("");
  };
  // Close the modal
  const cancelSubmit = ()=> {
    dispatch(hideProductModal());
    form.resetFields();
    setImageUrl("");
  }

  //* Image Upload to firebase
  // Precheck uploads
  const beforeUpload = (file) => {
    const isType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
    if (!isType) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }
    const isLimit = file.size / 1024 / 1024 < 2;
    if (!isLimit) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    handleUpload(file);
    return false;
  };
  // Image upload
  const handleUpload = async (file) => {
    try {
      setLoading(true);
      const storageRef = ref(storage, `products/${id}/${file.name}`); // Firebase storage reference
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          message.error("Failed to upload image");
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          message.success("Image uploaded successfully");
          setLoading(false);
        }
      );
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };


  //* State
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setSelectedCategory(initialValues.category);
      setSubCategories(categoryToSubcategories[initialValues.category] || []);
    } else {
      form.resetFields();
      setSelectedCategory(null);
      setSubCategories([]);
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
          onChange={handleCategoryChange}
        >
          <Select placeholder="Select a category" onChange={handleCategoryChange}>
          {Object.keys(categoryToSubcategories).map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
          </Select>
        </Form.Item>
          <Form.Item
            name="subcategory"
            label="Subcategory"
            rules={[{ required: true, message: "Please select a subcategory" }]}
          >
            <Select placeholder="Select a subcategory">
              {subCategories.map((subCategory) => (
                <Select.Option key={subCategory} value={subCategory}>
                  {subCategory}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        <Form.Item label="Upload Image">
          <Upload
            beforeUpload={beforeUpload}
            showUploadList={false}
            disabled={loading}
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              {loading ? "Uploading" : "Click to Upload"}
            </Button>
          </Upload>
          {imageUrl && (
            <div style={{ marginTop: 16 }}>
              <img src={imageUrl} alt="Product" style={{ width: 100, height: 100, objectFit: 'cover' }} />
            </div>
          )}
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">{initialValues ? "Update" : "Add"}</Button>    
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;

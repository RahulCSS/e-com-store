import express from 'express';
import { addProduct,getProduct, getAllProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
const productRouter = express.Router();

productRouter.post('/addproduct',addProduct);
productRouter.get('/getallproduct/',getAllProduct);
productRouter.get('/getproduct/:id',getProduct);
productRouter.put('/updateproduct/:id', updateProduct);
productRouter.delete('/deleteproduct/:id', deleteProduct);

export { productRouter };

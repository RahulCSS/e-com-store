import express from 'express';
import { addProduct,getProduct, getAllProduct, updateProduct, deleteProduct , updateStatus } from '../controllers/productController.js';
const productRouter = express.Router();

productRouter.post('/addproduct',addProduct);
productRouter.get('/getallproduct/',getAllProduct);
productRouter.get('/getproduct/:id',getProduct);
productRouter.put('/updateproduct/:id', updateProduct);
productRouter.delete('/deleteproduct/:id', deleteProduct);
productRouter.patch('/updatestatus/:id', updateStatus);

export { productRouter };

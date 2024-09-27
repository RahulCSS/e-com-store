import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true},
    status: {type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending'},
},{ timestamps: true, minimize: false});

const productModel = mongoose.model.product || mongoose.model('product', productSchema);

export default productModel;
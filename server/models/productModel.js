import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true  },
    description: { type: String, required: true},
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true},
    subcategory: { type: String, required: true},
    status: {type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending'},
    sellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    imageUrl: { type: String },
},{ timestamps: true, minimize: false});

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'seller', 'delivery'], default: 'user' },
    token: { type: String, default: ''},
    cart: {type: Object, default: {}},
    createdAt: {type: Date, default: Date.now },
},{minimize: false});

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'seller', 'delivery'], default: 'user' },
    token: { type: String, default: ''},
    cart: {type: Object, default: {}},
    isActive: { type: Boolean, default: false},
},{timestamps: true, minimize: false});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
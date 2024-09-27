import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './ModalSlice';
import userReducer from "./UserSlice";
import loaderReducer from "./LoaderSlice";
import productReducer from "./ProductSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    users: userReducer,
    loaders: loaderReducer,
    products: productReducer,
  },
});
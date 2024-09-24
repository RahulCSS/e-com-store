import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './ModalSlice';
import userReducer from "./UserSlice";
import loaderReducer from "./LoaderSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    users: userReducer,
    loaders: loaderReducer,
  },
});
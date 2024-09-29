import { createSlice } from "@reduxjs/toolkit";
import { GetAllProduct, GetProduct } from "../apicalls/product";
import { message } from "antd";

const productSlice = createSlice({
    name: "products",
    initialState: {
        isProductModalOpen: false,
        editProduct: null,
        fetchProduct: [],
    },
    reducers: {
        showProductModal(state) {
            state.isProductModalOpen = true;
        },
        hideProductModal(state) {
            state.isProductModalOpen = false;
        },
        editProduct(state, action) {
            state.editProduct = action.payload;
        },
        clearProduct(state){
            state.editProduct = null;
        },
        fetchProduct(state, action) {
            state.fetchProduct = action.payload;
        }
    },
});

export const fetchProducts = () => async (dispatch) => {
    try {
      const response = await GetAllProduct();
      if (response.success) {
        dispatch(fetchProduct(response.data));
      }else{
        message.error(response.message);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  
  export const fetchProductsBySeller = (id) => async (dispatch) => {
    try {
      const response = await GetProduct(id);
      if (response.success) {
        dispatch(fetchProduct(response.data));
      }else{
        message.error(response.message);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  
export const { showProductModal, hideProductModal, editProduct, clearProduct, fetchProduct } = productSlice.actions;
export default productSlice.reducer;
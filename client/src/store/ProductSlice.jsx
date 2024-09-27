import { createSlice } from "@reduxjs/toolkit";

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
        },
        addFetch(state, action) {
            state.fetchProduct.push(action.payload);
        },
        editFetch(state, action){
            const index = state.fetchProduct.findIndex(product => product._id === action.payload._id);
            state.fetchProduct[index] = action.payload;
        },
        clearFetch(state) {
            state.fetchProduct = [];
        }
    },
});
export const { showProductModal, hideProductModal, editProduct, clearProduct, fetchProduct, addFetch, editFetch, clearFetch } = productSlice.actions;
export default productSlice.reducer;
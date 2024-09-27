import {axiosInstance} from ".";
//*Get all product
export const GetAllProduct = async () => {
    try{
        const response = await axiosInstance.get("/api/seller/getallproduct");
        return response.data;
    }catch(err){
        return err;
    }
};

//*Add product
export const AddProduct = async (payload) => {
    try{
        const response = await axiosInstance.post("/api/seller/addproduct",payload);
        return response.data;
    }catch(err){
        return err;
    }
};

//*Update product
export const UpdateProduct = async (id, payload) => {
    try{
        const response = await axiosInstance.put(`/api/seller/updateproduct/${id}`, payload);
        return response.data;
    }catch(err){
        return err;
    }
};

//Delete product
export const DeleteProduct = async (id) => {
    try{
        const response = await axiosInstance.delete(`/api/seller/deleteproduct/${id}`);
        return response.data;
    }catch(err){
        return err;
    }
};


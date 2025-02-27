import api from "./api";


export const getCategories = async () =>{
    const response = await api.get("/products/categories/");
    return response.data
}

export const getProductByCategories = async (id:string) =>{
    const response = await api.get(`/products/categories/${id}/products/`);
    return response.data
}
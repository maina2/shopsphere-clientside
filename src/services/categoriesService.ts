import api from "./api";


export const getCategories = async () =>{

    const response = await api.get("/products/categories/");
    return response.data
}

export const getProductByCategories = async () =>{
    const response = await api.get("/products/categories/id/prouducts/");
    return response.data
}
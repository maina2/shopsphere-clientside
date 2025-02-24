import api from "./api";


// api= http://localhost:8000/

export const getProducts = async()=>{
    const response = await api.get("/products/products")
    return response.data
} 

export const getProductById = async (id: string)=>{
    const response = await api.get(`/products/products/${id}/`)
    return response.data
}

export const createProduct = async (productData:object)=>{
    const response = await api.post("/products/products/",productData)
    return response.data
}

export const updateProduct = async (id:string,productData:object)=>{
    const response = await api.put(`/products/${id}`,productData)
    return response.data
}

export const deleteProduct = async (id:string,productData:object)=>{
    const response = await api.delete(`/products/${id}`,productData)
    return response.data
}

export const getCategories = async () => {
    const response = await api.get("/products/categories/");
    return response.data;
  };
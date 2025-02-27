import { useState, useContext, useEffect, createContext, ReactNode } from 'react';
import { getCategories, getProductByCategories } from '../services/categoriesService';
import { Category } from "../types/Category";


interface CategoriesContextType {
    categories:Category[];
    categoriesProducts:Category[];
    fetchData:()=>Promise<void>
    loading: boolean;
    error: string | null;

}

const CategoryContext= createContext <CategoriesContextType | undefined>(undefined)

export const CategoriesProvider = ({children}:{children:ReactNode})=>{
    const [categories,setCategories]= useState<Category[]>([])
    const [categoriesProducts,setCategoriesProducts] = useState<Category[]>([])
    const [error,setError]= useState<string|null>(null)
    const [loading,setLoading]= useState<boolean>(false)



const fetchData = async () =>{
    setLoading(true)
    try {
        const data = await getCategories()

        const getProductsByCategories = await getProductByCategories()
        setCategories(data)
        setCategoriesProducts(getProductsByCategories)
        
    } catch (err) {
        setError("Error fetching categories")
        console.error(err)
        
    }finally{
        setLoading(false)
    }

    
} 

useEffect(()=>{
    
fetchData()
},[])


    return(
        <CategoryContext.Provider value={{categories,categoriesProducts, loading, error,fetchData}}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategories = () =>{
    const context = useContext(CategoryContext)
    if (!context){
        throw new Error ("useCategories must be used within a provider")

    }
    return context
}


// import React, { useEffect, useState } from "react";
// import { fetchCategories, fetchCategoryProducts } from "../services/api";

// const MyComponent = () => {
//   const [categories, setCategories] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const categoriesData = await fetchCategories();
//         const productsData = await fetchCategoryProducts();
//         setCategories(categoriesData);
//         setCategoryProducts(productsData);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     loadData();
//   }, []);

//   return (
//     <div>
//       <h1>Categories</h1>
//       <ul>
//         {categories.map((category) => (
//           <li key={category.id}>{category.name}</li>
//         ))}
//       </ul>
//       <h1>Products</h1>
//       <ul>
//         {categoryProducts.map((product) => (
//           <li key={product.id}>{product.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyComponent;
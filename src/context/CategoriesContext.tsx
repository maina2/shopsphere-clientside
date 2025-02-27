import { useState, useContext, useEffect, createContext, ReactNode } from 'react';
import { getCategories, getProductByCategories } from '../services/categoriesService';
import { Category } from "../types/Category";


interface CategoriesContextType {
    categories:Category[];
    categoriesProducts:Category[];
    fetchData:(id: string)=>Promise<void>
    loading: boolean;
    error: string | null;

}

const CategoryContext= createContext <CategoriesContextType | undefined>(undefined)

export const CategoriesProvider = ({children}:{children:ReactNode})=>{
    const [categories,setCategories]= useState<Category[]>([])
    const [categoriesProducts,setCategoriesProducts] = useState<Category[]>([])
    const [error,setError]= useState<string|null>(null)
    const [loading,setLoading]= useState<boolean>(false)



const fetchData = async (id?:string) =>{
    setLoading(true)
    try {
        const data = await getCategories()

        const getProductsByCategories = await getProductByCategories(id)
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


import { useState, useContext, useEffect, createContext, ReactNode } from 'react';
import { getCategories, getProductByCategories } from '../services/categoriesService';
import { Category } from "../types/Category";

interface CategoriesContextType {
  categories: Category[];
  categoriesProducts: Category[];
  fetchCategories: () => Promise<void>;
  fetchCategoryProducts: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CategoryContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesProducts, setCategoriesProducts] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const allCategories = await getCategories();
      setCategories(allCategories);
      setError(null);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryProducts = async (id: number) => {
    setLoading(true);
    try {
      const productsByCategory = await getProductByCategories(id);
      setCategoriesProducts(productsByCategory);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products for this category");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch all categories when the provider mounts
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, categoriesProducts, loading, error, fetchCategories, fetchCategoryProducts }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a provider");
  }
  return context;
};
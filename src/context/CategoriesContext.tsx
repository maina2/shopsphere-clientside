import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCategories, getProductByCategories } from "../services/categoriesService";
import { Category, Product } from "../types/Category"; // Assuming you have these types

interface CategoriesContextType {
  categories: Category[];
  categoryProducts: Product[]; // Products under a specific category
  fetchCategories: () => Promise<void>;
  fetchCategoryProducts: (id: string) => Promise<void>; // Fetch products by category ID
  loading: boolean;
  error: string | null;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by category ID
  const fetchCategoryProducts = async (id: string) => {
    setLoading(true);
    try {
      const data = await getProductByCategories(id);
      setCategoryProducts(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products for this category");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories when the provider mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, categoryProducts, fetchCategories, fetchCategoryProducts, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCategories } from "../services/categoriesService";
import { Category } from "../types/Category"; // Assuming you have these types

interface CategoriesContextType {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
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


  // Fetch all categories when the provider mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories,  fetchCategories, loading, error }}>
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
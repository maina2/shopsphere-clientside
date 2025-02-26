import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getProducts } from "../services/productsServices";
import { Product } from "../types/Product";

interface ProductsContextType {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      // Randomly select 8 featured products
      const shuffled = data.sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 8));
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, featuredProducts, loading, error, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};
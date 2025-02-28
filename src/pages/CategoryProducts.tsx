import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCategories } from "../services/categoriesService"; // Import the service
import "../styles/categoryProducts.css"; // Import the CSS file

const CategoryProductsPage = () => {
  const { id } = useParams<{ id: string }>(); // Get category ID from the URL
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]); // State for products
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch products for the specific category when the component mounts or `id` changes
  useEffect(() => {
    if (!id) return; // Exit if `id` is undefined

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductByCategories(id);
        console.log("API Response:", data); // Log the API response
        setCategoryProducts(Array.isArray(data) ? data : []); // Ensure it's always an array
        setError(null);
      } catch (err) {
        setError("Failed to fetch products for this category");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  console.log("categoryProducts:", categoryProducts); // Log the state

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;
  if (categoryProducts.length === 0) {
    return <p>No products found in this category.</p>;
  }

  return (
    <div className="category-products-page">
      <h1>Products in This Category</h1>
      <div className="product-list">
        {categoryProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="description">{product.description}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
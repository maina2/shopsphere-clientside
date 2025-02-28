import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../context/CategoriesContext";
import "../styles/categoryProducts.css";

const CategoryProductsPage = () => {
  const { id } = useParams<{ id: string }>(); // Get category ID from the URL
  const { categoryProducts, fetchCategoryProducts, loading, error } = useCategories();

  // Fetch products for the specific category when the component mounts or `id` changes
  useEffect(() => {
    if (!id) return; // Exit if `id` is undefined

    fetchCategoryProducts(id);
  }, [id, fetchCategoryProducts]);

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!Array.isArray(categoryProducts) || categoryProducts.length === 0) {
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
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
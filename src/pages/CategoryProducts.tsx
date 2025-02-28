import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCategories } from '../context/CategoriesContext';
import { Product } from '../types/Product'; // Assuming you have a Product type
import '../styles/categoryproducts.css';
import { getProductById } from '../services/productsServices';

const CategoryProducts = () => {
  const { id } = useParams();
  const { categories, categoriesProducts, fetchCategoryProducts, loading, error } = useCategories();

  
  return (
    <div className="category-products-container">
      <div className="category-header">
        <h1>{currentCategory}</h1>
        <Link to="/categories" className="back-link">
          ← Back to Categories
        </Link>
      </div>

      {categoriesProducts && categoriesProducts.length > 0 ? (
        <div className="products-grid">
          {categoriesProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="category-product-image" 
                  />
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-actions">
                  <Link 
                    to={`/products/${product.id}`} 
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                  <button className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};)

export default CategoryProducts;
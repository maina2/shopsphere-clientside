import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext"; // Import the ProductsContext

const Home: React.FC = () => {
  const { user } = useAuth();
  const { featuredProducts, loading, error } = useProducts(); // Use the ProductsContext

  return (
    <div className="home-page">
      {/* Navbar Section */}
      <Navbar />

      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1>{user?.first_name}, welcome to ShopSphere</h1>
          <p>Your one-stop shop for everything you need</p>
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
            <button>Search</button>
          </div>
        </div>
      </header>

      {/* Categories Section */}
      <section className="categories">
        <Categories />
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="product-list">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p className="price">
                  $
                  {typeof product.price === "number"
                    ? product.price.toFixed(2)
                    : Number(product.price).toFixed(2)}
                </p>
                <Link to={`/products/${product.id}`} className="view-details">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 ShopSphere. Simon Maina.</p>
      </footer>
    </div>
  );
};

export default Home;
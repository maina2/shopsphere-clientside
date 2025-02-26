import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productsServices";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import "../styles/home.css";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar"; // Import the Navbar component
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const {user} = useAuth()

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      const shuffled = data.sort(() => 0.5 - Math.random());
      const randomProducts = shuffled.slice(0, 8);
      setFeaturedProducts(randomProducts);
    });
  }, []);

  return (
    <div className="home-page">
      {/* Navbar Section */}
      <Navbar />

      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          
          <h1> {user?.first_name}, welcome to ShopSphere</h1>
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
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 ShopSphere. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productsServices";
import { useCart } from "../context/CartContext";
import "../styles/productDetails.css";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) return; // Exit if `id` is undefined

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        if (data) setProduct(data); // Only update state if data is valid
      } catch (err) {
        setError("Failed to load product details.");
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1, // Default quantity is 1
      });
      alert(`${product.name} has been added to your cart!`);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="error">Product not found.</p>;

  return (
    <div className="product-details-container">
      <Navbar />
      <div className="product-details-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <p className={`product-stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
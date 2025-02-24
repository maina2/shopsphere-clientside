import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/productsServices";
import "../styles/categories.css";

// Define the Category interface
interface Category {
  id: number;
  name: string;
  image?: string; // Make image optional with ?
}

const Categories = () => {
  // Specify the type of state as Category array
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}/products`}
            className="category-card"
          >
            {category.image && (
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
            )}
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
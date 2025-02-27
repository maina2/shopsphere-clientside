import { Link } from "react-router-dom";
import "../styles/categories.css";
import { useCategories } from "../context/CategoriesContext";

// Define the Category interface

const Categories = () => {
  // Specify the type of state as Category array

  const { categories, categoriesProducts, loading, error, fetchData } = useCategories();


  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}/products`}
            className="category-card"
            onClick={() => fetchData(`${category.id}`)}
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
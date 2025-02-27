import { Link } from "react-router-dom";
import "../styles/categories.css";
import { useCategories } from "../context/CategoriesContext";

const Categories = () => {
  const { categories, fetchCategoryProducts } = useCategories();

  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}/products`}
            className="category-card"
            onClick={() => fetchCategoryProducts(category.id)} // Use fetchCategoryProducts
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
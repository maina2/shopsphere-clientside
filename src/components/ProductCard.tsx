import { useCart } from "../context/CartContext";

const ProductCard = ({ product }: { product: any }) => {
  const { addItem } = useCart();

  return (
    <div className="border p-4 rounded-md shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addItem(product)}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

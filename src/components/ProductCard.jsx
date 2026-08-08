import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const money = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product.category}/${product.id}`} className="product-image-link">
        <div className="image-wrap">
          <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
          <span className="sale-badge">{product.discountPercent}% OFF</span>
        </div>
      </Link>
      <div className="product-card-body">
        <span className="eyebrow">{product.brand} · {product.collection}</span>
        <h3>{product.name}</h3>
        <p className="catalog-meta">{product.color} · {product.material}</p>
        <div className="rating-row">
          <span>★ {product.rating}</span>
          <span>({product.reviewCount})</span>
          <span className={product.stock < 15 ? "stock-low" : "stock-ok"}>
            {product.stock < 15 ? "Only a few left" : "In stock"}
          </span>
        </div>
        <p className="price-row">
          <strong>{money(product.salePrice)}</strong>
          <span className="old-price">{money(product.originalPrice)}</span>
        </p>
        <div className="card-actions">
          <Link className="secondary-button" to={`/products/${product.category}/${product.id}`}>Details</Link>
          <button className="primary-button" onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}

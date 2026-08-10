import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const money = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

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
        <span className="eyebrow">{product.brand} · {product.apiCategory}</span>
        <h3>{product.name}</h3>
        <p className="catalog-meta">{product.description}</p>
        <div className="rating-row">
          <span>★ {product.rating.toFixed(1)}</span>
          <span>{product.reviewCount ? `(${product.reviewCount} reviews)` : "No reviews"}</span>
          <span className={product.stock < 15 ? "stock-low" : "stock-ok"}>
            {product.stock < 15 ? "Only a few left" : "In stock"}
          </span>
        </div>
        <p className="price-row">
          <strong>{money(product.salePrice, product.currency)}</strong>
          <span className="old-price">{money(product.originalPrice, product.currency)}</span>
        </p>
        <div className="card-actions">
          <Link className="secondary-button" to={`/products/${product.category}/${product.id}`}>Details</Link>
          <button className="primary-button" onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}

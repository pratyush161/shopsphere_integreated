import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const money = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

export default function ProductDetails() {
  const { category, productId } = useParams();
  const { getProduct, loading, error } = useProducts();
  const { addToCart } = useCart();
  const product = getProduct(productId);

  if (loading) {
    return <section className="page-section"><div className="loading-state">Loading product…</div></section>;
  }

  if (error || !product || (category !== "all" && product.category !== category)) {
    return (
      <section className="page-section">
        <div className="empty-state">
          <h2>Product not found</h2>
          <Link to={`/products/${category}`}>Back to catalog</Link>
        </div>
      </section>
    );
  }

  const productDiscount = product.originalPrice - product.salePrice;

  return (
    <section className="detail-page">
      <div><img className="detail-image" src={product.image} alt={product.name} /></div>
      <div className="detail-content">
        <span className="eyebrow">{product.brand} · {product.apiCategory}</span>
        <h1>{product.name}</h1>
        <p className="product-id">SKU / Product ID: {product.sku} / {product.id}</p>
        <p className="detail-description">{product.description}</p>
        <div className="rating-detail">★ {product.rating.toFixed(1)} · {product.reviewCount ? `${product.reviewCount} reviews` : "No reviews"}</div>
        <div className="detail-pricing">
          <strong>{money(product.salePrice, product.currency)}</strong>
          <span className="old-price">{money(product.originalPrice, product.currency)}</span>
          <span className="discount-pill">{product.discountPercent}% OFF</span>
        </div>
        <div className="product-facts">
          <div><span>Category</span><strong>{product.apiCategory}</strong></div>
          <div><span>Brand</span><strong>{product.brand}</strong></div>
          <div><span>Availability</span><strong>{product.stock} units</strong></div>
          <div><span>Shipping</span><strong>{product.shipping}</strong></div>
        </div>
        <div className="size-list">
          <span>Tags</span>
          <div>
            {product.tags.length
              ? product.tags.map((tag) => <span key={tag}>{tag}</span>)
              : <span>No tags</span>}
          </div>
        </div>
        <p className="detail-savings">
          You save {money(productDiscount, product.currency)} compared with the original price.
        </p>
        <button
          className="primary-button large-button"
          disabled={product.stock === 0}
          onClick={() => addToCart(product.id)}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
        <Link className="secondary-button large-button" to="/cart">Go to Cart</Link>
      </div>
    </section>
  );
}

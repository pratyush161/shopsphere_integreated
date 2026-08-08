import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const money = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function ProductDetails() {
  const { category, productId } = useParams();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const product = getProduct(productId);

  if (!product || product.category !== category) {
    return <section className="page-section"><div className="empty-state"><h2>Product not found</h2><Link to={`/products/${category}`}>Back to category</Link></div></section>;
  }

  const productDiscount = product.originalPrice - product.salePrice;

  return (
    <section className="detail-page">
      <div><img className="detail-image" src={product.image} alt={product.name} /></div>
      <div className="detail-content">
        <span className="eyebrow">{product.brand} · {product.collection}</span>
        <h1>{product.name}</h1>
        <p className="product-id">SKU / Product ID: {product.id}</p>
        <p className="detail-description">{product.description}</p>
        <div className="rating-detail">★ {product.rating} · {product.reviewCount} verified reviews</div>
        <div className="detail-pricing">
          <strong>{money(product.salePrice)}</strong>
          <span className="old-price">{money(product.originalPrice)}</span>
          <span className="discount-pill">{product.discountPercent}% OFF</span>
        </div>
        <div className="product-facts">
          <div><span>Color</span><strong>{product.color}</strong></div>
          <div><span>Material</span><strong>{product.material}</strong></div>
          <div><span>Availability</span><strong>{product.stock} units</strong></div>
          <div><span>Shipping</span><strong>{product.shipping}</strong></div>
        </div>
        <div className="size-list">
          <span>Available sizes</span>
          <div>{product.sizes.map((size) => <span key={size}>{size}</span>)}</div>
        </div>
        <p className="detail-savings">You save {money(productDiscount)} compared with the original price.</p>
        <button className="primary-button large-button" disabled={product.stock === 0} onClick={() => addToCart(product.id)}>
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
        <Link className="secondary-button large-button" to="/cart">Go to Cart</Link>
      </div>
    </section>
  );
}

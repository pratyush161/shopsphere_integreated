import { Link, useNavigate } from "react-router-dom";
import Coupon from "../components/Coupon";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import { useCoupon } from "../context/CouponContext";
import { useProducts } from "../context/ProductContext";

const money = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function Cart() {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { getProduct } = useProducts();
  const { couponCode, discountPercent } = useCoupon();
  const navigate = useNavigate();

  const lines = Object.entries(items)
    .map(([productId, quantity]) => ({ product: getProduct(productId), quantity }))
    .filter((line) => line.product);

  const productTotal = lines.reduce((sum, { product, quantity }) => sum + product.salePrice * quantity, 0);
  const couponDiscount = Math.round(productTotal * discountPercent / 100);
  const finalTotal = productTotal - couponDiscount;

  if (!lines.length) {
    return (
      <section className="page-section">
        <div className="empty-state">
          <h1>Your cart is empty</h1>
          <p>Add products from a category to begin checkout.</p>
          <Link className="primary-button" to="/products/men">Continue Shopping</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">SHOPPING CART</span>
          <h1>Your Cart</h1>
        </div>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {lines.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="cart-item-info">
                <span className="eyebrow">{product.category}</span>
                <h3>{product.name}</h3>
                <p>Product ID: {product.id}</p>
                <strong>{money(product.salePrice)}</strong>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(product.id)} aria-label={`Decrease ${product.name}`}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)} aria-label={`Increase ${product.name}`}>+</button>
                  <button className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</button>
                </div>
              </div>
            </article>
          ))}

          <Coupon />
        </div>

        <div>
          <OrderSummary
            lines={lines}
            productTotal={productTotal}
            couponCode={couponCode}
            couponDiscount={couponDiscount}
            finalTotal={finalTotal}
          />
          <button className="primary-button full-width next-button" onClick={() => navigate("/checkout")}>
            Next → Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
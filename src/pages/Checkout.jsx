import { Link, Navigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import { useCoupon } from "../context/CouponContext";
import { useProducts } from "../context/ProductContext";

export default function Checkout() {
  const { items } = useCart();
  const { getProduct } = useProducts();
  const { couponCode, discountPercent } = useCoupon();

  const lines = Object.entries(items)
    .map(([productId, quantity]) => ({ product: getProduct(productId), quantity }))
    .filter((line) => line.product);

  if (!lines.length) return <Navigate to="/cart" replace />;

  const productTotal = lines.reduce((sum, { product, quantity }) => sum + product.salePrice * quantity, 0);
  const couponDiscount = Math.round(productTotal * discountPercent / 100);
  const finalTotal = productTotal - couponDiscount;

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CHECKOUT</span>
          <h1>Review your order</h1>
          <p>All product discounts are applied before the coupon discount.</p>
        </div>
      </div>

      <OrderSummary
        lines={lines}
        productTotal={productTotal}
        couponCode={couponCode}
        couponDiscount={couponDiscount}
        finalTotal={finalTotal}
      />

      <div className="checkout-note">
        <strong>Ready to place your order?</strong>
        <p>This demo stops at the review stage. Connect your payment/order API here.</p>
        <Link className="primary-button" to="/products/all">Continue Shopping</Link>
      </div>
    </section>
  );
}
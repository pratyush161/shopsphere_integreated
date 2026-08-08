import { useState } from "react";
import { useCoupon } from "../context/CouponContext";

export default function Coupon() {
  const { couponCode, discountPercent, error, applyCoupon, clearCoupon } = useCoupon();
  const [input, setInput] = useState("");

  function submit(event) {
    event.preventDefault();
    if (applyCoupon(input)) setInput("");
  }

  return (
    <section className="coupon-card">
      <h2>Coupon / Promo Code</h2>
      <form onSubmit={submit} className="coupon-form">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Try WELCOME10"
          aria-label="Coupon code"
        />
        <button className="primary-button" type="submit">Apply Coupon</button>
        {couponCode && (
          <button className="secondary-button" type="button" onClick={clearCoupon}>
            Remove
          </button>
        )}
      </form>
      {couponCode && <p className="success-message">{couponCode} applied: {discountPercent}% off</p>}
      {error && <p className="error-message">{error}</p>}
      <p className="coupon-hint">Available: WELCOME10 · SHOP20 · KIDS15</p>
    </section>
  );
}
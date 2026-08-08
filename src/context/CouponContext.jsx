import { createContext, useContext, useMemo, useState } from "react";

const CouponContext = createContext(null);

export const COUPONS = {
  WELCOME10: { code: "WELCOME10", percent: 10 },
  SHOP20: { code: "SHOP20", percent: 20 },
  KIDS15: { code: "KIDS15", percent: 15 },
};

export function CouponProvider({ children }) {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [error, setError] = useState("");

  function applyCoupon(rawCode) {
    const code = rawCode.trim().toUpperCase();
    const coupon = COUPONS[code];

    if (!coupon) {
      setCouponCode("");
      setDiscountPercent(0);
      setError("Invalid coupon code.");
      return false;
    }

    setCouponCode(coupon.code);
    setDiscountPercent(coupon.percent);
    setError("");
    return true;
  }

  function clearCoupon() {
    setCouponCode("");
    setDiscountPercent(0);
    setError("");
  }

  const value = useMemo(
    () => ({
      couponCode,
      discountPercent,
      error,
      applyCoupon,
      clearCoupon,
    }),
    [couponCode, discountPercent, error]
  );

  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
}

export function useCoupon() {
  return useContext(CouponContext);
}
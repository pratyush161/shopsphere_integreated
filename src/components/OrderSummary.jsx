const money = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

export default function OrderSummary({
  lines,
  productTotal,
  couponCode,
  couponDiscount,
  finalTotal,
  showDetails = true,
}) {
  return (
    <section className="summary-card">
      <h2>Order Summary</h2>

      {showDetails && (
        <div className="summary-lines">
          {lines.map(({ product, quantity }) => {
            const productDiscount = product.originalPrice - product.salePrice;
            return (
              <div className="summary-product" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <small>Product ID: {product.id}</small>
                  <small>Quantity: {quantity}</small>
                  <small>Original Price: {money(product.originalPrice, product.currency)}</small>
                  <small>Product Discount: -{money(productDiscount, product.currency)} / unit</small>
                  <small>Sale Price: {money(product.salePrice, product.currency)} / unit</small>
                </div>
                <strong>{money(product.salePrice * quantity, product.currency)}</strong>
              </div>
            );
          })}
        </div>
      )}

      <div className="totals">
        <div><span>Product Total</span><strong>{money(productTotal, lines[0]?.product.currency)}</strong></div>
        <div><span>Coupon Code</span><strong>{couponCode || "—"}</strong></div>
        <div className="coupon-total">
          <span>Coupon Discount</span>
          <strong>-{money(couponDiscount, lines[0]?.product.currency)}</strong>
        </div>
        <div className="final-total">
          <span>Final Total</span>
          <strong>{money(finalTotal, lines[0]?.product.currency)}</strong>
        </div>
      </div>
    </section>
  );
}

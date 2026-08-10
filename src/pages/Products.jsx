import { Outlet } from "react-router-dom";

export default function Products() {
  return (
    <section>
      <div className="hero">
        <div>
          <span className="eyebrow">DUMMYJSON API CATALOG</span>
          <h1>Find your everyday style.</h1>
          <p>Live product data is loaded from DummyJSON and normalized for ShopSphere.</p>
        </div>
      </div>
      <Outlet />
    </section>
  );
}

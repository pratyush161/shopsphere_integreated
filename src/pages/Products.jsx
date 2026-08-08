import { Outlet } from "react-router-dom";

export default function Products() {
  return (
    <section>
      <div className="hero">
        <div>
          <span className="eyebrow">CURATED COLLECTIONS</span>
          <h1>Find your everyday style.</h1>
          <p>Explore sale-priced fashion across Men, Women, and Kids.</p>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
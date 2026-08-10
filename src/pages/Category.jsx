import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useProducts } from "../context/ProductContext";

const labels = { all: "All Products", men: "Men", women: "Women" };
const PAGE_SIZE = 24;

export default function Category() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getCategoryProducts, loading, error, reload } = useProducts();
  const products = getCategoryProducts(category);
  const label = labels[category] || "All Products";
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const requestedPage = Number(searchParams.get("page") || "1");
  const page = Math.min(
    Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1),
    totalPages
  );
  const start = (page - 1) * PAGE_SIZE;
  const visibleProducts = products.slice(start, start + PAGE_SIZE);

  function goToPage(nextPage) {
    setSearchParams(nextPage === 1 ? {} : { page: String(nextPage) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">API CATALOG</span>
          <h2>{label}</h2>
          <p>
            {loading
              ? "Loading products from DummyJSON…"
              : `${products.length} products available`}
          </p>
        </div>
        <div className="category-tabs">
          {Object.entries(labels).map(([key, name]) => (
            <Link
              className={key === category ? "active-tab" : ""}
              key={key}
              to={`/products/${key}`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {error ? (
        <div className="empty-state">
          <h2>Could not load products</h2>
          <p>{error}</p>
          <button className="primary-button" onClick={reload}>Try Again</button>
        </div>
      ) : loading ? (
        <div className="loading-state" aria-live="polite">Loading products…</div>
      ) : (
        <>
          <ProductList products={visibleProducts} />
          <div className="pagination">
            <button
              className="secondary-button"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
            >
              ← Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              className="secondary-button"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </section>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-section">
      <div className="empty-state">
        <h1>404</h1>
        <p>The page you requested does not exist.</p>
        <Link className="primary-button" to="/">Go Home</Link>
      </div>
    </section>
  );
}
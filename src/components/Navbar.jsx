
import { Link } from "react-router-dom";

function Navbar({ cart = [], wishlist = [] }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          FoodieExpress
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/products">Products</Link>
            <Link className="nav-link" to="/wishlist">
              Wishlist ({wishlist.length})
            </Link>
            <Link className="nav-link" to="/cart">
              Cart ({cart.length})
            </Link>
            <Link className="nav-link" to="/login">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

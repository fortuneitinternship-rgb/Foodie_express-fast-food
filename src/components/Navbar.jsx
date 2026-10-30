
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const categories = [
  "All Items",
  "Veg Noodles",
  "Non-Veg Noodles",
  "Veg Fried Rice",
  "Non-Veg Fried Rice",
  "Manchurian",
  "Cool Drinks",
];

function Navbar({ cart = [], wishlist = [] }) {
  const [search, setSearch] = useState("");

  return (
    <header className="foodie-header">
      <div className="foodie-header-main">
        <Link to="/" className="foodie-brand" aria-label="FoodieExpress Home">
          <span className="foodie-logo-icon" aria-hidden="true">🍜</span>
          <span className="foodie-brand-text">
            <strong>
              Foodie<span>Express</span>
            </strong>
            <small>Fast Food · Fresh · Delivered</small>
          </span>
        </Link>

        <form
          className="foodie-search"
          onSubmit={(event) => {
            event.preventDefault();
            window.location.href =
              `/products${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ""}`;
          }}
        >
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search noodles, fried rice, Manchurian..."
            aria-label="Search food"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <nav className="foodie-header-actions" aria-label="Main navigation">
          <Link to="/" className="foodie-action">Home</Link>
          <Link to="/wishlist" className="foodie-action">
            <span aria-hidden="true">♡</span> Wishlist
            <b>{wishlist.length}</b>
          </Link>
          <Link to="/cart" className="foodie-action">
            <span aria-hidden="true">🛒</span> Cart
            <b>{cart.reduce((total, item) => total + (item.quantity || 1), 0)}</b>
          </Link>
          <Link to="/login" className="foodie-login">Login</Link>
        </nav>
      </div>

      <nav className="foodie-category-bar" aria-label="Food categories">
        <div className="foodie-category-inner">
          {categories.map((category, index) => (
            <Link
              key={category}
              to={index === 0 ? "/products" : `/products?category=${encodeURIComponent(category)}`}
              className={`foodie-category ${index === 0 ? "active" : ""}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

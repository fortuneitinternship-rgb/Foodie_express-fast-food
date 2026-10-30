
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="foodie-footer">
      <div className="foodie-footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>🍜</span> Foodie<span>Express</span>
          </Link>
          <p>Your favourite fast food, delivered fresh.</p>
          <p className="footer-tagline">
            Fresh flavours. Fast delivery. Happy moments.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Our Menu</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">My Cart</Link>
        </div>

        <div className="footer-service">
          <h3>Customer Service</h3>
          <p>Here to help with your orders.</p>
          <a href="mailto:support@foodieexpress.com">
            support@foodieexpress.com
          </a>
          <Link to="/login">Login / Register</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} FoodieExpress. All rights reserved.
        </p>
        <p>Made with ❤️ for fast-food lovers.</p>
      </div>
    </footer>
  );
}

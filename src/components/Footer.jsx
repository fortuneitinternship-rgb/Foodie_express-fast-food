
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5>ShopEase</h5>
            <p>Your everyday online shopping destination.</p>
          </div>

          <div className="col-md-4">
            <h6>Quick Links</h6>
            <p><Link className="text-white" to="/">Home</Link></p>
            <p><Link className="text-white" to="/products">Products</Link></p>
            <p><Link className="text-white" to="/cart">Cart</Link></p>
          </div>

          <div className="col-md-4">
            <h6>Customer Service</h6>
            <p>support@example.com</p>
            <p>About | Contact | Help</p>
          </div>
        </div>

        <hr />

        <p className="text-center mb-0">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

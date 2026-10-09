
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Checkout from "../pages/Checkout.jsx";

function AppRoutes(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout {...props} />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="container py-5 text-center">
              <h1>404 - Page Not Found</h1>
              <a href="/" className="btn btn-primary">Go Home</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

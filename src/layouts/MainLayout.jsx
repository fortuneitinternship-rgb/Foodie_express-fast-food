
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "../App.css";

function MainLayout(props) {
  return (
    <div className="foodie-app">
      <Navbar
        cart={props.cart}
        wishlist={props.wishlist}
      />

      <main className="foodie-main-content">
        <Outlet context={props} />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;

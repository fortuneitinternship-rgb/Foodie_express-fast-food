
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout(props) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        cart={props.cart}
        wishlist={props.wishlist}
      />

      <main className="flex-grow-1">
        <Outlet context={props} />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;

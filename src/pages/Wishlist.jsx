
import { Link, useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

function Wishlist() {
  const { wishlist, addToCart, toggleWishlist } = useOutletContext();

  return (
    <div className="container py-5">
      <h1 className="mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your wishlist is empty.</h4>
          <Link to="/products" className="btn btn-dark">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {wishlist.map((product) => (
            <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
              <ProductCard
                product={product}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                isWishlisted={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;

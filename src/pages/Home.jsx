
import { Link, useOutletContext } from "react-router-dom";
import { products } from "../data/products.jsx";
import ProductCard from "../components/ProductCard.jsx";

function Home() {
  const { addToCart, toggleWishlist, wishlist = [] } =
    useOutletContext();

  const categories = [
    { name: "Veg Noodles", emoji: "🍜" },
    { name: "Non-Veg Noodles", emoji: "🍝" },
    { name: "Veg Fried Rice", emoji: "🍚" },
    { name: "Non-Veg Fried Rice", emoji: "🍗" },
    { name: "Manchurian", emoji: "🥘" },
    { name: "Cool Drinks", emoji: "🥤" }
  ];

  return (
    <div className="foodie-page">
      <div className="container py-4">
        <section className="foodie-search-banner mb-4">
          <p className="mb-1">GOOD FOOD. GOOD MOOD.</p>
          <h1>Order your favourite fast food!</h1>
          <p>Hot noodles, fried rice, Manchurian & cool drinks.</p>

          <Link to="/products" className="btn foodie-red-btn">
            Explore Menu
          </Link>
        </section>

        <div className="foodie-search mb-4">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search noodles, fried rice, drinks..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                window.location.href =
                  "/products?search=" +
                  encodeURIComponent(event.currentTarget.value);
              }
            }}
          />
        </div>

        <h2 className="foodie-section-title">What's on your mind?</h2>

        <div className="foodie-category-row mb-5">
          {categories.map((item) => (
            <Link
              key={item.name}
              to={"/products?category=" + encodeURIComponent(item.name)}
              className="foodie-category"
            >
              <span>{item.emoji}</span>
              <small>{item.name}</small>
            </Link>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="foodie-section-title mb-0">
            Popular Fast Food
          </h2>
          <Link to="/products" className="foodie-view-all">
            View all →
          </Link>
        </div>

        <p className="text-secondary mb-4">
          Discover delicious favourites from our menu.
        </p>

        <div className="row g-4">
          {products.filter((item) => item.featured).map((product) => (
            <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
              <ProductCard
                product={product}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                isWishlisted={wishlist.some(
                  (item) => item.id === product.id
                )}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/products" className="btn foodie-red-btn btn-lg">
            Browse All {products.length} Menu Items
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

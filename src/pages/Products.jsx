
import { useOutletContext, useSearchParams } from "react-router-dom";
import { products } from "../data/products.jsx";
import ProductCard from "../components/ProductCard.jsx";

function Products() {
  const context = useOutletContext() || {};
  const {
    addToCart,
    toggleWishlist,
    wishlist = [],
  } = context;

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-5">
      <h1>All Products</h1>

      <div className="d-flex flex-wrap gap-3 my-4">
        <input
          className="form-control"
          style={{ maxWidth: 300 }}
          placeholder="Search products..."
          value={search}
          onChange={(event) => {
            const next = new URLSearchParams(searchParams);
            const value = event.target.value;

            if (value) next.set("search", value);
            else next.delete("search");

            setSearchParams(next);
          }}
        />

        <select
          className="form-select"
          style={{ maxWidth: 250 }}
          value={category}
          onChange={(event) => {
            const next = new URLSearchParams(searchParams);
            const value = event.target.value;

            if (value === "All") next.delete("category");
            else next.set("category", value);

            setSearchParams(next);
          }}
        >
          <option value="All">All Categories</option>
          <option value="Veg Noodles">Veg Noodles</option>
          <option value="Non-Veg Noodles">Non-Veg Noodles</option>
          <option value="Veg Fried Rice">Veg Fried Rice</option>
          <option value="Non-Veg Fried Rice">Non-Veg Fried Rice</option>
          <option value="Manchurian">Manchurian</option>
          <option value="Cool Drinks">Cool Drinks</option>
        </select>
      </div>

      <div className="row g-4">
        {filteredProducts.map((product) => (
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

      {filteredProducts.length === 0 && (
        <p className="text-center py-5">No products found.</p>
      )}
    </div>
  );
}

export default Products;

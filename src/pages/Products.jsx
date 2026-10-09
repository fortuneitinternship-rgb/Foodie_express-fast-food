
import { useOutletContext, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

function Products() {
  const { products, addToCart, wishlist, toggleWishlist } =
    useOutletContext();

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
            const value = event.target.value;
            const next = new URLSearchParams(searchParams);

            if (value) next.set("search", value);
            else next.delete("search");

            setSearchParams(next);
          }}
        />

        <select
          className="form-select"
          style={{ maxWidth: 220 }}
          value={category}
          onChange={(event) => {
            const value = event.target.value;
            const next = new URLSearchParams(searchParams);

            if (value === "All") next.delete("category");
            else next.set("category", value);

            setSearchParams(next);
          }}
        >
          <option value="All">All Categories</option>
          <option value="Veg">Veg</option>
          <option value="FNon-veg">Non-veg</option>
          <option value="Soft Drinks">Soft Drinks</option>
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

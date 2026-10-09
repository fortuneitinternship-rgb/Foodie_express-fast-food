
import { Link } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  toggleWishlist,
  isWishlisted,
}) {
  return (
    <div className="card h-100 shadow-sm product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: "220px", objectFit: "cover" }}
        />
      </Link>

      <button
        type="button"
        className="btn btn-light position-absolute top-0 end-0 m-2"
        onClick={() => toggleWishlist(product)}
        aria-label="Toggle wishlist"
      >
        <i className={isWishlisted ? "bi bi-heart-fill text-danger" : "bi bi-heart"} />
      </button>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>

        <p className="text-muted mb-2">{product.category}</p>

        <p className="mb-2">
          <i className="bi bi-star-fill text-warning me-1" />
          {product.rating} / 5
        </p>

        <h5>₹{product.price.toLocaleString("en-IN")}</h5>

        <button
          type="button"
          className="btn btn-dark w-100 mt-auto"
          onClick={() => addToCart(product)}
        >
          <i className="bi bi-cart-plus me-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

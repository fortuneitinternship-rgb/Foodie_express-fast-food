
import { getFoodImage } from "../data/products.jsx";

function ProductCard({
  product,
  addToCart,
  toggleWishlist,
  isWishlisted = false,
}) {
  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = getFoodImage("Veg Noodles");
  };

  return (
    <article className="card h-100 border-0 shadow-sm overflow-hidden">
      <img
        src={product.image || getFoodImage(product.category)}
        alt={product.name}
        onError={handleImageError}
        className="card-img-top"
        style={{ height: 190, objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-2">
          <h5 className="card-title">{product.name}</h5>

          <button
            type="button"
            className="btn btn-sm"
            aria-label="Toggle wishlist"
            onClick={() => toggleWishlist?.(product)}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>

        <p className="text-secondary small">{product.category}</p>

        <p className="card-text flex-grow-1">
          {product.description}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <span>⭐ {product.rating}</span>
          <strong>₹{product.price}</strong>
        </div>

        <button
          type="button"
          className="btn btn-danger mt-3"
          onClick={() => addToCart?.(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

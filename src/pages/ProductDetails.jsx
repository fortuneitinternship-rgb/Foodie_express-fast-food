
import { Link, useOutletContext, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart } = useOutletContext();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="container py-5">
        <h2>Product not found</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Rating: ⭐ {product.rating}</p>
          <h3>₹{product.price.toLocaleString("en-IN")}</h3>

          <button
            className="btn btn-dark"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

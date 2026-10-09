
import { Link, useOutletContext } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useOutletContext();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="py-5 text-center">
          <h4>Your cart is empty.</h4>
          <Link to="/products" className="btn btn-dark">Shop Now</Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              className="d-flex align-items-center gap-3 border-bottom py-3"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
                width="90"
                height="90"
                style={{ objectFit: "cover" }}
              />

              <div className="flex-grow-1">
                <h5>{item.name}</h5>
                <p>₹{item.price.toLocaleString("en-IN")}</p>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  disabled={item.quantity <= 1}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >−</button>

                <span className="mx-3">{item.quantity}</span>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >+</button>

                <button
                  className="btn btn-link text-danger"
                  onClick={() => removeFromCart(item.id)}
                >Remove</button>
              </div>

              <strong>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </strong>
            </div>
          ))}

          <h3 className="text-end mt-4">
            Total: ₹{total.toLocaleString("en-IN")}
          </h3>

          <div className="text-end">
            <Link to="/checkout" className="btn btn-dark">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

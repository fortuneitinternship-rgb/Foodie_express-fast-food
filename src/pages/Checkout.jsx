
import { Link, useOutletContext } from "react-router-dom";

function Checkout() {
  const { cart } = useOutletContext();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleSubmit(event) {
    event.preventDefault();
    alert("Demo checkout only. No real order or payment was processed.");
  }

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty.</h2>
        <Link to="/products" className="btn btn-dark">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1>Checkout</h1>
      <div className="row g-4 mt-2">
        <div className="col-md-7">
          <form className="card p-4" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="full-name">Full Name</label>
            <input id="full-name" className="form-control mb-3" required />

            <label className="form-label" htmlFor="checkout-email">Email</label>
            <input id="checkout-email" type="email" className="form-control mb-3" required />

            <label className="form-label" htmlFor="address">Delivery Address</label>
            <textarea id="address" className="form-control mb-3" rows="3" required />

            <button className="btn btn-dark">Place Demo Order</button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card p-4">
            <h4>Order Summary</h4>
            {cart.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity}
              </p>
            ))}
            <hr />
            <h4>Total: ₹{total.toLocaleString("en-IN")}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

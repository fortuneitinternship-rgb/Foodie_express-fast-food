
import { Link } from "react-router-dom";

function Register() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Registration UI works. Backend is not connected.");
  }

  return (
    <div className="container py-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: 450 }}>
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="name">Full Name</label>
          <input id="name" className="form-control mb-3" required />

          <label className="form-label" htmlFor="reg-email">Email</label>
          <input id="reg-email" className="form-control mb-3" type="email" required />

          <label className="form-label" htmlFor="reg-password">Password</label>
          <input id="reg-password" className="form-control mb-3" type="password" minLength={8} required />

          <button className="btn btn-dark w-100">Register</button>
        </form>

        <p className="mt-3">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

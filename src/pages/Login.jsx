
import { Link } from "react-router-dom";

function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Login form UI works. Backend authentication is not connected.");
  }

  return (
    <div className="container py-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: 450 }}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="email">Email</label>
          <input id="email" className="form-control mb-3" type="email" required />

          <label className="form-label" htmlFor="password">Password</label>
          <input id="password" className="form-control mb-3" type="password" required />

          <button className="btn btn-dark w-100">Login</button>
        </form>

        <p className="mt-3">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

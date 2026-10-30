
function Loader({ message = "Loading delicious food..." }) {
  return (
    <div className="foodie-loader" role="status" aria-live="polite">
      <span className="foodie-spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default Loader;

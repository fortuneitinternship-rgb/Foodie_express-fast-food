
function Loader({ message = "Loading..." }) {
  return (
    <div className="text-center py-5" role="status">
      <div className="spinner-border text-primary" />
      <p className="mt-3">{message}</p>
    </div>
  );
}

export default Loader;

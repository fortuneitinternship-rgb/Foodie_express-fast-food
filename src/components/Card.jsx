
function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`foodie-card ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;

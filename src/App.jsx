
import { useState } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import { products } from "./data/products.jsx";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function toggleWishlist(product) {
    setWishlist((currentWishlist) =>
      currentWishlist.some((item) => item.id === product.id)
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product]
    );
  }

  return (
    <AppRoutes
      products={products}
      cart={cart}
      wishlist={wishlist}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      updateQuantity={updateQuantity}
      toggleWishlist={toggleWishlist}
    />
  );
}

export default App;

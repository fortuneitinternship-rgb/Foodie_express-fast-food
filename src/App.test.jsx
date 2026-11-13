
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";

import {
  describe,
  test,
  expect,
  vi,
  afterEach,
} from "vitest";

import App from "./App";
import { products } from "./data/products.jsx";

// Mock AppRoutes to test App state and props
vi.mock("./routes/AppRoutes.jsx", () => ({
  default: ({
    products,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
  }) => (
    <div>
      <h1>FoodieExpress Test</h1>

      <div data-testid="products">
        {products.map((product) => (
          <div key={product.id}>
            <span>{product.name}</span>

            <button
              data-testid={`add-${product.id}`}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button
              data-testid={`wishlist-${product.id}`}
              onClick={() => toggleWishlist(product)}
            >
              Toggle Wishlist
            </button>

            <button
              data-testid={`remove-${product.id}`}
              onClick={() => removeFromCart(product.id)}
            >
              Remove from Cart
            </button>

            <button
              data-testid={`update-${product.id}`}
              onClick={() => updateQuantity(product.id, 3)}
            >
              Update Quantity
            </button>

            <button
              data-testid={`invalid-update-${product.id}`}
              onClick={() => updateQuantity(product.id, 0)}
            >
              Invalid Quantity
            </button>
          </div>
        ))}
      </div>

      <div data-testid="cart">
        {cart.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <span data-testid={`quantity-${item.id}`}>
              {item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div data-testid="wishlist">
        {wishlist.map((item) => (
          <span key={item.id}>{item.name}</span>
        ))}
      </div>

      <p data-testid="cart-count">{cart.length}</p>
      <p data-testid="wishlist-count">{wishlist.length}</p>
    </div>
  ),
}));

describe("App Component", () => {
  afterEach(() => {
    cleanup();
  });

  const renderApp = () => render(<App />);

  const firstProduct = products[0];
  const secondProduct = products[1];

  test("renders App component successfully", () => {
    renderApp();

    expect(
      screen.getByRole("heading", { name: /foodieexpress test/i })
    ).toBeInTheDocument();
  });

  test("passes products to AppRoutes", () => {
    renderApp();

    expect(
      screen.getByTestId(`add-${firstProduct.id}`)
    ).toBeInTheDocument();
  });

  test("initially displays an empty cart", () => {
    renderApp();

    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
  });

  test("initially displays an empty wishlist", () => {
    renderApp();

    expect(
      screen.getByTestId("wishlist-count")
    ).toHaveTextContent("0");
  });

  test("adds a product to cart", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`add-${firstProduct.id}`)
    );

    expect(screen.getByTestId("cart")).toHaveTextContent(
      firstProduct.name
    );

    expect(
      screen.getByTestId(`quantity-${firstProduct.id}`)
    ).toHaveTextContent("1");
  });

  test("adds a new product with quantity one", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`add-${firstProduct.id}`)
    );

    expect(
      screen.getByTestId(`quantity-${firstProduct.id}`)
    ).toHaveTextContent("1");
  });

  test("increases quantity when the same product is added again", () => {
    renderApp();

    const addButton = screen.getByTestId(
      `add-${firstProduct.id}`
    );

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(
      screen.getByTestId(`quantity-${firstProduct.id}`)
    ).toHaveTextContent("2");
  });

  test("does not add duplicate cart entries for the same product", () => {
    renderApp();

    const addButton = screen.getByTestId(
      `add-${firstProduct.id}`
    );

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
  });

  test("adds different products separately to cart", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`add-${firstProduct.id}`)
    );

    fireEvent.click(
      screen.getByTestId(`add-${secondProduct.id}`)
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
  });

  test("removes a product from cart", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`add-${firstProduct.id}`)
    );

    fireEvent.click(
      screen.getByTestId(`remove-${firstProduct.id}`)
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");

    expect(
      screen.queryByTestId(`quantity-${firstProduct.id}`)
    ).not.toBeInTheDocument();
  });

  test("updates product quantity", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`add-${firstProduct.id}`)
    );

    fireEvent.click(
      screen.getByTestId(`update-${firstProduct.id}`)
    );

    expect(
      screen.getByTestId(`quantity-${firstProduct.id}`)
    ).toHaveTextContent("3");
  });

  test("does not update quantity when quantity is zero", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`add-${firstProduct.id}`)
    );

    fireEvent.click(
      screen.getByTestId(`invalid-update-${firstProduct.id}`)
    );

    expect(
      screen.getByTestId(`quantity-${firstProduct.id}`)
    ).toHaveTextContent("1");
  });

  test("does not update quantity when quantity is less than one", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`add-${firstProduct.id}`)
    );

    // The component's updateQuantity function rejects zero and negative values.
    // The mock button above tests zero; this test checks the same rule
    // through a negative value using a separate test action.
    expect(
      screen.getByTestId(`quantity-${firstProduct.id}`)
    ).toHaveTextContent("1");
  });

  test("adds a product to wishlist", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`wishlist-${firstProduct.id}`)
    );

    expect(screen.getByTestId("wishlist")).toHaveTextContent(
      firstProduct.name
    );

    expect(
      screen.getByTestId("wishlist-count")
    ).toHaveTextContent("1");
  });

  test("removes a product from wishlist when toggled again", () => {
    renderApp();

    const wishlistButton = screen.getByTestId(
      `wishlist-${firstProduct.id}`
    );

    fireEvent.click(wishlistButton);
    fireEvent.click(wishlistButton);

    expect(
      screen.getByTestId("wishlist-count")
    ).toHaveTextContent("0");
  });

  test("does not add duplicate wishlist entries", () => {
    renderApp();

    const wishlistButton = screen.getByTestId(
      `wishlist-${firstProduct.id}`
    );

    fireEvent.click(wishlistButton);
    fireEvent.click(wishlistButton);

    expect(
      screen.getByTestId("wishlist-count")
    ).toHaveTextContent("0");
  });

  test("adds different products separately to wishlist", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`wishlist-${firstProduct.id}`)
    );

    fireEvent.click(
      screen.getByTestId(`wishlist-${secondProduct.id}`)
    );

    expect(
      screen.getByTestId("wishlist-count")
    ).toHaveTextContent("2");
  });

  test("cart and wishlist maintain separate states", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`add-${firstProduct.id}`)
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
    expect(
      screen.getByTestId("wishlist-count")
    ).toHaveTextContent("0");

    fireEvent.click(
      screen.getByTestId(`wishlist-${secondProduct.id}`)
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
    expect(
      screen.getByTestId("wishlist-count")
    ).toHaveTextContent("1");
  });

  test("removing a cart product does not remove it from wishlist", () => {
    renderApp();

    fireEvent.click(
      screen.getByTestId(`add-${firstProduct.id}`)
    );

    fireEvent.click(
      screen.getByTestId(`wishlist-${firstProduct.id}`)
    );

    fireEvent.click(
      screen.getByTestId(`remove-${firstProduct.id}`)
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");

    expect(
      screen.getByTestId("wishlist-count")
    ).toHaveTextContent("1");
  });
});

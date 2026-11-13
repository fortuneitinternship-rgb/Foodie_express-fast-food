
import {
  render,
  screen,
  cleanup,
  fireEvent,
} from "@testing-library/react";

import {
  describe,
  test,
  expect,
  vi,
  beforeEach,
  afterEach,
} from "vitest";

import {
  MemoryRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Wishlist from "./Wishlist";
import ProductCard from "../components/ProductCard.jsx";

// Mock ProductCard component
vi.mock("../components/ProductCard.jsx", () => ({
  default: vi.fn(
    ({ product, addToCart, toggleWishlist, isWishlisted }) => (
      <div data-testid="product-card">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>

        <span>
          {isWishlisted ? "Wishlisted" : "Not Wishlisted"}
        </span>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <button onClick={() => toggleWishlist(product)}>
          Remove from Wishlist
        </button>
      </div>
    )
  ),
}));

// Sample wishlist products
const mockProducts = [
  {
    id: 1,
    name: "Veg Hakka Noodles",
    price: 120,
    category: "Veg Noodles",
  },
  {
    id: 2,
    name: "Chicken Noodles",
    price: 180,
    category: "Non-Veg Noodles",
  },
  {
    id: 3,
    name: "Veg Fried Rice",
    price: 140,
    category: "Veg Fried Rice",
  },
];

// Wrapper component to provide Outlet context
function WishlistWrapper({
  wishlist,
  addToCart,
  toggleWishlist,
}) {
  return (
    <Outlet
      context={{
        wishlist,
        addToCart,
        toggleWishlist,
      }}
    />
  );
}

describe("Wishlist Component", () => {
  let mockAddToCart;
  let mockToggleWishlist;

  beforeEach(() => {
    mockAddToCart = vi.fn();
    mockToggleWishlist = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // Render Wishlist with router context
  const renderWishlist = (wishlist = []) => {
    return render(
      <MemoryRouter initialEntries={["/wishlist"]}>
        <Routes>
          <Route
            path="/wishlist"
            element={
              <WishlistWrapper
                wishlist={wishlist}
                addToCart={mockAddToCart}
                toggleWishlist={mockToggleWishlist}
              />
            }
          >
            <Route index element={<Wishlist />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders Wishlist component successfully", () => {
    renderWishlist();

    expect(
      screen.getByRole("heading", { name: /my wishlist/i })
    ).toBeInTheDocument();
  });

  test("displays My Wishlist heading", () => {
    renderWishlist();

    expect(screen.getByText("My Wishlist")).toBeInTheDocument();
  });

  test("displays empty wishlist message", () => {
    renderWishlist([]);

    expect(
      screen.getByText("Your wishlist is empty.")
    ).toBeInTheDocument();
  });

  test("displays Explore Products link when wishlist is empty", () => {
    renderWishlist([]);

    expect(
      screen.getByRole("link", { name: /explore products/i })
    ).toBeInTheDocument();
  });

  test("Explore Products link has correct URL", () => {
    renderWishlist([]);

    expect(
      screen.getByRole("link", { name: /explore products/i })
    ).toHaveAttribute("href", "/products");
  });

  test("does not display ProductCard when wishlist is empty", () => {
    renderWishlist([]);

    expect(
      screen.queryByTestId("product-card")
    ).not.toBeInTheDocument();
  });

  test("does not display empty message when wishlist has products", () => {
    renderWishlist(mockProducts);

    expect(
      screen.queryByText("Your wishlist is empty.")
    ).not.toBeInTheDocument();
  });

  test("renders ProductCard for each wishlist product", () => {
    renderWishlist(mockProducts);

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(3);
  });

  test("displays first wishlist product", () => {
    renderWishlist(mockProducts);

    expect(
      screen.getByRole("heading", { name: "Veg Hakka Noodles" })
    ).toBeInTheDocument();
  });

  test("displays second wishlist product", () => {
    renderWishlist(mockProducts);

    expect(
      screen.getByRole("heading", { name: "Chicken Noodles" })
    ).toBeInTheDocument();
  });

  test("displays third wishlist product", () => {
    renderWishlist(mockProducts);

    expect(
      screen.getByRole("heading", { name: "Veg Fried Rice" })
    ).toBeInTheDocument();
  });

  test("displays correct product prices", () => {
    renderWishlist(mockProducts);

    expect(screen.getByText("₹120")).toBeInTheDocument();
    expect(screen.getByText("₹180")).toBeInTheDocument();
    expect(screen.getByText("₹140")).toBeInTheDocument();
  });

  test("marks all wishlist products as Wishlisted", () => {
    renderWishlist(mockProducts);

    expect(
      screen.getAllByText("Wishlisted")
    ).toHaveLength(3);
  });

  test("passes correct props to ProductCard", () => {
    renderWishlist([mockProducts[0]]);

    const receivedProps = ProductCard.mock.calls[0][0];

    expect(receivedProps).toEqual(
      expect.objectContaining({
        product: mockProducts[0],
        addToCart: mockAddToCart,
        toggleWishlist: mockToggleWishlist,
        isWishlisted: true,
      })
    );
  });

  test("calls addToCart when Add to Cart is clicked", () => {
    renderWishlist([mockProducts[0]]);

    fireEvent.click(
      screen.getByRole("button", { name: /add to cart/i })
    );

    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  test("calls toggleWishlist when Remove from Wishlist is clicked", () => {
    renderWishlist([mockProducts[0]]);

    fireEvent.click(
      screen.getByRole("button", {
        name: /remove from wishlist/i,
      })
    );

    expect(mockToggleWishlist).toHaveBeenCalledWith(mockProducts[0]);
  });

  test("displays correct number of wishlist products", () => {
    renderWishlist(mockProducts.slice(0, 2));

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(2);
  });

  test("applies Bootstrap grid classes", () => {
    const { container } = renderWishlist(mockProducts);

    expect(
      container.querySelector(".row.g-4")
    ).toBeInTheDocument();

    expect(
      container.querySelectorAll(".col-12.col-sm-6.col-lg-3")
    ).toHaveLength(3);
  });
});

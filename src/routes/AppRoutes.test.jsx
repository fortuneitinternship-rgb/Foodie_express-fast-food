
import { render, screen, cleanup } from "@testing-library/react";

import {
  describe,
  test,
  expect,
  vi,
  beforeEach,
  afterEach,
} from "vitest";

import { Outlet } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import MainLayout from "../layouts/MainLayout.jsx";

// Mock MainLayout
vi.mock("../layouts/MainLayout.jsx", () => ({
  default: vi.fn(() => (
    <div data-testid="main-layout">
      <Outlet />
    </div>
  )),
}));

// Mock Home page
vi.mock("../pages/Home.jsx", () => ({
  default: () => (
    <div data-testid="home-page">Home Page</div>
  ),
}));

// Mock Products page
vi.mock("../pages/Products.jsx", () => ({
  default: () => (
    <div data-testid="products-page">Products Page</div>
  ),
}));

// Mock ProductDetails page
vi.mock("../pages/ProductDetails.jsx", () => ({
  default: () => (
    <div data-testid="product-details-page">
      Product Details Page
    </div>
  ),
}));

// Mock Cart page
vi.mock("../pages/Cart.jsx", () => ({
  default: () => (
    <div data-testid="cart-page">Cart Page</div>
  ),
}));

// Mock Wishlist page
vi.mock("../pages/Wishlist.jsx", () => ({
  default: () => (
    <div data-testid="wishlist-page">Wishlist Page</div>
  ),
}));

// Mock Login page
vi.mock("../pages/Login.jsx", () => ({
  default: () => (
    <div data-testid="login-page">Login Page</div>
  ),
}));

// Mock Register page
vi.mock("../pages/Register.jsx", () => ({
  default: () => (
    <div data-testid="register-page">Register Page</div>
  ),
}));

// Mock Checkout page
vi.mock("../pages/Checkout.jsx", () => ({
  default: () => (
    <div data-testid="checkout-page">Checkout Page</div>
  ),
}));

describe("AppRoutes Component", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    window.history.pushState({}, "", "/");
  });

  const renderRoutes = (path = "/", props = {}) => {
    window.history.pushState({}, "", path);

    return render(<AppRoutes {...props} />);
  };

  test("renders AppRoutes successfully", () => {
    renderRoutes("/");

    expect(
      screen.getByTestId("main-layout")
    ).toBeInTheDocument();
  });

  test("renders Home page at root route", () => {
    renderRoutes("/");

    expect(
      screen.getByTestId("home-page")
    ).toBeInTheDocument();
  });

  test("renders Products page at /products", () => {
    renderRoutes("/products");

    expect(
      screen.getByTestId("products-page")
    ).toBeInTheDocument();
  });

  test("renders ProductDetails page at /products/:id", () => {
    renderRoutes("/products/123");

    expect(
      screen.getByTestId("product-details-page")
    ).toBeInTheDocument();
  });

  test("renders Cart page at /cart", () => {
    renderRoutes("/cart");

    expect(
      screen.getByTestId("cart-page")
    ).toBeInTheDocument();
  });

  test("renders Wishlist page at /wishlist", () => {
    renderRoutes("/wishlist");

    expect(
      screen.getByTestId("wishlist-page")
    ).toBeInTheDocument();
  });

  test("renders Login page at /login", () => {
    renderRoutes("/login");

    expect(
      screen.getByTestId("login-page")
    ).toBeInTheDocument();
  });

  test("renders Register page at /register", () => {
    renderRoutes("/register");

    expect(
      screen.getByTestId("register-page")
    ).toBeInTheDocument();
  });

  test("renders Checkout page at /checkout", () => {
    renderRoutes("/checkout");

    expect(
      screen.getByTestId("checkout-page")
    ).toBeInTheDocument();
  });

  test("renders MainLayout for valid routes", () => {
    renderRoutes("/products");

    expect(
      screen.getByTestId("main-layout")
    ).toBeInTheDocument();
  });

  test("passes props correctly to MainLayout", () => {
    const props = {
      cart: [],
      wishlist: [],
      products: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      toggleWishlist: vi.fn(),
    };

    renderRoutes("/", props);

    expect(MainLayout).toHaveBeenCalled();

    const receivedProps = MainLayout.mock.calls[0][0];

    expect(receivedProps).toEqual(
      expect.objectContaining(props)
    );
  });

  test("renders 404 page for invalid route", () => {
    renderRoutes("/invalid-page");

    expect(
      screen.getByRole("heading", {
        name: /404 - page not found/i,
      })
    ).toBeInTheDocument();
  });

  test("displays Go Home link on 404 page", () => {
    renderRoutes("/unknown");

    const homeLink = screen.getByRole("link", {
      name: /go home/i,
    });

    expect(homeLink).toBeInTheDocument();

    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("does not render MainLayout for invalid route", () => {
    renderRoutes("/invalid-page");

    expect(
      screen.queryByTestId("main-layout")
    ).not.toBeInTheDocument();
  });

  test("does not render Home page for invalid route", () => {
    renderRoutes("/invalid-page");

    expect(
      screen.queryByTestId("home-page")
    ).not.toBeInTheDocument();
  });
});

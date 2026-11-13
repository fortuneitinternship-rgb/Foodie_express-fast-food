
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route, useOutletContext } from "react-router-dom";
import MainLayout from "./MainLayout";

// Mock Navbar component
vi.mock("../components/Navbar.jsx", () => ({
  default: ({ cart = [], wishlist = [] }) => (
    <div data-testid="mock-navbar">
      <span>Cart Count: {cart.length}</span>
      <span>Wishlist Count: {wishlist.length}</span>
    </div>
  ),
}));

// Mock Footer component
vi.mock("../components/Footer.jsx", () => ({
  default: () => (
    <footer data-testid="mock-footer">
      FoodieExpress Footer
    </footer>
  ),
}));

// Component to test Outlet context
function OutletProbe() {
  const context = useOutletContext();

  return (
    <div data-testid="outlet-context">
      <span>Cart Items: {context.cart?.length ?? 0}</span>
      <span>Wishlist Items: {context.wishlist?.length ?? 0}</span>
      <span>Add To Cart: {typeof context.addToCart}</span>
    </div>
  );
}

// Helper function to render MainLayout
function renderMainLayout(props = {}) {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={<MainLayout {...props} />}
        >
          <Route index element={<OutletProbe />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("FoodieExpress MainLayout Component", () => {

  const cart = [
    { id: "1", name: "Veg Noodles", quantity: 2 },
    { id: "2", name: "Chicken Fried Rice", quantity: 1 },
  ];

  const wishlist = [
    { id: "1", name: "Veg Noodles" },
    { id: "2", name: "Manchurian" },
  ];

  // 1. Test MainLayout rendering
  test("renders MainLayout successfully", () => {
    const { container } = renderMainLayout();

    expect(container.querySelector(".foodie-app"))
      .toBeInTheDocument();
  });

  // 2. Test Navbar rendering
  test("renders Navbar component", () => {
    renderMainLayout();

    expect(screen.getByTestId("mock-navbar"))
      .toBeInTheDocument();
  });

  // 3. Test Footer rendering
  test("renders Footer component", () => {
    renderMainLayout();

    expect(screen.getByTestId("mock-footer"))
      .toBeInTheDocument();

    expect(screen.getByText("FoodieExpress Footer"))
      .toBeInTheDocument();
  });

  // 4. Test main content rendering
  test("renders Outlet content inside main element", () => {
    renderMainLayout();

    const main = screen.getByRole("main");

    expect(main).toHaveClass("foodie-main-content");
    expect(screen.getByTestId("outlet-context"))
      .toBeInTheDocument();
  });

  // 5. Test cart data passed to Navbar
  test("passes cart data to Navbar", () => {
    renderMainLayout({ cart, wishlist });

    expect(screen.getByText("Cart Count: 2"))
      .toBeInTheDocument();
  });

  // 6. Test wishlist data passed to Navbar
  test("passes wishlist data to Navbar", () => {
    renderMainLayout({ cart, wishlist });

    expect(screen.getByText("Wishlist Count: 2"))
      .toBeInTheDocument();
  });

  // 7. Test Outlet context
  test("passes props to Outlet context", () => {
    const addToCart = vi.fn();

    renderMainLayout({
      cart,
      wishlist,
      addToCart,
    });

    expect(screen.getByText("Cart Items: 2"))
      .toBeInTheDocument();

    expect(screen.getByText("Wishlist Items: 2"))
      .toBeInTheDocument();

    expect(screen.getByText("Add To Cart: function"))
      .toBeInTheDocument();
  });

  // 8. Test empty cart and wishlist
  test("handles empty cart and wishlist", () => {
    renderMainLayout({
      cart: [],
      wishlist: [],
    });

    expect(screen.getByText("Cart Count: 0"))
      .toBeInTheDocument();

    expect(screen.getByText("Wishlist Count: 0"))
      .toBeInTheDocument();
  });

  // 9. Test main layout CSS class
  test("applies correct main layout CSS classes", () => {
    const { container } = renderMainLayout();

    expect(container.firstChild)
      .toHaveClass("foodie-app");

    expect(screen.getByRole("main"))
      .toHaveClass("foodie-main-content");
  });

  // 10. Test Footer placement
  test("renders Footer after main content", () => {
    const { container } = renderMainLayout();

    const app = container.querySelector(".foodie-app");
    const main = app.querySelector("main");
    const footer = app.querySelector("footer");

    expect(app).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(
      main.compareDocumentPosition(footer) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

});


import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Cart from "./Cart";

// Mock useOutletContext
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

import { useOutletContext } from "react-router-dom";

describe("FoodieExpress Cart Component", () => {
  const mockCart = [
    {
      id: "1",
      name: "Veg Hakka Noodles",
      price: 120,
      quantity: 2,
      image: "https://example.com/noodles.jpg",
    },
    {
      id: "2",
      name: "Chicken Fried Rice",
      price: 180,
      quantity: 1,
      image: "https://example.com/rice.jpg",
    },
  ];

  let removeFromCart;
  let updateQuantity;

  function renderCart(cart = mockCart) {
    useOutletContext.mockReturnValue({
      cart,
      removeFromCart,
      updateQuantity,
    });

    return render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/products"
            element={<h1>Products Page</h1>}
          />
          <Route
            path="/checkout"
            element={<h1>Checkout Page</h1>}
          />
        </Routes>
      </MemoryRouter>
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
    removeFromCart = vi.fn();
    updateQuantity = vi.fn();
  });

  // 1. Render Cart heading
  test("renders Shopping Cart heading", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { name: "Shopping Cart" })
    ).toBeInTheDocument();
  });

  // 2. Empty cart message
  test("displays empty cart message when cart has no products", () => {
    renderCart([]);

    expect(
      screen.getByText("Your cart is empty.")
    ).toBeInTheDocument();
  });

  // 3. Shop Now link
  test("displays Shop Now link for empty cart", () => {
    renderCart([]);

    expect(
      screen.getByRole("link", { name: "Shop Now" })
    ).toHaveAttribute("href", "/products");
  });

  // 4. Product names
  test("displays all cart product names", () => {
    renderCart();

    expect(
      screen.getByText("Veg Hakka Noodles")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Chicken Fried Rice")
    ).toBeInTheDocument();
  });

  // 5. Individual product prices
  test("displays individual product prices", () => {
    const { container } = renderCart();

    const productRows = container.querySelectorAll(".border-bottom");

    expect(productRows).toHaveLength(2);

    expect(productRows[0].querySelector("p"))
      .toHaveTextContent("₹120");

    expect(productRows[1].querySelector("p"))
      .toHaveTextContent("₹180");
  });

  // 6. Product images
  test("displays product images with correct alt text and source", () => {
    renderCart();

    expect(
      screen.getByAltText("Veg Hakka Noodles")
    ).toHaveAttribute("src", "https://example.com/noodles.jpg");

    expect(
      screen.getByAltText("Chicken Fried Rice")
    ).toHaveAttribute("src", "https://example.com/rice.jpg");
  });

  // 7. Product quantities
  test("displays product quantities", () => {
    renderCart();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  // 8. Cart total
  test("calculates and displays the correct cart total", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { name: "Total: ₹420" })
    ).toBeInTheDocument();
  });

  // 9. Increase quantity
  test("calls updateQuantity when plus button is clicked", () => {
    renderCart();

    const plusButtons = screen.getAllByRole("button", {
      name: "+",
    });

    fireEvent.click(plusButtons[0]);

    expect(updateQuantity).toHaveBeenCalledWith("1", 3);
  });

  // 10. Decrease quantity
  test("calls updateQuantity when minus button is clicked", () => {
    renderCart();

    const minusButtons = screen.getAllByRole("button", {
      name: "−",
    });

    fireEvent.click(minusButtons[0]);

    expect(updateQuantity).toHaveBeenCalledWith("1", 1);
  });

  // 11. Disable minus button at quantity one
  test("disables minus button when product quantity is one", () => {
    renderCart();

    const minusButtons = screen.getAllByRole("button", {
      name: "−",
    });

    expect(minusButtons[0]).toBeEnabled();
    expect(minusButtons[1]).toBeDisabled();
  });

  // 12. Remove product
  test("calls removeFromCart when Remove is clicked", () => {
    renderCart();

    const removeButtons = screen.getAllByRole("button", {
      name: "Remove",
    });

    fireEvent.click(removeButtons[0]);

    expect(removeFromCart).toHaveBeenCalledWith("1");
  });

  // 13. Checkout link
  test("displays Proceed to Checkout link", () => {
    renderCart();

    expect(
      screen.getByRole("link", { name: "Proceed to Checkout" })
    ).toHaveAttribute("href", "/checkout");
  });

  // 14. Hide checkout link for empty cart
  test("does not display checkout link when cart is empty", () => {
    renderCart([]);

    expect(
      screen.queryByRole("link", { name: "Proceed to Checkout" })
    ).not.toBeInTheDocument();
  });

  // 15. Render all product images
  test("renders all cart items", () => {
    const { container } = renderCart();

    expect(container.querySelectorAll("img")).toHaveLength(2);
  });

  // 16. Hide product images for empty cart
  test("does not display product images when cart is empty", () => {
    const { container } = renderCart([]);

    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  // 17. Indian number formatting
  test("formats total using Indian number formatting", () => {
    renderCart([
      {
        id: "3",
        name: "Special Food",
        price: 1000,
        quantity: 2,
        image: "https://example.com/food.jpg",
      },
    ]);

    expect(
      screen.getByRole("heading", { name: "Total: ₹2,000" })
    ).toBeInTheDocument();
  });

  // 18. Bootstrap container classes
  test("applies Bootstrap container classes", () => {
    const { container } = renderCart();

    expect(container.firstChild).toHaveClass("container", "py-5");
  });
});
        
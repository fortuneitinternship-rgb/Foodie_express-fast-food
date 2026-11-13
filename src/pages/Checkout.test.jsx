
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";

// Mock useOutletContext
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

import { useOutletContext } from "react-router-dom";

describe("FoodieExpress Checkout Component", () => {
  const mockCart = [
    {
      id: "1",
      name: "Veg Hakka Noodles",
      price: 120,
      quantity: 2,
    },
    {
      id: "2",
      name: "Chicken Fried Rice",
      price: 180,
      quantity: 1,
    },
  ];

  function renderCheckout(cart = mockCart) {
    useOutletContext.mockReturnValue({ cart });

    return render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/products"
            element={<h1>Products Page</h1>}
          />
        </Routes>
      </MemoryRouter>
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // 1. Render Checkout heading
  test("renders Checkout heading", () => {
    renderCheckout();

    expect(
      screen.getByRole("heading", { name: "Checkout" })
    ).toBeInTheDocument();
  });

  // 2. Display Full Name field
  test("displays Full Name input field", () => {
    renderCheckout();

    expect(
      screen.getByLabelText("Full Name")
    ).toBeInTheDocument();
  });

  // 3. Display Email field
  test("displays Email input field", () => {
    renderCheckout();

    expect(
      screen.getByLabelText("Email")
    ).toBeInTheDocument();
  });

  // 4. Display Delivery Address field
  test("displays Delivery Address textarea", () => {
    renderCheckout();

    expect(
      screen.getByLabelText("Delivery Address")
    ).toBeInTheDocument();
  });

  // 5. Full Name input is required
  test("marks Full Name field as required", () => {
    renderCheckout();

    expect(
      screen.getByLabelText("Full Name")
    ).toBeRequired();
  });

  // 6. Email input is required
  test("marks Email field as required", () => {
    renderCheckout();

    expect(
      screen.getByLabelText("Email")
    ).toBeRequired();
  });

  // 7. Email input has email type
  test("uses email input type for Email field", () => {
    renderCheckout();

    expect(
      screen.getByLabelText("Email")
    ).toHaveAttribute("type", "email");
  });

  // 8. Delivery Address is required
  test("marks Delivery Address as required", () => {
    renderCheckout();

    expect(
      screen.getByLabelText("Delivery Address")
    ).toBeRequired();
  });

  // 9. Display Place Demo Order button
  test("displays Place Demo Order button", () => {
    renderCheckout();

    expect(
      screen.getByRole("button", { name: "Place Demo Order" })
    ).toBeInTheDocument();
  });

  // 10. Display Order Summary
  test("displays Order Summary heading", () => {
    renderCheckout();

    expect(
      screen.getByRole("heading", { name: "Order Summary" })
    ).toBeInTheDocument();
  });

  // 11. Display first cart product
  test("displays first product in order summary", () => {
    renderCheckout();

    expect(
      screen.getByText("Veg Hakka Noodles × 2")
    ).toBeInTheDocument();
  });

  // 12. Display second cart product
  test("displays second product in order summary", () => {
    renderCheckout();

    expect(
      screen.getByText("Chicken Fried Rice × 1")
    ).toBeInTheDocument();
  });

  // 13. Calculate cart total
  test("calculates and displays correct order total", () => {
    renderCheckout();

    expect(
      screen.getByRole("heading", { name: "Total: ₹420" })
    ).toBeInTheDocument();
  });

  // 14. Display empty cart message
  test("displays empty cart message when cart is empty", () => {
    renderCheckout([]);

    expect(
      screen.getByRole("heading", { name: "Your cart is empty." })
    ).toBeInTheDocument();
  });

  // 15. Display Shop Now link for empty cart
  test("displays Shop Now link when cart is empty", () => {
    renderCheckout([]);

    expect(
      screen.getByRole("link", { name: "Shop Now" })
    ).toHaveAttribute("href", "/products");
  });

  // 16. Hide checkout form when cart is empty
  test("does not display checkout form when cart is empty", () => {
    renderCheckout([]);

    expect(
      screen.queryByLabelText("Full Name")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Place Demo Order" })
    ).not.toBeInTheDocument();
  });

  // 17. Format large total using Indian number formatting
  test("formats large order total using Indian number formatting", () => {
    renderCheckout([
      {
        id: "3",
        name: "Special Food",
        price: 1000,
        quantity: 2,
      },
    ]);

    expect(
      screen.getByRole("heading", { name: "Total: ₹2,000" })
    ).toBeInTheDocument();
  });

  // 18. Submit demo order
  test("shows demo checkout alert when form is submitted", () => {
    const alertSpy = vi
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    renderCheckout();

    fireEvent.submit(
      screen.getByRole("button", { name: "Place Demo Order" })
        .closest("form")
    );

    expect(alertSpy).toHaveBeenCalledWith(
      "Demo checkout only. No real order or payment was processed."
    );
  });
});

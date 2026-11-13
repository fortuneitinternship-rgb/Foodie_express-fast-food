
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("FoodieExpress Navbar Component", () => {

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders Navbar successfully", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("navigation", { name: "Main navigation" })
    ).toBeInTheDocument();
  });

  test("displays FoodieExpress logo and brand name", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Foodie")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();
    expect(
      screen.getByText("Fast Food · Fresh · Delivered")
    ).toBeInTheDocument();
  });

  test("displays search input", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("searchbox", { name: "Search food" })
    ).toBeInTheDocument();
  });

  test("allows users to enter search text", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const searchInput = screen.getByRole("searchbox");

    fireEvent.change(searchInput, {
      target: { value: "Veg Noodles" },
    });

    expect(searchInput).toHaveValue("Veg Noodles");
  });

  test("displays Home, Wishlist, Cart and Login links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Home" }))
      .toHaveAttribute("href", "/");

    expect(screen.getByRole("link", { name: /Wishlist/ }))
      .toHaveAttribute("href", "/wishlist");

    expect(screen.getByRole("link", { name: /Cart/ }))
      .toHaveAttribute("href", "/cart");

    expect(screen.getByRole("link", { name: "Login" }))
      .toHaveAttribute("href", "/login");
  });

  test("displays wishlist item count", () => {
    render(
      <MemoryRouter>
        <Navbar wishlist={[1, 2, 3]} />
      </MemoryRouter>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("displays cart quantity correctly", () => {
    render(
      <MemoryRouter>
        <Navbar
          cart={[
            { id: 1, quantity: 2 },
            { id: 2, quantity: 3 },
          ]}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("uses default quantity when quantity is missing", () => {
    render(
      <MemoryRouter>
        <Navbar cart={[{ id: 1 }, { id: 2 }]} />
      </MemoryRouter>
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("displays all food categories", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const categories = [
      "All Items",
      "Veg Noodles",
      "Non-Veg Noodles",
      "Veg Fried Rice",
      "Non-Veg Fried Rice",
      "Manchurian",
      "Cool Drinks",
    ];

    categories.forEach((category) => {
      expect(screen.getByRole("link", { name: category }))
        .toBeInTheDocument();
    });
  });

  test("All Items category links to products page", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "All Items" }))
      .toHaveAttribute("href", "/products");
  });

  test("food categories contain correct URLs", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Veg Noodles" }))
      .toHaveAttribute("href", "/products?category=Veg%20Noodles");

    expect(screen.getByRole("link", { name: "Cool Drinks" }))
      .toHaveAttribute("href", "/products?category=Cool%20Drinks");
  });

  test("first category has active class", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "All Items" }))
      .toHaveClass("active");
  });

  test("search submits the correct URL", () => {
    const locationSetter = vi.fn();

    vi.stubGlobal("location", {
      set href(value) {
        locationSetter(value);
      },
      get href() {
        return "http://localhost/";
      },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Veg Noodles" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(locationSetter).toHaveBeenCalledWith(
      "/products?search=Veg%20Noodles"
    );
  });

});

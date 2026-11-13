
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("FoodieExpress Footer Component", () => {

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  test("renders the FoodieExpress logo", () => {
    expect(screen.getByText("Foodie")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();
  });

  test("displays the footer description", () => {
    expect(
      screen.getByText("Your favourite fast food, delivered fresh.")
    ).toBeInTheDocument();
  });

  test("displays the footer tagline", () => {
    expect(
      screen.getByText(
        "Fresh flavours. Fast delivery. Happy moments."
      )
    ).toBeInTheDocument();
  });

  test("displays Quick Links heading", () => {
    expect(
      screen.getByRole("heading", { name: "Quick Links" })
    ).toBeInTheDocument();
  });

  test("displays all navigation links", () => {
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");

    expect(screen.getByRole("link", { name: "Our Menu" }))
      .toHaveAttribute("href", "/products");

    expect(screen.getByRole("link", { name: "Wishlist" }))
      .toHaveAttribute("href", "/wishlist");

    expect(screen.getByRole("link", { name: "My Cart" }))
      .toHaveAttribute("href", "/cart");
  });

  test("displays Customer Service information", () => {
    expect(
      screen.getByRole("heading", { name: "Customer Service" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("support@foodieexpress.com")
    ).toHaveAttribute(
      "href",
      "mailto:support@foodieexpress.com"
    );
  });

  test("displays Login / Register link", () => {
    expect(
      screen.getByRole("link", { name: "Login / Register" })
    ).toHaveAttribute("href", "/login");
  });

  test("displays copyright information", () => {
    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} FoodieExpress. All rights reserved.`
      )
    ).toBeInTheDocument();
  });

  test("displays footer bottom message", () => {
    expect(
      screen.getByText("Made with ❤️ for fast-food lovers.")
    ).toBeInTheDocument();
  });

});

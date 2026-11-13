
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Card from "./Card";

describe("FoodieExpress Card Component", () => {

  // 1. Test Card rendering
  test("renders Card component successfully", () => {
    render(<Card>FoodieExpress Card</Card>);

    expect(screen.getByText("FoodieExpress Card"))
      .toBeInTheDocument();
  });

  // 2. Test default CSS class
  test("applies default foodie-card class", () => {
    const { container } = render(
      <Card>Test Card</Card>
    );

    expect(container.firstChild)
      .toHaveClass("foodie-card");
  });

  // 3. Test custom CSS class
  test("applies custom className", () => {
    const { container } = render(
      <Card className="custom-card">
        Test Card
      </Card>
    );

    expect(container.firstChild)
      .toHaveClass("foodie-card", "custom-card");
  });

  // 4. Test multiple CSS classes
  test("supports multiple custom CSS classes", () => {
    const { container } = render(
      <Card className="shadow-lg rounded">
        Test Card
      </Card>
    );

    expect(container.firstChild)
      .toHaveClass("foodie-card", "shadow-lg", "rounded");
  });

  // 5. Test children rendering
  test("renders children inside Card", () => {
    render(
      <Card>
        <h2>Welcome to FoodieExpress</h2>
        <p>Fresh and delicious food.</p>
      </Card>
    );

    expect(
      screen.getByRole("heading", {
        name: "Welcome to FoodieExpress",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Fresh and delicious food.")
    ).toBeInTheDocument();
  });

  // 6. Test empty Card
  test("renders Card without children", () => {
    const { container } = render(<Card />);

    expect(container.firstChild)
      .toHaveClass("foodie-card");
  });

  // 7. Test custom HTML attributes
  test("passes custom HTML attributes to Card", () => {
    render(
      <Card data-testid="foodie-card">
        Test Card
      </Card>
    );

    expect(screen.getByTestId("foodie-card"))
      .toBeInTheDocument();
  });

  // 8. Test id attribute
  test("accepts id attribute", () => {
    const { container } = render(
      <Card id="product-card">
        Product Details
      </Card>
    );

    const card = container.querySelector(".foodie-card");

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("id", "product-card");
  });

  // 9. Test title attribute
  test("accepts title attribute", () => {
    const { container } = render(
      <Card title="Food Product Card">
        <p>Product</p>
      </Card>
    );

    const card = container.querySelector(".foodie-card");

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("title", "Food Product Card");
  });

  // 10. Test default class with no custom class
  test("renders correctly without custom className", () => {
    const { container } = render(
      <Card>Default Card</Card>
    );

    expect(container.firstChild.className)
      .toBe("foodie-card");
  });

});


import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Button from "./Button";

describe("FoodieExpress Button Component", () => {

  // 1. Test Button rendering
  test("renders Button component successfully", () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByRole("button", { name: "Click Me" }))
      .toBeInTheDocument();
  });

  // 2. Test default variant
  test("applies primary variant by default", () => {
    render(<Button>Primary Button</Button>);

    expect(screen.getByRole("button"))
      .toHaveClass("foodie-btn", "foodie-btn-primary");
  });

  // 3. Test secondary variant
  test("applies secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);

    expect(screen.getByRole("button"))
      .toHaveClass("foodie-btn-secondary");
  });

  // 4. Test success variant
  test("applies success variant", () => {
    render(<Button variant="success">Success</Button>);

    expect(screen.getByRole("button"))
      .toHaveClass("foodie-btn-success");
  });

  // 5. Test danger variant
  test("applies danger variant", () => {
    render(<Button variant="danger">Delete</Button>);

    expect(screen.getByRole("button"))
      .toHaveClass("foodie-btn-danger");
  });

  // 6. Test custom className
  test("applies custom className", () => {
    render(
      <Button className="custom-button">Custom</Button>
    );

    expect(screen.getByRole("button"))
      .toHaveClass("foodie-btn", "foodie-btn-primary", "custom-button");
  });

  // 7. Test multiple custom classes
  test("supports multiple custom classes", () => {
    render(
      <Button className="rounded shadow-lg">Styled</Button>
    );

    expect(screen.getByRole("button"))
      .toHaveClass("rounded", "shadow-lg");
  });

  // 8. Test children rendering
  test("renders children correctly", () => {
    render(
      <Button>
        <span>Add to Cart</span>
      </Button>
    );

    expect(screen.getByText("Add to Cart"))
      .toBeInTheDocument();
  });

  // 9. Test click event
  test("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick}>Click Me</Button>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 10. Test disabled button
  test("disables the button when disabled is true", () => {
    render(
      <Button disabled>Disabled Button</Button>
    );

    expect(screen.getByRole("button"))
      .toBeDisabled();
  });

  // 11. Test enabled button
  test("keeps the button enabled by default", () => {
    render(<Button>Enabled Button</Button>);

    expect(screen.getByRole("button"))
      .toBeEnabled();
  });

  // 12. Test custom button type
  test("accepts submit button type", () => {
    render(
      <Button type="submit">Submit</Button>
    );

    expect(screen.getByRole("button"))
      .toHaveAttribute("type", "submit");
  });

  // 13. Test default button type
  test("uses button type by default", () => {
    render(<Button>Default Type</Button>);

    expect(screen.getByRole("button"))
      .toHaveAttribute("type", "button");
  });

  // 14. Test custom HTML attributes
  test("accepts custom HTML attributes", () => {
    render(
      <Button data-testid="foodie-button" id="add-button">
        Add
      </Button>
    );

    const button = screen.getByTestId("foodie-button");

    expect(button).toHaveAttribute("id", "add-button");
  });

  // 15. Test title attribute
  test("accepts title attribute", () => {
    render(
      <Button title="Add product to cart">
        Add to Cart
      </Button>
    );

    expect(screen.getByRole("button"))
      .toHaveAttribute("title", "Add product to cart");
  });

});

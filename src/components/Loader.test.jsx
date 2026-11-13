
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Loader from "./Loader";

describe("FoodieExpress Loader Component", () => {

  test("renders Loader component successfully", () => {
    render(<Loader />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("displays default loading message", () => {
    render(<Loader />);

    expect(
      screen.getByText("Loading delicious food...")
    ).toBeInTheDocument();
  });

  test("displays custom loading message", () => {
    render(<Loader message="Loading products..." />);

    expect(
      screen.getByText("Loading products...")
    ).toBeInTheDocument();
  });

  test("displays the spinner element", () => {
    const { container } = render(<Loader />);

    expect(
      container.querySelector(".foodie-spinner")
    ).toBeInTheDocument();
  });

  test("spinner is hidden from screen readers", () => {
    const { container } = render(<Loader />);

    const spinner = container.querySelector(".foodie-spinner");

    expect(spinner).toHaveAttribute("aria-hidden", "true");
  });

  test("loader has correct accessibility attributes", () => {
    render(<Loader />);

    const loader = screen.getByRole("status");

    expect(loader).toHaveAttribute("aria-live", "polite");
  });

  test("renders custom empty message when provided", () => {
    render(<Loader message="" />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

});

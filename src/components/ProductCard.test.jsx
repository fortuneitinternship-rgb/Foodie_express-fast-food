
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import ProductCard from "./ProductCard";

describe("FoodieExpress ProductCard Component", () => {

  const mockProduct = {
    id: 1,
    name: "Veg Noodles",
    category: "Veg Noodles",
    description: "Delicious and spicy vegetable noodles.",
    price: 120,
    rating: 4.5,
    image: "https://example.com/veg-noodles.jpg",
  };

  // 1. Test ProductCard rendering
  test("renders ProductCard successfully", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  // 2. Test product name
  test("displays product name", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("heading", { name: "Veg Noodles" })
    ).toBeInTheDocument();
  });

  // 3. Test product category
  test("displays product category", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getAllByText("Veg Noodles")).toHaveLength(2);
  });

  // 4. Test product description
  test("displays product description", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByText("Delicious and spicy vegetable noodles.")
    ).toBeInTheDocument();
  });

  // 5. Test product price
  test("displays product price", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("₹120")).toBeInTheDocument();
  });

  // 6. Test product rating
  test("displays product rating", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("⭐ 4.5")).toBeInTheDocument();
  });

  // 7. Test product image
  test("displays product image with correct source", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole("img", {
      name: "Veg Noodles",
    });

    expect(image).toHaveAttribute(
      "src",
      "https://example.com/veg-noodles.jpg"
    );
  });

  // 8. Test Add to Cart button
  test("displays Add to Cart button", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("button", { name: "Add to Cart" })
    ).toBeInTheDocument();
  });

  // 9. Test Add to Cart functionality
  test("calls addToCart when button is clicked", () => {
    const addToCart = vi.fn();

    render(
      <ProductCard
        product={mockProduct}
        addToCart={addToCart}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Add to Cart" })
    );

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });

  // 10. Test Wishlist functionality
  test("calls toggleWishlist when wishlist button is clicked", () => {
    const toggleWishlist = vi.fn();

    render(
      <ProductCard
        product={mockProduct}
        toggleWishlist={toggleWishlist}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Toggle wishlist" })
    );

    expect(toggleWishlist).toHaveBeenCalledTimes(1);
    expect(toggleWishlist).toHaveBeenCalledWith(mockProduct);
  });

  // 11. Test filled wishlist heart
  test("displays filled heart when product is wishlisted", () => {
    render(
      <ProductCard
        product={mockProduct}
        isWishlisted={true}
      />
    );

    expect(screen.getByText("❤️")).toBeInTheDocument();
  });

  // 12. Test empty wishlist heart
  test("displays empty heart when product is not wishlisted", () => {
    render(
      <ProductCard
        product={mockProduct}
        isWishlisted={false}
      />
    );

    expect(screen.getByText("🤍")).toBeInTheDocument();
  });

  // 13. Test fallback image when image is missing
  test("uses fallback image when product image is missing", () => {
    const productWithoutImage = {
      ...mockProduct,
      image: "",
    };

    render(<ProductCard product={productWithoutImage} />);

    const image = screen.getByRole("img", {
      name: "Veg Noodles",
    });

    expect(image.getAttribute("src")).toBeTruthy();
  });

  // 14. Test image loading error
  test("loads fallback image when product image fails", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole("img", {
      name: "Veg Noodles",
    });

    fireEvent.error(image);

    expect(image.getAttribute("src")).not.toBe(
      "https://example.com/veg-noodles.jpg"
    );

    expect(image.onerror).toBeNull();
  });

  // 15. Test missing addToCart callback
  test("does not throw error when addToCart callback is missing", () => {
    render(<ProductCard product={mockProduct} />);

    expect(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Add to Cart" })
      );
    }).not.toThrow();
  });

  // 16. Test missing toggleWishlist callback
  test("does not throw error when toggleWishlist callback is missing", () => {
    render(<ProductCard product={mockProduct} />);

    expect(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Toggle wishlist" })
      );
    }).not.toThrow();
  });

});

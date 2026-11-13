
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { products } from "../data/products.jsx";

// Mock ProductCard component
vi.mock("../components/ProductCard.jsx", () => ({
  default: ({ product, addToCart, toggleWishlist, isWishlisted }) => (
    <div data-testid="product-card">
      <h3>{product.name}</h3>

      <button onClick={() => addToCart?.(product)}>
        Add to Cart
      </button>

      <button onClick={() => toggleWishlist?.(product)}>
        Toggle Wishlist
      </button>

      <span>
        {isWishlisted ? "Wishlisted" : "Not Wishlisted"}
      </span>
    </div>
  ),
}));

// Mock useOutletContext
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

import { useOutletContext } from "react-router-dom";

describe("FoodieExpress Home Component", () => {
  let addToCart;
  let toggleWishlist;

  function renderHome(wishlist = []) {
    useOutletContext.mockReturnValue({
      addToCart,
      toggleWishlist,
      wishlist,
    });

    return render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
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
    addToCart = vi.fn();
    toggleWishlist = vi.fn();
  });

  // 1. Render Home component
  test("renders Home component successfully", () => {
    const { container } = renderHome();

    expect(
      container.querySelector(".foodie-page")
    ).toBeInTheDocument();
  });

  // 2. Main banner heading
  test("displays homepage banner heading", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        name: "Order your favourite fast food!",
      })
    ).toBeInTheDocument();
  });

  // 3. Banner tagline
  test("displays banner tagline", () => {
    renderHome();

    expect(
      screen.getByText("GOOD FOOD. GOOD MOOD.")
    ).toBeInTheDocument();
  });

  // 4. Banner description
  test("displays banner description", () => {
    renderHome();

    expect(
      screen.getByText(
        "Hot noodles, fried rice, Manchurian & cool drinks."
      )
    ).toBeInTheDocument();
  });

  // 5. Explore Menu link
  test("displays Explore Menu link", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: "Explore Menu" })
    ).toHaveAttribute("href", "/products");
  });

  // 6. Search input
  test("displays search input with correct placeholder", () => {
    renderHome();

    expect(
      screen.getByPlaceholderText(
        "Search noodles, fried rice, drinks..."
      )
    ).toHaveAttribute("type", "search");
  });

  // 7. Search input accepts text
  test("allows users to enter search text", () => {
    renderHome();

    const searchInput = screen.getByPlaceholderText(
      "Search noodles, fried rice, drinks..."
    );

    fireEvent.change(searchInput, {
      target: { value: "Veg Noodles" },
    });

    expect(searchInput).toHaveValue("Veg Noodles");
  });

  // 8. Category section heading
  test("displays food category section heading", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        name: "What's on your mind?",
      })
    ).toBeInTheDocument();
  });

  // 9. Display all six food categories
  test("displays all six food categories", () => {
    const { container } = renderHome();

    const categorySection = container.querySelector(
      ".foodie-category-row"
    );

    expect(categorySection).toBeInTheDocument();

    const categoryNames = [
      "Veg Noodles",
      "Non-Veg Noodles",
      "Veg Fried Rice",
      "Non-Veg Fried Rice",
      "Manchurian",
      "Cool Drinks",
    ];

    categoryNames.forEach((name) => {
      expect(
        within(categorySection).getByText(name)
      ).toBeInTheDocument();
    });

    expect(
      within(categorySection).getAllByRole("link")
    ).toHaveLength(6);
  });

  // 10. Verify Veg Noodles category link
  test("has the correct Veg Noodles category URL", () => {
    const { container } = renderHome();

    const categoryLink = container.querySelector(
      'a[href="/products?category=Veg%20Noodles"]'
    );

    expect(categoryLink).toBeInTheDocument();
    expect(categoryLink).toHaveTextContent("Veg Noodles");
  });

  // 11. Verify Non-Veg Noodles category link
  test("has the correct Non-Veg Noodles category URL", () => {
    const { container } = renderHome();

    const categoryLink = container.querySelector(
      'a[href="/products?category=Non-Veg%20Noodles"]'
    );

    expect(categoryLink).toBeInTheDocument();
    expect(categoryLink).toHaveTextContent("Non-Veg Noodles");
  });

  // 12. Verify Cool Drinks category link
  test("has the correct Cool Drinks category URL", () => {
    const { container } = renderHome();

    const categoryLink = container.querySelector(
      'a[href="/products?category=Cool%20Drinks"]'
    );

    expect(categoryLink).toBeInTheDocument();
    expect(categoryLink).toHaveTextContent("Cool Drinks");
  });

  // 13. Popular Fast Food heading
  test("displays Popular Fast Food heading", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        name: "Popular Fast Food",
      })
    ).toBeInTheDocument();
  });

  // 14. Popular food description
  test("displays popular food description", () => {
    renderHome();

    expect(
      screen.getByText(
        "Discover delicious favourites from our menu."
      )
    ).toBeInTheDocument();
  });

  // 15. View all link
  test("displays View all link", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: "View all →" })
    ).toHaveAttribute("href", "/products");
  });

  // 16. Render only featured products
  test("renders only featured products", () => {
    renderHome();

    const featuredProducts = products.filter(
      (product) => product.featured
    );

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(featuredProducts.length);
  });

  // 17. Display featured product names
  test("displays featured product names", () => {
    renderHome();

    const featuredProducts = products.filter(
      (product) => product.featured
    );

    featuredProducts.forEach((product) => {
      expect(
        screen.getByRole("heading", {
          name: product.name,
        })
      ).toBeInTheDocument();
    });
  });

  // 18. Add to Cart functionality
  test("calls addToCart when Add to Cart is clicked", () => {
    renderHome();

    fireEvent.click(
      screen.getAllByRole("button", {
        name: "Add to Cart",
      })[0]
    );

    expect(addToCart).toHaveBeenCalledTimes(1);

    expect(addToCart).toHaveBeenCalledWith(
      products.find((product) => product.featured)
    );
  });

  // 19. Wishlist functionality
  test("calls toggleWishlist when Toggle Wishlist is clicked", () => {
    renderHome();

    fireEvent.click(
      screen.getAllByRole("button", {
        name: "Toggle Wishlist",
      })[0]
    );

    expect(toggleWishlist).toHaveBeenCalledTimes(1);
  });

  // 20. Wishlisted product status
  test("displays Wishlisted status for wishlisted products", () => {
    const featuredProduct = products.find(
      (product) => product.featured
    );

    expect(featuredProduct).toBeDefined();

    renderHome([{ id: featuredProduct.id }]);

    expect(
      screen.getAllByText("Wishlisted")
    ).toHaveLength(1);
  });

  // 21. Not wishlisted product status
  test("displays Not Wishlisted for products not in wishlist", () => {
    renderHome([]);

    expect(
      screen.getAllByText("Not Wishlisted").length
    ).toBeGreaterThan(0);
  });

  // 22. Browse all menu items
  test("displays Browse All link with correct product count", () => {
    renderHome();

    expect(
      screen.getByRole("link", {
        name: `Browse All ${products.length} Menu Items`,
      })
    ).toHaveAttribute("href", "/products");
  });
});

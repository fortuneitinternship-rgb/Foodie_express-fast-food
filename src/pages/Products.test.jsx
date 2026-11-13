
import { render, screen, fireEvent } from "@testing-library/react";
import {
  describe,
  test,
  expect,
  vi,
  beforeEach,
} from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Products from "./Products";
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

describe("FoodieExpress Products Component", () => {
  let addToCart;
  let toggleWishlist;

  function renderProducts(initialEntry = "/products", wishlist = []) {
    useOutletContext.mockReturnValue({
      addToCart,
      toggleWishlist,
      wishlist,
    });

    return render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route
            path="/products"
            element={<Products />}
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

  // 1. Render Products component
  test("renders Products component successfully", () => {
    const { container } = renderProducts();

    expect(
      container.querySelector(".container")
    ).toBeInTheDocument();
  });

  // 2. Display page heading
  test("displays All Products heading", () => {
    renderProducts();

    expect(
      screen.getByRole("heading", {
        name: "All Products",
      })
    ).toBeInTheDocument();
  });

  // 3. Display search input
  test("displays product search input", () => {
    renderProducts();

    expect(
      screen.getByPlaceholderText("Search products...")
    ).toBeInTheDocument();
  });

  // 4. Search input has correct initial value
  test("search input is empty by default", () => {
    renderProducts();

    expect(
      screen.getByPlaceholderText("Search products...")
    ).toHaveValue("");
  });

  // 5. Search input accepts text
  test("allows users to enter search text", () => {
    renderProducts();

    const searchInput = screen.getByPlaceholderText(
      "Search products..."
    );

    fireEvent.change(searchInput, {
      target: { value: "Noodles" },
    });

    expect(searchInput).toHaveValue("Noodles");
  });

  // 6. Search filters products by name
  test("filters products based on search text", () => {
    renderProducts();

    const searchInput = screen.getByPlaceholderText(
      "Search products..."
    );

    fireEvent.change(searchInput, {
      target: { value: "Veg Hakka Noodles" },
    });

    const matchingProducts = products.filter((product) =>
      product.name.toLowerCase().includes("veg hakka noodles")
    );

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(matchingProducts.length);

    matchingProducts.forEach((product) => {
      expect(
        screen.getByRole("heading", {
          name: product.name,
        })
      ).toBeInTheDocument();
    });
  });

  // 7. Search is case insensitive
  test("search works without case sensitivity", () => {
    renderProducts();

    fireEvent.change(
      screen.getByPlaceholderText("Search products..."),
      {
        target: { value: "VEG HAKKA NOODLES" },
      }
    );

    expect(
      screen.getByRole("heading", {
        name: /veg hakka noodles/i,
      })
    ).toBeInTheDocument();
  });

  // 8. Display category dropdown
  test("displays category dropdown", () => {
    renderProducts();

    expect(
      screen.getByRole("combobox")
    ).toBeInTheDocument();
  });

  // 9. Display all category options
  test("displays all food category options", () => {
    renderProducts();

    const categorySelect = screen.getByRole("combobox");

    const categoryNames = [
      "All Categories",
      "Veg Noodles",
      "Non-Veg Noodles",
      "Veg Fried Rice",
      "Non-Veg Fried Rice",
      "Manchurian",
      "Cool Drinks",
    ];

    categoryNames.forEach((category) => {
      expect(
        Array.from(categorySelect.options).some(
          (option) => option.textContent === category
        )
      ).toBe(true);
    });

    expect(categorySelect.options).toHaveLength(7);
  });

  // 10. Default category
  test("selects All Categories by default", () => {
    renderProducts();

    expect(
      screen.getByRole("combobox")
    ).toHaveValue("All");
  });

  // 11. Filter products by category
  test("filters products when a category is selected", () => {
    renderProducts();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Veg Noodles" },
    });

    const matchingProducts = products.filter(
      (product) => product.category === "Veg Noodles"
    );

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(matchingProducts.length);

    matchingProducts.forEach((product) => {
      expect(
        screen.getByRole("heading", {
          name: product.name,
        })
      ).toBeInTheDocument();
    });
  });

  // 12. Search products using URL parameter
  test("loads search value from URL parameter", () => {
    renderProducts("/products?search=Noodles");

    expect(
      screen.getByPlaceholderText("Search products...")
    ).toHaveValue("Noodles");

    const matchingProducts = products.filter((product) =>
      product.name.toLowerCase().includes("noodles")
    );

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(matchingProducts.length);
  });

  // 13. Filter products using category URL parameter
  test("loads category from URL parameter", () => {
    renderProducts("/products?category=Cool%20Drinks");

    expect(
      screen.getByRole("combobox")
    ).toHaveValue("Cool Drinks");

    const matchingProducts = products.filter(
      (product) => product.category === "Cool Drinks"
    );

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(matchingProducts.length);
  });

  // 14. Search and category filters work together
  test("applies search and category filters together", () => {
    renderProducts(
      "/products?search=Veg&category=Veg%20Noodles"
    );

    const matchingProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes("veg") &&
        product.category === "Veg Noodles"
    );

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(matchingProducts.length);
  });

  // 15. Display no products found message
  test("displays No products found for unmatched search", () => {
    renderProducts("/products?search=UnknownFoodItem123");

    expect(
      screen.getByText("No products found.")
    ).toBeInTheDocument();
  });

  // 16. Hide no products message when products are available
  test("does not display No products found when products exist", () => {
    renderProducts();

    expect(
      screen.queryByText("No products found.")
    ).not.toBeInTheDocument();
  });

  // 17. Add to Cart functionality
  test("calls addToCart when Add to Cart is clicked", () => {
    renderProducts();

    fireEvent.click(
      screen.getAllByRole("button", {
        name: "Add to Cart",
      })[0]
    );

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(products[0]);
  });

  // 18. Wishlist functionality
  test("calls toggleWishlist when Toggle Wishlist is clicked", () => {
    renderProducts();

    fireEvent.click(
      screen.getAllByRole("button", {
        name: "Toggle Wishlist",
      })[0]
    );

    expect(toggleWishlist).toHaveBeenCalledTimes(1);
    expect(toggleWishlist).toHaveBeenCalledWith(products[0]);
  });

  // 19. Display wishlisted products
  test("displays Wishlisted status for wishlisted products", () => {
    const wishlistedProduct = products[0];

    renderProducts("/products", [
      { id: wishlistedProduct.id },
    ]);

    expect(
      screen.getAllByText("Wishlisted")
    ).toHaveLength(1);
  });

  // 20. Display products that are not wishlisted
  test("displays Not Wishlisted for products outside wishlist", () => {
    renderProducts();

    expect(
      screen.getAllByText("Not Wishlisted").length
    ).toBe(products.length);
  });

  // 21. Display correct product count
  test("displays all products by default", () => {
    renderProducts();

    expect(
      screen.getAllByTestId("product-card")
    ).toHaveLength(products.length);
  });

  // 22. Display products in Bootstrap grid
  test("displays products using Bootstrap grid layout", () => {
    const { container } = renderProducts();

    expect(
      container.querySelector(".row.g-4")
    ).toBeInTheDocument();

    expect(
      container.querySelectorAll(".col-12.col-sm-6.col-lg-3")
    ).toHaveLength(products.length);
  });
});

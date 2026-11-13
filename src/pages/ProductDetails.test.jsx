
import { render, screen, fireEvent } from "@testing-library/react";
import {
  describe,
  test,
  expect,
  vi,
  beforeEach,
} from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { products } from "../data/products.jsx";

// Mock useOutletContext
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

import { useOutletContext } from "react-router-dom";

describe("FoodieExpress ProductDetails Component", () => {
  let addToCart;
  let testProducts;
  let featuredProduct;

  function renderProductDetails(productId = "1", productList = testProducts) {
    useOutletContext.mockReturnValue({
      products: productList,
      addToCart,
    });

    return render(
      <MemoryRouter initialEntries={[`/products/${productId}`]}>
        <Routes>
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />
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
    testProducts = products;

    featuredProduct = products[0];
  });

  // 1. Render ProductDetails component
  test("renders ProductDetails component successfully", () => {
    const { container } = renderProductDetails(
      String(featuredProduct.id)
    );

    expect(
      container.querySelector(".container")
    ).toBeInTheDocument();
  });

  // 2. Display product name
  test("displays product name", () => {
    renderProductDetails(String(featuredProduct.id));

    expect(
      screen.getByRole("heading", {
        name: featuredProduct.name,
      })
    ).toBeInTheDocument();
  });

  // 3. Display product description
  test("displays product description", () => {
    renderProductDetails(String(featuredProduct.id));

    expect(
      screen.getByText(featuredProduct.description)
    ).toBeInTheDocument();
  });

  // 4. Display product rating
  test("displays product rating", () => {
    renderProductDetails(String(featuredProduct.id));

    expect(
      screen.getByText(`Rating: ⭐ ${featuredProduct.rating}`)
    ).toBeInTheDocument();
  });

  // 5. Display product price
  test("displays product price", () => {
    renderProductDetails(String(featuredProduct.id));

    const formattedPrice = featuredProduct.price.toLocaleString("en-IN");

    expect(
      screen.getByRole("heading", {
        name: `₹${formattedPrice}`,
      })
    ).toBeInTheDocument();
  });

  // 6. Display product image
  test("displays product image with correct source", () => {
    renderProductDetails(String(featuredProduct.id));

    const productImage = screen.getByRole("img", {
      name: featuredProduct.name,
    });

    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute(
      "src",
      featuredProduct.image
    );
  });

  // 7. Product image has correct alt text
  test("displays correct alt text for product image", () => {
    renderProductDetails(String(featuredProduct.id));

    expect(
      screen.getByAltText(featuredProduct.name)
    ).toBeInTheDocument();
  });

  // 8. Product image has Bootstrap classes
  test("product image has correct CSS classes", () => {
    renderProductDetails(String(featuredProduct.id));

    const productImage = screen.getByRole("img", {
      name: featuredProduct.name,
    });

    expect(productImage).toHaveClass("img-fluid");
    expect(productImage).toHaveClass("rounded");
  });

  // 9. Display Add to Cart button
  test("displays Add to Cart button", () => {
    renderProductDetails(String(featuredProduct.id));

    expect(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    ).toBeInTheDocument();
  });

  // 10. Add to Cart button has correct CSS class
  test("Add to Cart button has correct CSS class", () => {
    renderProductDetails(String(featuredProduct.id));

    expect(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    ).toHaveClass("btn-dark");
  });

  // 11. Add product to cart
  test("calls addToCart when Add to Cart is clicked", () => {
    renderProductDetails(String(featuredProduct.id));

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    );

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(featuredProduct);
  });

  // 12. Product not found message
  test("displays Product not found for invalid product ID", () => {
    renderProductDetails("invalid-id");

    expect(
      screen.getByRole("heading", {
        name: "Product not found",
      })
    ).toBeInTheDocument();
  });

  // 13. Back to Products link
  test("displays Back to Products link for invalid product", () => {
    renderProductDetails("invalid-id");

    expect(
      screen.getByRole("link", {
        name: "Back to Products",
      })
    ).toBeInTheDocument();
  });

  // 14. Back to Products link has correct URL
  test("Back to Products link navigates to Products page", () => {
    renderProductDetails("invalid-id");

    expect(
      screen.getByRole("link", {
        name: "Back to Products",
      })
    ).toHaveAttribute("href", "/products");
  });

  // 15. Product details are hidden for invalid product
  test("does not display Add to Cart for invalid product", () => {
    renderProductDetails("invalid-id");

    expect(
      screen.queryByRole("button", {
        name: "Add to Cart",
      })
    ).not.toBeInTheDocument();
  });

  // 16. Product image is hidden for invalid product
  test("does not display product image for invalid product", () => {
    renderProductDetails("invalid-id");

    expect(
      screen.queryByRole("img")
    ).not.toBeInTheDocument();
  });

  // 17. Product description is hidden for invalid product
  test("does not display product description for invalid product", () => {
    renderProductDetails("invalid-id");

    expect(
      screen.queryByText(featuredProduct.description)
    ).not.toBeInTheDocument();
  });

  // 18. Product details container
  test("displays product details in Bootstrap row layout", () => {
    const { container } = renderProductDetails(
      String(featuredProduct.id)
    );

    expect(
      container.querySelector(".row.g-5")
    ).toBeInTheDocument();
  });

  // 19. Product image column
  test("displays product image inside Bootstrap column", () => {
    const { container } = renderProductDetails(
      String(featuredProduct.id)
    );

    expect(
      container.querySelector(".col-md-6 img")
    ).toBeInTheDocument();
  });

  // 20. Product information column
  test("displays product information inside Bootstrap column", () => {
    const { container } = renderProductDetails(
      String(featuredProduct.id)
    );

    const columns = container.querySelectorAll(".col-md-6");

    expect(columns).toHaveLength(2);
    expect(columns[1]).toContainElement(
      screen.getByRole("heading", {
        name: featuredProduct.name,
      })
    );
  });
});

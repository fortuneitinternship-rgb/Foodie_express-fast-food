
import { describe, test, expect } from "vitest";
import products, { products as namedProducts, getFoodImage } from "./products";

describe("FoodieExpress Products Data", () => {

  // 1. Test products array
  test("exports products as an array", () => {
    expect(Array.isArray(products)).toBe(true);
  });

  // 2. Test total products
  test("contains exactly 60 products", () => {
    expect(products).toHaveLength(60);
  });

  // 3. Test named export
  test("exports products using named export", () => {
    expect(namedProducts).toBe(products);
  });

  // 4. Test unique product IDs
  test("every product has a unique ID", () => {
    const ids = products.map((product) => product.id);

    expect(new Set(ids).size).toBe(products.length);
  });

  // 5. Test product names
  test("every product has a valid name", () => {
    products.forEach((product) => {
      expect(product.name).toBeTruthy();
      expect(typeof product.name).toBe("string");
    });
  });

  // 6. Test categories
  test("contains only valid food categories", () => {
    const validCategories = [
      "Veg Noodles",
      "Non-Veg Noodles",
      "Veg Fried Rice",
      "Non-Veg Fried Rice",
      "Manchurian",
      "Cool Drinks",
    ];

    products.forEach((product) => {
      expect(validCategories).toContain(product.category);
    });
  });

  // 7. Test product prices
  test("every product has a valid positive price", () => {
    products.forEach((product) => {
      expect(typeof product.price).toBe("number");
      expect(product.price).toBeGreaterThan(0);
    });
  });

  // 8. Test product ratings
  test("every product has a rating between 4.1 and 4.9", () => {
    products.forEach((product) => {
      expect(product.rating).toBeGreaterThanOrEqual(4.1);
      expect(product.rating).toBeLessThanOrEqual(4.9);
    });
  });

  // 9. Test product images
  test("every product has a valid image URL", () => {
    products.forEach((product) => {
      expect(product.image).toMatch(/^https:\/\//);
    });
  });

  // 10. Test product descriptions
  test("every product has a description", () => {
    products.forEach((product) => {
      expect(product.description).toBeTruthy();
      expect(product.description).toContain(product.name);
    });
  });

  // 11. Test featured property
  test("every product has a boolean featured property", () => {
    products.forEach((product) => {
      expect(typeof product.featured).toBe("boolean");
    });
  });

  // 12. Test Veg Noodles
  test("contains 10 Veg Noodles products", () => {
    const result = products.filter(
      (product) => product.category === "Veg Noodles"
    );

    expect(result).toHaveLength(10);
  });

  // 13. Test Non-Veg Noodles
  test("contains 10 Non-Veg Noodles products", () => {
    const result = products.filter(
      (product) => product.category === "Non-Veg Noodles"
    );

    expect(result).toHaveLength(10);
  });

  // 14. Test Veg Fried Rice
  test("contains 10 Veg Fried Rice products", () => {
    const result = products.filter(
      (product) => product.category === "Veg Fried Rice"
    );

    expect(result).toHaveLength(10);
  });

  // 15. Test Non-Veg Fried Rice
  test("contains 10 Non-Veg Fried Rice products", () => {
    const result = products.filter(
      (product) => product.category === "Non-Veg Fried Rice"
    );

    expect(result).toHaveLength(10);
  });

  // 16. Test Manchurian
  test("contains 10 Manchurian products", () => {
    const result = products.filter(
      (product) => product.category === "Manchurian"
    );

    expect(result).toHaveLength(10);
  });

  // 17. Test Cool Drinks
  test("contains 10 Cool Drinks products", () => {
    const result = products.filter(
      (product) => product.category === "Cool Drinks"
    );

    expect(result).toHaveLength(10);
  });

  // 18. Test getFoodImage function
  test("returns the correct image for Veg Noodles", () => {
    expect(getFoodImage("Veg Noodles"))
      .toBe(products[0].image);
  });

  // 19. Test fallback image
  test("returns Veg Noodles image for an unknown category", () => {
    expect(getFoodImage("Unknown Category"))
      .toBe(getFoodImage("Veg Noodles"));
  });

  // 20. Test featured products
  test("marks the first 8 products and products 21-24 as featured", () => {
    products.forEach((product, index) => {
      const expectedFeatured =
        index < 8 || (index >= 20 && index < 24);

      expect(product.featured).toBe(expectedFeatured);
    });
  });

});

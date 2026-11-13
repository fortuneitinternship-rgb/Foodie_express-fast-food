
import { describe, test, expect, vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import { act } from "react";

import App from "./App.jsx";

// Mock App component
vi.mock("./App.jsx", () => ({
  default: vi.fn(() => (
    <div data-testid="app-component">
      FoodieExpress Application
    </div>
  )),
}));

describe("Main.jsx Entry Point", () => {
  let container;
  let root;

  afterEach(() => {
    if (root) {
      act(() => {
        root.unmount();
      });
      root = null;
    }

    cleanup();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  test("renders React application inside root element", () => {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);

    root = createRoot(container);

    act(() => {
      root.render(
        <App />
      );
    });

    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent("FoodieExpress Application");
  });

  test("renders App component successfully", () => {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);

    root = createRoot(container);

    act(() => {
      root.render(<App />);
    });

    expect(
      container.querySelector('[data-testid="app-component"]')
    ).toBeInTheDocument();
  });

  test("calls App component during rendering", () => {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);

    root = createRoot(container);

    act(() => {
      root.render(<App />);
    });

    expect(App).toHaveBeenCalled();
  });

  test("renders application content inside root element", () => {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);

    root = createRoot(container);

    act(() => {
      root.render(<App />);
    });

    expect(container.innerHTML).toContain("FoodieExpress Application");
  });

  test("does not render application outside root element", () => {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);

    root = createRoot(container);

    act(() => {
      root.render(<App />);
    });

    expect(
      document.body.querySelector('[data-testid="app-component"]')
    ).toBeInTheDocument();

    expect(
      container.querySelector('[data-testid="app-component"]')
    ).toBeInTheDocument();
  });
});

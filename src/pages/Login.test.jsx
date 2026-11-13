
import { render, screen, fireEvent } from "@testing-library/react";
import {
  describe,
  test,
  expect,
  vi,
  beforeEach,
  afterEach,
} from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("FoodieExpress Login Component", () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  function renderLogin() {
    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  }

  // 1. Render Login component
  test("renders Login component successfully", () => {
    const { container } = renderLogin();

    expect(
      container.querySelector(".container")
    ).toBeInTheDocument();
  });

  // 2. Display Login heading
  test("displays Login heading", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: "Login" })
    ).toBeInTheDocument();
  });

  // 3. Display Email label
  test("displays Email label", () => {
    renderLogin();

    expect(
      screen.getByLabelText("Email")
    ).toBeInTheDocument();
  });

  // 4. Display Password label
  test("displays Password label", () => {
    renderLogin();

    expect(
      screen.getByLabelText("Password")
    ).toBeInTheDocument();
  });

  // 5. Email input has correct type
  test("email input has email type", () => {
    renderLogin();

    expect(
      screen.getByLabelText("Email")
    ).toHaveAttribute("type", "email");
  });

  // 6. Password input has correct type
  test("password input has password type", () => {
    renderLogin();

    expect(
      screen.getByLabelText("Password")
    ).toHaveAttribute("type", "password");
  });

  // 7. Email field is required
  test("email field is required", () => {
    renderLogin();

    expect(
      screen.getByLabelText("Email")
    ).toBeRequired();
  });

  // 8. Password field is required
  test("password field is required", () => {
    renderLogin();

    expect(
      screen.getByLabelText("Password")
    ).toBeRequired();
  });

  // 9. Email input accepts text
  test("allows users to enter email", () => {
    renderLogin();

    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    expect(emailInput).toHaveValue("test@example.com");
  });

  // 10. Password input accepts text
  test("allows users to enter password", () => {
    renderLogin();

    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    expect(passwordInput).toHaveValue("password123");
  });

  // 11. Display Login button
  test("displays Login button", () => {
    renderLogin();

    expect(
      screen.getByRole("button", { name: "Login" })
    ).toBeInTheDocument();
  });

  // 12. Login button belongs to the form
  test("Login button is inside the login form", () => {
    renderLogin();

    const loginButton = screen.getByRole("button", {
      name: "Login",
    });

    const loginForm = loginButton.closest("form");

    expect(loginForm).toBeInTheDocument();
    expect(loginForm).toContainElement(loginButton);
  });

  // 13. Submit login form and display alert
  test("displays alert when login form is submitted", () => {
    renderLogin();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Login" })
    );

    expect(alertSpy).toHaveBeenCalledTimes(1);

    expect(alertSpy).toHaveBeenCalledWith(
      "Login form UI works. Backend authentication is not connected."
    );
  });

  // 14. Display Create an account link
  test("displays Create an account link", () => {
    renderLogin();

    expect(
      screen.getByRole("link", { name: "Create an account" })
    ).toBeInTheDocument();
  });

  // 15. Register link has correct URL
  test("Create an account link navigates to Register page", () => {
    renderLogin();

    expect(
      screen.getByRole("link", { name: "Create an account" })
    ).toHaveAttribute("href", "/register");
  });
});

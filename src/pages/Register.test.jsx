
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";

describe("Register Component", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const renderRegister = () => {
    return render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  };

  test("renders Register component successfully", () => {
    renderRegister();

    expect(
      screen.getByRole("heading", { name: /create account/i })
    ).toBeInTheDocument();
  });

  test("displays Full Name label", () => {
    renderRegister();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });

  test("displays Email label", () => {
    renderRegister();

    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
  });

  test("displays Password label", () => {
    renderRegister();

    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  });

  test("Full Name input is required", () => {
    renderRegister();

    expect(screen.getByLabelText(/full name/i)).toBeRequired();
  });

  test("Email input is required", () => {
    renderRegister();

    expect(screen.getByLabelText(/^email$/i)).toBeRequired();
  });

  test("Password input is required", () => {
    renderRegister();

    expect(screen.getByLabelText(/^password$/i)).toBeRequired();
  });

  test("Email input has email type", () => {
    renderRegister();

    expect(screen.getByLabelText(/^email$/i)).toHaveAttribute(
      "type",
      "email"
    );
  });

  test("Password input has password type", () => {
    renderRegister();

    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("Password input has minimum length of 8", () => {
    renderRegister();

    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute(
      "minlength",
      "8"
    );
  });

  test("Full Name input accepts user input", () => {
    renderRegister();

    const nameInput = screen.getByLabelText(/full name/i);

    fireEvent.change(nameInput, {
      target: { value: "Shruthi Dunge" },
    });

    expect(nameInput).toHaveValue("Shruthi Dunge");
  });

  test("Email input accepts user input", () => {
    renderRegister();

    const emailInput = screen.getByLabelText(/^email$/i);

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    expect(emailInput).toHaveValue("test@example.com");
  });

  test("Password input accepts user input", () => {
    renderRegister();

    const passwordInput = screen.getByLabelText(/^password$/i);

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    expect(passwordInput).toHaveValue("password123");
  });

  test("displays Register button", () => {
    renderRegister();

    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("Register button is inside the form", () => {
    renderRegister();

    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });

    const registerForm = registerButton.closest("form");

    expect(registerForm).toBeInTheDocument();
    expect(registerForm).toContainElement(registerButton);
  });

  test("displays Already registered text", () => {
    renderRegister();

    expect(
      screen.getByText(/already registered/i)
    ).toBeInTheDocument();
  });

  test("Login link navigates to login page", () => {
    renderRegister();

    const loginLink = screen.getByRole("link", {
      name: /^login$/i,
    });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  test("shows alert when registration form is submitted", () => {
    renderRegister();

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^password$/i);

    fireEvent.change(nameInput, {
      target: { value: "Shruthi Dunge" },
    });

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    fireEvent.submit(nameInput.closest("form"));

    expect(window.alert).toHaveBeenCalledWith(
      "Registration UI works. Backend is not connected."
    );
  });
});

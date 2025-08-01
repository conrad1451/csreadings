// OldApp.test.tsx

import React from "react"; // CHQ: Gemini AI suggested this

import { it, expect, describe, beforeEach } from "vitest"; // CHQ: Gemini AI suggested before each
import { render, screen, fireEvent } from "@testing-library/react";
import OldApp from "../../src/components/OldApp";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom"; // Added MemoryRouter

describe("OldApp", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/orig"]}>
        {" "}
        {/* Render OldApp route directly */}
        <OldApp />
      </MemoryRouter>
    );
  });

  it("should render Vite + React heading", () => {
    expect(
      screen.getByRole("heading", { name: "Vite + React" })
    ).toBeInTheDocument();
  });

  it("should increment count when button is clicked", () => {
    const countButton = screen.getByRole("button", { name: /count is/i });
    expect(countButton).toHaveTextContent("count is 0");
    fireEvent.click(countButton);
    expect(countButton).toHaveTextContent("count is 1");
  });

  it("should render the read-the-docs paragraph", () => {
    expect(
      screen.getByText(/Click on the Vite and React logos to learn more/i)
    ).toBeInTheDocument();
  });
});

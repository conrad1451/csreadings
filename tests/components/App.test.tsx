import React from "react"; // CHQ: Gemini AI suggested this

import { it, expect, describe, beforeEach } from "vitest"; // CHQ: Gemini AI suggested before each
import { render, screen } from "@testing-library/react";
import App from "../../src/App";
import "@testing-library/jest-dom/vitest";

describe("NavigationButtons", () => {
  // Use beforeEach to render the App once before each test
  // This ensures a fresh render for each test, preventing interference
  beforeEach(() => {
    // clean up any previous renders to prevent tests from affecting each other
    render(<App />);
  });

  it("should render button for going to original page", () => {
    const button1 = screen.getByRole("button", { name: "Go to original page" }); // CHQ: format taken from Gemini AI
    expect(button1).toBeInTheDocument();
  });

  it("should render button for going to career content page", () => {
    const button2 = screen.getByRole("button", {
      name: "Go to career content page",
    }); // CHQ: format taken from Gemini AI
    expect(button2).toBeInTheDocument();
  });
});

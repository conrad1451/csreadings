// App.test.tsx

import React from "react"; // CHQ: Gemini AI suggested this

import { it, expect, describe, beforeEach } from "vitest"; // CHQ: Gemini AI suggested before each
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../src/App";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom"; // Added MemoryRouter

describe("NavigationButtons", () => {
  // Use beforeEach to render the App once before each test
  // This ensures a fresh render for each test, preventing interference
  beforeEach(() => {
    // We use MemoryRouter here to wrap the component being tested,
    // which allows us to simulate routing within the test environment
    // without needing a full browser environment.
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
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

  // New tests for navigation
  it("should navigate to '/orig' when 'Go to original page' button is clicked", async () => {
    const navigateButton = screen.getByRole("button", {
      name: "Go to original page",
    });
    fireEvent.click(navigateButton);

    // Assert that the content of the OldApp component is rendered
    expect(await screen.findByText(/Vite \+ React/i)).toBeInTheDocument();
  });

  it("should navigate to '/compscilearning' when 'Go to career content page' button is clicked", async () => {
    const navigateButton = screen.getByRole("button", {
      name: "Go to career content page",
    });
    fireEvent.click(navigateButton);

    // Assert that the CSNotionPages2 component is rendered.
    // You might need to adjust this assertion based on what text or element
    // is uniquely present in your CSNotionPages2 component.
    // For now, I'm using a generic text that might appear if the component renders.
    // If CSNotionPages2 fetches data, you might need to mock that fetch.
    expect(
      await screen.findByText(/CSNotionPages2 content/i)
    ).toBeInTheDocument(); // Replace with actual text
  });
});

// CSNotionPages2.test.tsx

import React from "react"; // CHQ: Gemini AI suggested this

import { it, expect, describe, afterEach } from "vitest"; // CHQ: Gemini AI suggested before each
import { render, cleanup } from "@testing-library/react";
import App from "../../src/App";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom"; // Added MemoryRouter

describe("App snapshot", () => {
  afterEach(() => {
    cleanup(); // Clean up after each snapshot test
  });

  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

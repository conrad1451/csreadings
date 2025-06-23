// CustomTable.test.tsx:

import { it, expect, describe, afterEach, vi } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

// Import the component to be tested
import CustomTable from "../src/MyTable2";

// Add the Item interface from your original component
interface Item {
  value: string;
}

// Define the interface for the props that BasicDownshift expects
interface BasicDownshiftProps {
  items: Item[];
  labelText: string;
  handlethechange: (selection: Item | null) => void;
}

// Interface for Page data, as defined in your MyTable.tsx
interface Page {
  id: string;
  Name: string;
  CreatedTime: Date;
  EditedTime: Date;
  CreatedStart: Date;
  CreatedEnd: Date;
  PublishedStart: Date;
  PublishedEnd: Date;
  Area: string;
  Source: string;
  Link: string;
  Type: string;
  Tags: string[];
  PageURL: string;
  pageContent: string; // Add pageContent as it's in your RowPage interface
}
// Mock the BasicDownshift component
// This mock simulates a basic HTML <select> element for testing purposes.
vi.mock("./BasicDropdownList", () => ({
  default: vi.fn((props: BasicDownshiftProps) => {
    const { items, labelText, handlethechange } = props;
    return (
      <div data-testid={`mock-downshift-${labelText}`}>
        <label htmlFor={`mock-downshift-select-${labelText}`}>
          {labelText}
        </label>
        <select
          data-testid={`mock-downshift-select-${labelText}`} // Crucial for locating in tests
          onChange={(e) => {
            // Simulate selecting an item. For multi-select, this mock is simplified
            // and assumes single selection via the select element.
            handlethechange(e.target.value ? { value: e.target.value } : null);
          }}
        >
          <option value="">(None)</option> {/* Option to clear selection */}
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>
      </div>
    );
  }),
}));

// CHQ: Gemini AI created mock data and filled out missing parts to test file
// --- Mock Data ---
// Creating a diverse set of mock pages to test various filters and sorts
const mockPages: Page[] = [
  {
    id: "1",
    Name: "Frontend Engineer",
    CreatedTime: new Date("2023-01-15T10:00:00Z"),
    EditedTime: new Date("2023-01-16T11:00:00Z"),
    CreatedStart: new Date("2023-01-10T09:00:00Z"),
    CreatedEnd: new Date("2023-01-15T17:00:00Z"),
    PublishedStart: new Date("2023-02-01T08:00:00Z"),
    PublishedEnd: new Date("2023-03-01T08:00:00Z"),
    Area: "Engineering",
    Source: "LinkedIn",
    Link: "https://example.com/fe",
    Type: "Job Posting",
    Tags: ["React", "JavaScript", "UI/UX"],
    PageURL: "https://careers.example.com/frontend",
    pageContent: "Details about frontend role.",
  },
  {
    id: "2",
    Name: "Backend Developer",
    CreatedTime: new Date("2023-01-20T10:00:00Z"),
    EditedTime: new Date("2023-01-21T11:00:00Z"),
    CreatedStart: new Date("2023-01-18T09:00:00Z"),
    CreatedEnd: new Date("2023-01-20T17:00:00Z"),
    PublishedStart: new Date("2023-02-05T08:00:00Z"),
    PublishedEnd: new Date("2023-03-05T08:00:00Z"),
    Area: "Engineering",
    Source: "Indeed",
    Link: "https://example.com/be",
    Type: "Job Posting",
    Tags: ["Node.js", "Python", "APIs"],
    PageURL: "https://careers.example.com/backend",
    pageContent: "Details about backend role.",
  },
  {
    id: "3",
    Name: "Data Scientist",
    CreatedTime: new Date("2023-02-01T10:00:00Z"),
    EditedTime: new Date("2023-02-02T11:00:00Z"),
    CreatedStart: new Date("2023-01-28T09:00:00Z"),
    CreatedEnd: new Date("2023-02-01T17:00:00Z"),
    PublishedStart: new Date("2023-02-10T08:00:00Z"),
    PublishedEnd: new Date("2023-03-10T08:00:00Z"),
    Area: "Data",
    Source: "Glassdoor",
    Link: "https://example.com/ds",
    Type: "Job Posting",
    Tags: ["Machine Learning", "Statistics", "R"],
    PageURL: "https://careers.example.com/datascience",
    pageContent: "Details about data scientist role.",
  },
  {
    id: "4",
    Name: "QA Engineer",
    CreatedTime: new Date("2023-01-10T10:00:00Z"),
    EditedTime: new Date("2023-01-11T11:00:00Z"),
    CreatedStart: new Date("2023-01-05T09:00:00Z"),
    CreatedEnd: new Date("2023-01-10T17:00:00Z"),
    PublishedStart: new Date("2023-01-25T08:00:00Z"),
    PublishedEnd: new Date("2023-02-25T08:00:00Z"),
    Area: "Quality Assurance",
    Source: "Company Website",
    Link: "https://example.com/qa",
    Type: "Job Posting",
    Tags: ["Testing", "Automation", "Manual"],
    PageURL: "https://careers.example.com/qa",
    pageContent: "Details about QA role.",
  },
];

describe("CustomTable - Name Column Sorting", () => {
  afterEach(() => {
    cleanup();
  });

  // Test 1: Initial state - No sorting applied
  it("should display names in their initial order by default", () => {
    render(<CustomTable thePages={mockPages} />);

    // Get all rows (skipping the header row) and extract the Name cell content
    const rows = screen.getAllByRole("row").slice(1);
    const namesInTable = rows.map(
      (row) => within(row).getAllByRole("cell")[0].textContent
    );

    // Assert that the order matches the original mockPages order
    expect(namesInTable).toEqual(mockPages.map((page) => page.Name));
  });

  // Test 2: Sorting by Name in ascending order
  it("should sort table data by Name in ascending order when ascending button is clicked", async () => {
    const user = userEvent.setup();
    render(<CustomTable thePages={mockPages} />);

    const nameHeader = screen.getByRole("columnheader", { name: /name/i });
    const ascendButton = within(nameHeader).getByRole("button", {
      name: "⬆️", // Updated to use the visible emoji content as the accessible name
    });

    await user.click(ascendButton);

    const rows = screen.getAllByRole("row").slice(1);
    const sortedNamesAsc = rows.map(
      (row) => within(row).getAllByRole("cell")[0].textContent
    );

    // Expected ascending order: Backend Developer, Data Scientist, Frontend Engineer, QA Engineer
    // Based on alphabetical sort of the mockPages Names
    expect(sortedNamesAsc).toEqual(
      [
        "Backend Developer",
        "Data Scientist",
        "Frontend Engineer",
        "QA Engineer",
      ].sort()
    ); // Use sort() to confirm alphabetical order

    // Re-evaluating the expected sorted order from your mock data
    // The initial mockPages order is:
    // 1. Frontend Engineer
    // 2. Backend Developer
    // 3. Data Scientist
    // 4. QA Engineer
    // Alphabetical Ascending: Backend Developer, Data Scientist, Frontend Engineer, QA Engineer
    expect(sortedNamesAsc).toEqual([
      "Backend Developer",
      "Data Scientist",
      "Frontend Engineer",
      "QA Engineer",
    ]);
  });

  // Test 3: Sorting by Name in descending order
  it("should sort table data by Name in descending order when descending button is clicked", async () => {
    const user = userEvent.setup();
    render(<CustomTable thePages={mockPages} />);

    const nameHeader = screen.getByRole("columnheader", { name: /name/i });
    const descendButton = within(nameHeader).getByRole("button", {
      name: "⬇️", // Updated to use the visible emoji content as the accessible name
    });

    await user.click(descendButton);

    const rows = screen.getAllByRole("row").slice(1);
    const sortedNamesDesc = rows.map(
      (row) => within(row).getAllByRole("cell")[0].textContent
    );

    // Expected descending order: QA Engineer, Frontend Engineer, Data Scientist, Backend Developer
    expect(sortedNamesDesc).toEqual([
      "QA Engineer",
      "Frontend Engineer",
      "Data Scientist",
      "Backend Developer",
    ]);
  });

  // Test 4: Resetting the Name sort
  it("should reset Name sorting to initial order when reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<CustomTable thePages={mockPages} />);

    const nameHeader = screen.getByRole("columnheader", { name: /name/i });
    const ascendButton = within(nameHeader).getByRole("button", {
      name: "⬆️", // Updated to use the visible emoji content as the accessible name
    });

    // We need to find the reset button. It only becomes visible when a sort is applied.
    // So, first click an ascend/descend button.
    await user.click(ascendButton);

    const resetButton = within(nameHeader).getByRole("button", {
      name: "🔄", // Updated to use the visible emoji content as the accessible name
    });

    // Then, reset the sort
    await user.click(resetButton);
    const rows = screen.getAllByRole("row").slice(1);
    const resetNames = rows.map(
      (row) => within(row).getAllByRole("cell")[0].textContent
    );

    // After reset, it should revert to the original mockPages order
    expect(resetNames).toEqual(mockPages.map((page) => page.Name));
  });

  // Test 5: Re-sorting after a reset
  it("should be able to sort again after resetting the Name sort", async () => {
    const user = userEvent.setup();
    render(<CustomTable thePages={mockPages} />);

    const nameHeader = screen.getByRole("columnheader", { name: /name/i });
    const ascendButton = within(nameHeader).getByRole("button", {
      name: "⬆️", // Updated to use the visible emoji content as the accessible name
    });
    const descendButton = within(nameHeader).getByRole("button", {
      name: "⬇️", // Updated to use the visible emoji content as the accessible name
    });

    // Sort ascending, then reset
    await user.click(ascendButton);
    const resetButton = within(nameHeader).getByRole("button", {
      name: "🔄", // Ensure the reset button is visible before trying to click it
    });
    await user.click(resetButton);

    // Now, try sorting descending again
    await user.click(descendButton);
    const rows = screen.getAllByRole("row").slice(1);
    const sortedNamesDescAfterReset = rows.map(
      (row) => within(row).getAllByRole("cell")[0].textContent
    );

    expect(sortedNamesDescAfterReset).toEqual([
      "QA Engineer",
      "Frontend Engineer",
      "Data Scientist",
      "Backend Developer",
    ]);
  });
});

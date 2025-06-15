// --- tests/utils/createCustomTableData.test.ts ---
// import { createCustomTableData } from "./MyTable";

// import { createCustomTableData } from "../../src/MyTable2";

import { it, expect, describe } from "vitest";

// import { it, expect, describe, afterEach, vi } from "vitest";
// // Add the Item interface from your original component
// interface Item {
//   value: string;
// }

// // Define the interface for the props that BasicDownshift expects
// interface BasicDownshiftProps {
//   items: Item[];
//   labelText: string;
//   handlethechange: (selection: Item | null) => void;
// }
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
  pageContent: string;
}

interface RowPage {
  myID: string;
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
  pageContent: string;
}
import { createCustomTableData } from "../../src/customDataTable";

// --- Mock Data ---
// Creating a diverse set of mock pages to test various filters and sorts

// CHQ: Gemini AI made this function
/**
 * Generates a random date within a specified range.
 * @returns A Date object.
 */
function getRandomDate(): Date {
  const start = new Date(2023, 0, 1); // Jan 1, 2023
  const end = new Date(2025, 11, 31); // Dec 31, 2025
  const randomTimestamp =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTimestamp);
}

// CHQ: Gemini AI made this function
/**
 * Generates a random string of a given length.
 * @param length The length of the string.
 * @returns A random string.
 */
function getRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// CHQ: Gemini AI made this function
/**
 * Generates a random Page object with the 'Area' property set to "CS".
 * @param id The ID for the new page.
 * @returns A randomly generated Page object.
 */
function generateRandomCSPage(id: string): Page {
  return {
    id: id,
    Name: `Random CS Project ${getRandomString(5)}`,
    CreatedTime: getRandomDate(),
    EditedTime: getRandomDate(),
    CreatedStart: getRandomDate(),
    CreatedEnd: getRandomDate(),
    PublishedStart: getRandomDate(),
    PublishedEnd: getRandomDate(),
    Area: "CS", // Explicitly set to "CS" as requested
    Source: `Source ${getRandomString(3)}`,
    Link: `https://example.com/cs-link-${getRandomString(7)}`,
    Type: Math.random() > 0.5 ? "Article" : "Tutorial",
    Tags: [
      "CS",
      Math.random() > 0.5 ? "Algorithms" : "Data Structures",
      Math.random() > 0.5 ? "Web Dev" : "AI/ML",
      getRandomString(4),
    ],
    PageURL: `https://notion.so/cs-page-${getRandomString(8)}`,
    pageContent: `Randomly generated content for CS project ${getRandomString(100)}.`,
  };
}

const mockPages: Page[] = [
  {
    id: "0",
    Name: "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
    CreatedTime: new Date("2024-01-10T10:00:00Z"),
    EditedTime: new Date("2024-01-05T09:00:00Z"),
    CreatedStart: new Date("2024-02-01T23:59:59Z"),
    CreatedEnd: new Date("2024-01-15T11:00:00Z"),
    PublishedStart: new Date("2024-03-01T00:00:00Z"),
    PublishedEnd: new Date("2024-03-01T00:00:00Z"),
    Area: "CS",
    Source: "Reddit",
    Link: "https://reddit.com",
    Type: "Article",
    Tags: ["React", "TypeScript", "Frontend"],
    PageURL: "https://notion.so/fe1",
    pageContent: "",
  },
  {
    id: "1",
    Name: "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
    CreatedTime: new Date("2024-01-10T10:00:00Z"),
    EditedTime: new Date("2024-01-05T09:00:00Z"),
    CreatedStart: new Date("2024-02-01T23:59:59Z"),
    CreatedEnd: new Date("2024-01-15T11:00:00Z"),
    PublishedStart: new Date("2024-03-01T00:00:00Z"),
    PublishedEnd: new Date("2024-03-01T00:00:00Z"),
    Area: "CS",
    Source: "Reddit",
    Link: "https://reddit.com",
    Type: "Article",
    Tags: ["React", "TypeScript", "Frontend"],
    PageURL: "https://notion.so/fe1",
    pageContent: "",
  },
  // Replaced with randomly generated data in the new order
  generateRandomCSPage("2"),
  generateRandomCSPage("3"),
];

describe("createCustomTableData", () => {
  it("should correctly pick the last tag from a page with multiple tags", () => {
    const targetPage = mockPages[1];

    const rowPage: RowPage = createCustomTableData(
      targetPage.id,
      targetPage.Name,
      targetPage.CreatedTime,
      targetPage.EditedTime,
      targetPage.CreatedStart,
      targetPage.CreatedEnd,
      targetPage.PublishedStart,
      targetPage.PublishedEnd,
      targetPage.Area,
      targetPage.Source,
      targetPage.Link,
      targetPage.Type,
      targetPage.Tags,
      targetPage.PageURL,
      targetPage.pageContent
    );
    expect(rowPage.Tags[0]).toBe("React");
  });

  // ... more test cases
});

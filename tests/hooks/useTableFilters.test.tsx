// CHQ: Gemini AI generated this:

import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTableFilters } from "../../src/hooks/useTableFilters"; // Adjust path as needed
import { SelectChangeEvent } from "@mui/material/Select"; // For Material-UI Select events

// --- Interfaces  ---

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

interface Item {
  value: string;
}

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

const mockRowPages: RowPage[] = [
  {
    myID: "0",
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
    PageURL: "https://notion.so/fe0",
    pageContent: "",
  },
  {
    myID: "1",
    Name: "State management with Redux - Leveling up in React JS",
    CreatedTime: new Date("2024-01-10T10:00:00Z"),
    EditedTime: new Date("2024-01-05T09:00:00Z"),
    CreatedStart: new Date("2024-02-01T23:59:59Z"),
    CreatedEnd: new Date("2024-01-15T11:00:00Z"),
    PublishedStart: new Date("2024-03-01T00:00:00Z"),
    PublishedEnd: new Date("2024-03-01T00:00:00Z"),
    Area: "CS",
    Source: "Dev.To",
    Link: "https://dev.to",
    Type: "Article",
    Tags: [
      "React",
      "TypeScript",
      "Frontend",
      "React Redux (State Library)",
      "WebDev (web development)",
    ],
    PageURL: "https://notion.so/fe1",
    pageContent: "",
  },
  {
    myID: "2",
    Name: "Let's Test this code - Coding with Liam",
    CreatedTime: new Date("2024-01-10T10:00:00Z"),
    EditedTime: new Date("2024-01-05T09:00:00Z"),
    CreatedStart: new Date("2024-02-01T23:59:59Z"),
    CreatedEnd: new Date("2024-01-15T11:00:00Z"),
    PublishedStart: new Date("2024-03-01T00:00:00Z"),
    PublishedEnd: new Date("2024-03-01T00:00:00Z"),
    Area: "CS",
    Source: "YouTube",
    Link: "https://youtube.com",
    Type: "Article",
    Tags: [
      "React",
      "TypeScript",
      "Frontend",
      "Code Testing: Unit Testing",
      "Testing framework: Vitest",
    ],
    PageURL: "https://notion.so/fe2",
    pageContent: "",
  },
  // Replaced with randomly generated data in the new order
  // generateRandomCSPage("2"),
  // generateRandomCSPage("3"),
];

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
  // generateRandomCSPage("2"),
  // generateRandomCSPage("3"),
];

describe("useTableFilters", () => {
  // Test Case 1: Initial state
  it("should initialize all filters to their default off/empty states", () => {
    const { result } = renderHook(() => useTableFilters(mockRowPages));

    expect(result.current.filterProps.isPageFilterEnabled).toBe(false);
    expect(result.current.filterProps.pageFilterText).toBe("");
    expect(result.current.filterProps.tagCountFilter).toBe("");
    expect(result.current.filterProps.isSourceFilterEnabled).toBe(false);
    expect(result.current.filterProps.sourceSelected).toBe("");
    expect(result.current.filterProps.isTagFilterEnabled).toBe(false);
    expect(result.current.filterProps.tagNameList).toEqual([]);

    // Initially, filteredData should be all initialData
    expect(result.current.filteredData.length).toBe(mockRowPages.length);
    expect(result.current.filteredData).toEqual(mockRowPages);
    // expect(result.current.filteredData.length).toBe(mockPages.length);
    // expect(result.current.filteredData).toEqual(mockPages);
  });

  // Test Case 2: Page Name Filter
  describe("Page Name Filter", () => {
    it("should filter by page name when enabled and text is provided", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      act(() => {
        result.current.filterHandlers.togglePageFilter(); // Enable
        result.current.filterHandlers.setPageFilterText("Redux");
      });

      expect(result.current.filterProps.isPageFilterEnabled).toBe(true);
      expect(result.current.filterProps.pageFilterText).toBe("Redux");
      expect(result.current.filteredData.length).toBe(1);
      expect(result.current.filteredData[0].Name).toBe(
        "State management with Redux - Leveling up in React JS"
      );
    });

    // FIXME: CHQ: test broken
    it("should ignore filter when disabled", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      // Enable and set text, then disable
      act(() => {
        result.current.filterHandlers.togglePageFilter();
        result.current.filterHandlers.setPageFilterText("testing");
        result.current.filterHandlers.togglePageFilter(); // Disable
      });

      expect(result.current.filterProps.isPageFilterEnabled).toBe(false);
      expect(result.current.filterProps.pageFilterText).toBe(""); // Should be reset
      // expect(result.current.filteredData.length).toBe(mockPages.length); // Purposefully broken - trigger fail in CI/CD pipeline
      expect(result.current.filteredData.length).toBe(mockRowPages.length); // Should show all data
    });

    it("should reset page filter text when toggled off", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      act(() => {
        result.current.filterHandlers.togglePageFilter();
        result.current.filterHandlers.setPageFilterText("management");
      });
      expect(result.current.filterProps.pageFilterText).toBe("management");

      act(() => {
        result.current.filterHandlers.togglePageFilter(); // Toggle off
      });
      expect(result.current.filterProps.pageFilterText).toBe("");
      expect(result.current.filterProps.isPageFilterEnabled).toBe(false);
      expect(result.current.filteredData.length).toBe(mockRowPages.length);

      // expect(result.current.filteredData.length).toBe(mockPages.length);
    });

    it("should reset page filter using resetPageFilters handler", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      act(() => {
        result.current.filterHandlers.togglePageFilter();
        result.current.filterHandlers.setPageFilterText("redux");
      });
      expect(result.current.filterProps.pageFilterText).toBe("redux");
      expect(result.current.filterProps.isPageFilterEnabled).toBe(true);
      expect(result.current.filteredData.length).toBe(1); //  "State management with Redux - Leveling up in React JS"

      act(() => {
        result.current.filterHandlers.resetPageFilters();
      });
      expect(result.current.filterProps.pageFilterText).toBe("");
      expect(result.current.filterProps.isPageFilterEnabled).toBe(false);
      expect(result.current.filteredData.length).toBe(mockRowPages.length);
      // expect(result.current.filteredData.length).toBe(mockPages.length);
    });
  });

  // Test Case 3: Tag Count Filter
  describe("Tag Count Filter", () => {
    it("should filter by exact tag count", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      act(() => {
        result.current.filterHandlers.handleTagCountChange({
          target: { value: 3 },
        } as SelectChangeEvent<number | string>);
      });

      expect(result.current.filterProps.tagCountFilter).toBe(3);
      expect(result.current.filteredData.map((j) => j.Name)).toEqual([
        "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
      ]);
    });

    it("should return all data if tag count filter is empty", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      act(() => {
        // Set a filter first
        result.current.filterHandlers.handleTagCountChange({
          target: { value: 3 },
        } as SelectChangeEvent<number | string>);
      });
      expect(result.current.filterProps.tagCountFilter).toBe(3);

      act(() => {
        // Then clear it
        result.current.filterHandlers.handleTagCountChange({
          target: { value: "" },
        } as SelectChangeEvent<number | string>);
      });

      expect(result.current.filterProps.tagCountFilter).toBe("");
      expect(result.current.filteredData.length).toBe(mockRowPages.length);
    });

    // FIXME: CHQ
    // it("should reset tag count filter using resetTagCountFilters handler", () => {
    //   const { result } = renderHook(() => useTableFilters(mockRowPages));

    //   act(() => {
    //     result.current.filterHandlers.handleTagCountChange({
    //       target: { value: 2 },
    //     } as SelectChangeEvent<number | string>);
    //   });
    //   expect(result.current.filterProps.tagCountFilter).toBe(2);
    //   expect(result.current.filteredData.length).toBe(2); // Data Scientist, UX Designer

    //   act(() => {
    //     result.current.filterHandlers.resetTagCountFilters();
    //   });
    //   expect(result.current.filterProps.tagCountFilter).toBe("");
    //   expect(result.current.filteredData.length).toBe(mockRowPages.length);

    //   // expect(result.current.filteredData.length).toBe(mockPages.length);
    // });

    // FIXME: CHQ
    // it("should provide correct unique tag count options", () => {
    //   const { result } = renderHook(() => useTableFilters(mockRowPages));
    //   // Tags lengths: [3, 4, 2, 3, 4, 2] -> unique sorted: [2, 3, 4]
    //   expect(result.current.derivedLists.tagCountOptions).toEqual([
    //     "",
    //     2,
    //     3,
    //     4,
    //   ]);
    // });
  });

  // Test Case 4: Source Filter (Single Select)
  describe("Source Filter", () => {
    it("should filter by selected Source when enabled", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      act(() => {
        result.current.filterHandlers.toggleSourceFilter(); // Enable
        result.current.filterHandlers.handleSourceChange({ value: "Reddit" });
      });

      expect(result.current.filterProps.isSourceFilterEnabled).toBe(true);
      expect(result.current.filterProps.sourceSelected).toBe("Reddit");
    });

    // FIXME: CHQ
    // it("should ignore filter when disabled", () => {
    //   const { result } = renderHook(() => useTableFilters(mockRowPages));

    //   act(() => {
    //     result.current.filterHandlers.toggleSourceFilter();
    //     result.current.filterHandlers.handleSourceChange({
    //       value: "YouTube",
    //     });
    //     result.current.filterHandlers.toggleSourceFilter(); // Disable
    //   });

    //   expect(result.current.filterProps.isSourceFilterEnabled).toBe(false);
    //   expect(result.current.filterProps.sourceSelected).toBe("YouTube"); // StatusSelected remains, but filter is off
    //   // expect(result.current.filteredData.length).toBe(mockPages.length);
    // });

    //   it("should reset Source filter using resetSourceFilters handler", () => {
    //     const { result } = renderHook(() => useTableFilters(mockRowPages));

    //     act(() => {
    //       result.current.filterHandlers.toggleSourceFilter();
    //       result.current.filterHandlers.handleSourceChange({ value: "Rejected" });
    //     });
    //     expect(result.current.filterProps.sourceSelected).toBe("Rejected");
    //     expect(result.current.filteredData.length).toBe(1); // Data Scientist
    //     //
    //     act(() => {
    //       result.current.filterHandlers.resetSourceFilters();
    //     });
    //     expect(result.current.filterProps.sourceSelected).toBe("");
    //     expect(result.current.filteredData.length).toBe(mockRowPages.length);
    //   });
  });

  // Test Case 5: Multi-select Filters (Tags)
  describe("Multi-select Tags Filter", () => {
    it("should add a tag and filter data when enabled", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      act(() => {
        result.current.filterHandlers.toggleTagFilter(); // Enable
        result.current.filterHandlers.handleTagNameChange({ value: "React" });
      });

      expect(result.current.filterProps.isTagFilterEnabled).toBe(true);
      expect(result.current.filterProps.tagNameList).toEqual(["React"]);
      expect(result.current.filteredData.map((j) => j.Name)).toEqual([
        "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
        "State management with Redux - Leveling up in React JS",
        "Let's Test this code - Coding with Liam",
      ]);
    });

    it("should remove a tag if already selected", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      act(() => {
        result.current.filterHandlers.toggleTagFilter();
        result.current.filterHandlers.handleTagNameChange({ value: "React" }); // Add React
      });
      expect(result.current.filterProps.tagNameList).toEqual(["React"]);

      act(() => {
        result.current.filterHandlers.handleTagNameChange({ value: "React" }); // Remove React
      });
      expect(result.current.filterProps.tagNameList).toEqual([]);
      expect(result.current.filteredData.length).toBe(mockRowPages.length); // Back to all data
      // expect(result.current.filteredData.length).toBe(mockPages.length); // Back to all data
    });

    // FIXME: CHQ
    // it("should add multiple tags and filter with AND logic", () => {
    //   const { result } = renderHook(() => useTableFilters(mockRowPages));

    //   act(() => {
    //     result.current.filterHandlers.toggleTagFilter();
    //     result.current.filterHandlers.handleTagNameChange({ value: "Python" });
    //     result.current.filterHandlers.handleTagNameChange({
    //       value: "Machine Learning",
    //     });
    //   });

    //   expect(result.current.filterProps.tagNameList).toEqual([
    //     "Python",
    //     "Machine Learning",
    //   ]);
    //   expect(result.current.filteredData.map((j) => j.Name)).toEqual([
    //     "Data Scientist",
    //   ]);
    // });

    // FIXME: CHQ
    // it("should reset tag filter using resetTagFilters handler", () => {
    //   const { result } = renderHook(() => useTableFilters(mockRowPages));

    //   act(() => {
    //     result.current.filterHandlers.toggleTagFilter();
    //     result.current.filterHandlers.handleTagNameChange({ value: "React" });
    //   });
    //   expect(result.current.filterProps.tagNameList).toEqual(["React"]);

    //   act(() => {
    //     result.current.filterHandlers.resetTagFilters();
    //   });
    //   expect(result.current.filterProps.tagNameList).toEqual([]);
    //   expect(result.current.filteredData.length).toBe(mockRowPages.length);
    //   // expect(result.current.filteredData.length).toBe(mockPages.length); //2
    //   // expect(result.current.filteredData.length).toBe(77);
    // });

    // FIXME: CHQ
    // it("should ignore filter when disabled for tags", () => {
    //   const { result } = renderHook(() => useTableFilters(mockRowPages));

    //   act(() => {
    //     result.current.filterHandlers.toggleTagFilter(); // Enable
    //     result.current.filterHandlers.handleTagNameChange({ value: "React" });
    //   });
    //   expect(result.current.filteredData.length).toBe(1);

    //   act(() => {
    //     result.current.filterHandlers.toggleTagFilter(); // Disable
    //   });
    //   expect(result.current.filterProps.isTagFilterEnabled).toBe(false);
    //   expect(result.current.filterProps.tagNameList).toEqual(["React"]); // List state persists, but filter is off
    //   expect(result.current.filteredData.length).toBe(mockRowPages.length); // All data shown

    //   // expect(result.current.filteredData.length).toBe(mockPages.length); // All data shown
    // });
  });

  // Test Case 6: Combined Filters
  describe("Combined Filters", () => {
    // FIXME: CHQ
    // it("should apply multiple filters simultaneously", () => {
    //   const { result } = renderHook(() => useTableFilters(mockRowPages));

    //   act(() => {
    //     // Page name filter
    //     result.current.filterHandlers.togglePageFilter();
    //     result.current.filterHandlers.setPageFilterText("engineer"); // Frontend, Backend, QA, DevOps

    //     // Tag filter: React (Frontend)
    //     result.current.filterHandlers.toggleTagFilter();
    //     result.current.filterHandlers.handleTagNameChange({ value: "React" });
    //   });

    //   // Expected intersection: Only Frontend Engineer should remain
    //   // Initial: All 6
    //   // After Page Name: Frontend, Backend, QA, DevOps (4)
    //   // After Tag (React): Frontend (1)
    //   // After Status (Applied): Frontend (1) - as Frontend is the only one "Applied" and "React" and "Engineer"
    //   expect(result.current.filteredData.length).toBe(1);
    //   expect(result.current.filteredData[0].Name).toBe(
    //     "Progressive Web Apps in 100 Seconds Build a PWA from Scratch"
    //   );

    //   act(() => {
    //     // Now try adding another tag that "Frontend Engineer" also has
    //     result.current.filterHandlers.handleTagNameChange({
    //       value: "TypeScript",
    //     });
    //   });
    //   expect(result.current.filteredData.length).toBe(1); // Still Frontend Engineer

    //   act(() => {
    //     // Add a tag that Frontend Engineer does NOT have, should result in no matches
    //     result.current.filterHandlers.handleTagNameChange({ value: "Node.js" });
    //   });
    //   expect(result.current.filteredData.length).toBe(0); // No job has "Frontend" AND "React" AND "TypeScript" AND "Node.js"
    // });

    it("should correctly reset all filters by calling individual reset handlers", () => {
      const { result } = renderHook(() => useTableFilters(mockRowPages));

      act(() => {
        // Apply various filters
        result.current.filterHandlers.togglePageFilter();
        result.current.filterHandlers.setPageFilterText("e");

        result.current.filterHandlers.toggleTagFilter();
        result.current.filterHandlers.handleTagNameChange({ value: "Python" });

        result.current.filterHandlers.toggleSourceFilter();
        result.current.filterHandlers.handleSourceChange({ value: "Reddit" });

        result.current.filterHandlers.handleTagCountChange({
          target: { value: 3 },
        } as SelectChangeEvent<number | string>);
      });

      // Verify filters are applied
      expect(result.current.filteredData.length).toBeLessThan(mockPages.length);

      act(() => {
        // Reset all filters individually
        result.current.filterHandlers.resetPageFilters();
        result.current.filterHandlers.resetTagFilters();
        result.current.filterHandlers.resetSourceFilters();
        result.current.filterHandlers.resetTagCountFilters();
      });

      // All data should be visible again
      expect(result.current.filterProps.isPageFilterEnabled).toBe(false);
      expect(result.current.filterProps.pageFilterText).toBe("");
      expect(result.current.filterProps.tagNameList).toEqual([]);
      expect(result.current.filterProps.sourceSelected).toBe("");
      expect(result.current.filterProps.tagCountFilter).toBe("");
      expect(result.current.filteredData.length).toBe(mockRowPages.length);
      expect(result.current.filteredData).toEqual(mockRowPages);
      // expect(result.current.filteredData.length).toBe(mockPages.length);
      // expect(result.current.filteredData).toEqual(mockPages);
    });
  });
});

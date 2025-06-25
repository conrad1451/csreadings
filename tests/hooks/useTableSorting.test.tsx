// CHQ: Gemini AI generated this:

import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTableSorting } from "../../src/hooks/useTableSorting"; // Adjust path as needed

// --- Interfaces  ---

import { RowPage } from "../../src/utils/dataTransforms";

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
    Tags: [
      "React",
      "TypeScript",
      "Frontend",
      "(YouTube) Fireship - 100 Seconds",
    ],
    PageURL: "https://notion.so/fe0",
    // pageContent: "",
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
    // pageContent: "",
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
    // pageContent: "",
  },
  {
    myID: "3",
    Name: "Is there a good service for getting your resume reviewed by someone that does tech hiring?",
    CreatedTime: new Date("2024-01-10T10:00:00Z"),
    EditedTime: new Date("2024-01-05T09:00:00Z"),
    CreatedStart: new Date("2024-02-01T23:59:59Z"),
    CreatedEnd: new Date("2024-01-15T11:00:00Z"),
    PublishedStart: new Date("2024-03-01T00:00:00Z"),
    PublishedEnd: new Date("2024-03-01T00:00:00Z"),
    Area: "Career",
    Source: "YouTube",
    Link: "https://youtube.com",
    Type: "Article",
    Tags: [
      "Computer Science (CS)",
      "software engineer (SWE)(dev)",
      "source to ask for help",
      "Career Services: resume review",
      "resume",
    ],
    PageURL: "https://notion.so/fe2",
    // pageContent: "",
  },
  // Replaced with randomly generated data in the new order
  // generateRandomCSPage("2"),
  // generateRandomCSPage("3"),
];

// const mockPages: Page[] = [
//   {
//     id: "0",
//     Name: "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
//     CreatedTime: new Date("2024-01-10T10:00:00Z"),
//     EditedTime: new Date("2024-01-05T09:00:00Z"),
//     CreatedStart: new Date("2024-02-01T23:59:59Z"),
//     CreatedEnd: new Date("2024-01-15T11:00:00Z"),
//     PublishedStart: new Date("2024-03-01T00:00:00Z"),
//     PublishedEnd: new Date("2024-03-01T00:00:00Z"),
//     Area: "CS",
//     Source: "Reddit",
//     Link: "https://reddit.com",
//     Type: "Article",
//     Tags: ["React", "TypeScript", "Frontend"],
//     PageURL: "https://notion.so/fe1",
//     // pageContent: "",
//   },
//   {
//     id: "1",
//     Name: "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
//     CreatedTime: new Date("2024-01-10T10:00:00Z"),
//     EditedTime: new Date("2024-01-05T09:00:00Z"),
//     CreatedStart: new Date("2024-02-01T23:59:59Z"),
//     CreatedEnd: new Date("2024-01-15T11:00:00Z"),
//     PublishedStart: new Date("2024-03-01T00:00:00Z"),
//     PublishedEnd: new Date("2024-03-01T00:00:00Z"),
//     Area: "CS",
//     Source: "Reddit",
//     Link: "https://reddit.com",
//     Type: "Article",
//     Tags: ["React", "TypeScript", "Frontend"],
//     PageURL: "https://notion.so/fe1",
//     // pageContent: "",
//   },
//   // Replaced with randomly generated data in the new order
//   // generateRandomCSPage("2"),
//   // generateRandomCSPage("3"),
// ];

describe("useTableSorting", () => {
  // Test Case 1: Initial state
  it("should initialize with no active sort and return data in original order", () => {
    const { result } = renderHook(() => useTableSorting(mockRowPages));

    expect(result.current.sortProps.sortDirectionName).toBeNull();
    expect(result.current.sortProps.sortDirectionNotedTime).toBeNull();
    expect(result.current.sortProps.sortDirectionCreatedTime).toBeNull();
    expect(result.current.sortProps.sortDirectionEditedTime).toBeNull();
    expect(result.current.sortProps.sortDirectionSource).toBeNull();

    // Verify that the sortedData is initially the same as the input filteredData
    expect(result.current.sortedData).toEqual(mockRowPages);
  });

  // Test Case 2: Name Sorting
  describe("Name Sorting", () => {
    it("should sort by Name in ascending order", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleNameSort("asc");
      });

      expect(result.current.sortProps.sortDirectionName).toBe("asc");
      // Check that other sorts are reset
      expect(result.current.sortProps.sortDirectionNotedTime).toBeNull();
      expect(result.current.sortProps.sortDirectionCreatedTime).toBeNull();
      expect(result.current.sortProps.sortDirectionEditedTime).toBeNull();
      expect(result.current.sortProps.sortDirectionSource).toBeNull();

      // Expected order:
      //
      //  "Is there a good service for getting your resume reviewed by someone that does tech hiring?",
      // "Let's Test this code - Coding with Liam",
      // "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
      // "State management with Redux - Leveling up in React JS",
      const expectedNames = [
        "Is there a good service for getting your resume reviewed by someone that does tech hiring?",
        "Let's Test this code - Coding with Liam",
        "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
        "State management with Redux - Leveling up in React JS",
      ];
      expect(result.current.sortedData.map((row) => row.Name)).toEqual(
        expectedNames
      );
    });

    it("should sort by Name in descending order", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleNameSort("desc");
      });

      expect(result.current.sortProps.sortDirectionName).toBe("desc");

      // Expected order:
      //
      // "State management with Redux - Leveling up in React JS",
      // "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
      // "Let's Test this code - Coding with Liam",
      //  "Is there a good service for getting your resume reviewed by someone that does tech hiring?",

      const expectedNames = [
        "State management with Redux - Leveling up in React JS",
        "Progressive Web Apps in 100 Seconds Build a PWA from Scratch",
        "Let's Test this code - Coding with Liam",
        "Is there a good service for getting your resume reviewed by someone that does tech hiring?",
      ];
      expect(result.current.sortedData.map((row) => row.Name)).toEqual(
        expectedNames
      );
    });

    it("should reset Name sort", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleNameSort("asc");
      });
      expect(result.current.sortProps.sortDirectionName).toBe("asc");

      act(() => {
        result.current.sortHandlers.resetNameSort();
      });
      expect(result.current.sortProps.sortDirectionName).toBeNull();
      // Should return to the original order (as no other sort is active)
      expect(result.current.sortedData).toEqual(mockRowPages);
    });
  });

  // Test Case 3: CreatedTime Sorting
  describe("CreatedTime Sorting", () => {
    it("should sort by CreatedTime in ascending order", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleCreatedTimeSort("asc");
      });

      expect(result.current.sortProps.sortDirectionCreatedTime).toBe("asc");
      expect(result.current.sortProps.sortDirectionName).toBeNull();

      expect(result.current.sortProps.sortDirectionNotedTime).toBeNull();
      expect(result.current.sortProps.sortDirectionEditedTime).toBeNull();
      expect(result.current.sortProps.sortDirectionSource).toBeNull();

      const sortedByCreatedTime = [...mockRowPages].sort((a, b) => {
        const dateA =
          a.CreatedTime instanceof Date ? a.CreatedTime.getTime() : -Infinity;
        const dateB =
          b.CreatedTime instanceof Date ? b.CreatedTime.getTime() : -Infinity;
        return dateA - dateB;
      });

      expect(result.current.sortedData.map((row) => row.Name)).toEqual(
        sortedByCreatedTime.map((row) => row.Name)
      );
    });

    it("should sort by CreatedTime in descending order", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleCreatedTimeSort("desc");
      });

      expect(result.current.sortProps.sortDirectionCreatedTime).toBe("desc");

      const sortedByCreatedTimeDesc = [...mockRowPages]
        .sort((a, b) => {
          const dateA =
            a.CreatedTime instanceof Date ? a.CreatedTime.getTime() : -Infinity;
          const dateB =
            b.CreatedTime instanceof Date ? b.CreatedTime.getTime() : -Infinity;
          return dateB - dateA; // Sort descending
        })
        .filter((row) => row.CreatedTime !== null); // Filter out null dates for explicit comparison first

      const missingDates = mockRowPages.find(
        (row) => row.Name === "Missing Dates Entry"
      );
      let expectedNamesDesc = sortedByCreatedTimeDesc.map((row) => row.Name);
      if (missingDates) {
        expectedNamesDesc = [...expectedNamesDesc, missingDates.Name]; // Nulls go last in descending too
      }

      expect(result.current.sortedData.map((row) => row.Name)).toEqual(
        expectedNamesDesc
      );
    });

    it("should reset CreatedTime sort", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleCreatedTimeSort("asc");
      });
      expect(result.current.sortProps.sortDirectionCreatedTime).toBe("asc");

      act(() => {
        result.current.sortHandlers.resetCreatedTimeSort();
      });
      expect(result.current.sortProps.sortDirectionCreatedTime).toBeNull();
      expect(result.current.sortedData).toEqual(mockRowPages);
    });
  });

  // Test Case 4: NotedTime Sorting
  describe("NotedTime Sorting", () => {
    it("should sort by NotedTime in ascending order", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleNotedTimeSort("asc");
      });

      expect(result.current.sortProps.sortDirectionNotedTime).toBe("asc");
      expect(result.current.sortProps.sortDirectionName).toBeNull();

      expect(result.current.sortProps.sortDirectionCreatedTime).toBeNull();
      expect(result.current.sortProps.sortDirectionEditedTime).toBeNull();
      expect(result.current.sortProps.sortDirectionSource).toBeNull();

      const sortedByNotedTime = [...mockRowPages].sort((a, b) => {
        const dateA =
          a.NotedTime instanceof Date ? a.NotedTime.getTime() : -Infinity;
        const dateB =
          b.NotedTime instanceof Date ? b.NotedTime.getTime() : -Infinity;
        return dateA - dateB;
      });

      expect(result.current.sortedData.map((row) => row.Name)).toEqual(
        sortedByNotedTime.map((row) => row.Name)
      );
    });

    it("should sort by NotedTime in descending order", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleNotedTimeSort("desc");
      });

      expect(result.current.sortProps.sortDirectionNotedTime).toBe("desc");

      const sortedByNotedTimeDesc = [...mockRowPages]
        .sort((a, b) => {
          const dateA =
            a.CreatedStart instanceof Date
              ? a.CreatedStart.getTime()
              : -Infinity;
          const dateB =
            b.CreatedStart instanceof Date
              ? b.CreatedStart.getTime()
              : -Infinity;
          return dateB - dateA; // Sort descending
        })
        .filter((row) => row.CreatedStart !== null); // Filter out null dates for explicit comparison first

      const missingDates = mockRowPages.find(
        (row) => row.Name === "Missing Dates Entry"
      );
      let expectedNamesDesc = sortedByNotedTimeDesc.map((row) => row.Name);
      if (missingDates) {
        expectedNamesDesc = [...expectedNamesDesc, missingDates.Name]; // Nulls go last in descending too
      }

      expect(result.current.sortedData.map((row) => row.Name)).toEqual(
        expectedNamesDesc
      );
    });

    it("should reset CreatedTime sort", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleCreatedTimeSort("asc");
      });
      expect(result.current.sortProps.sortDirectionCreatedTime).toBe("asc");

      act(() => {
        result.current.sortHandlers.resetCreatedTimeSort();
      });
      expect(result.current.sortProps.sortDirectionCreatedTime).toBeNull();
      expect(result.current.sortedData).toEqual(mockRowPages);
    });
  });
  // Test Case 5: Priority - only one sort should be active at a time
  describe("Sort Priority and Reset on New Sort", () => {
    it("should reset Name sort when Created Time sort is applied", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleNameSort("asc");
      });
      expect(result.current.sortProps.sortDirectionName).toBe("asc");

      act(() => {
        result.current.sortHandlers.handleCreatedTimeSort("desc");
      });
      expect(result.current.sortProps.sortDirectionCreatedTime).toBe("desc");
      expect(result.current.sortProps.sortDirectionName).toBeNull(); // Name sort should be reset
    });

    it("should reset CreatedTime sort when EditedTime sort is applied", () => {
      const { result } = renderHook(() => useTableSorting(mockRowPages));

      act(() => {
        result.current.sortHandlers.handleEditedTimeSort("asc");
      });
      expect(result.current.sortProps.sortDirectionEditedTime).toBe("asc");

      act(() => {
        result.current.sortHandlers.handleEditedTimeSort("desc");
      });
      expect(result.current.sortProps.sortDirectionEditedTime).toBe("desc");
      expect(result.current.sortProps.sortDirectionCreatedTime).toBeNull(); // CreatedTime sort should be reset
    });
  });

  // Test Case 6: Handling empty or single-item data
  it("should handle empty data gracefully", () => {
    const { result } = renderHook(() => useTableSorting([]));
    expect(result.current.sortedData).toEqual([]);
    act(() => {
      result.current.sortHandlers.handleNameSort("asc");
    });
    expect(result.current.sortedData).toEqual([]);
  });

  it("should handle single-item data gracefully", () => {
    const singlePage = [mockRowPages[0]];
    const { result } = renderHook(() => useTableSorting(singlePage));
    expect(result.current.sortedData).toEqual(singlePage);
    act(() => {
      result.current.sortHandlers.handleNameSort("asc");
    });
    expect(result.current.sortedData).toEqual(singlePage);
  });
});

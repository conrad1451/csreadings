import { useState, useMemo } from "react";

// --- Interfaces
// interface Page {
//   id: string;
//   Name: string;
//   Status: string;
//   Level: string;
//   Source: string[];
//   DateFound: Date;
//   DayPosted: Date;
//   ApplicationDeadline: Date;
//   DateApplied: Date;
//   ExpireDate: Date;
//   PostingURL: string;
//   Connection: string;
//   State: string[];
//   Setup: string[];
//   Company: string[];
//   Education: string[];
//   Duties: string[];
//   Tags: string[];
//   Tenure: string[];
//   Location: string;
//   PageURL: string;
// }

// interface Page {
//   id: string;
//   Name: string;
//   CreatedTime: Date;
//   EditedTime: Date;
//   CreatedStart: Date;
//   CreatedEnd: Date;
//   PublishedStart: Date;
//   PublishedEnd: Date;
//   Area: string;
//   Source: string;
//   Link: string;
//   Type: string;
//   Tags: string[];
//   PageURL: string;
//   pageContent: string;
// }

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

// --- Utility Sorting Functions (Can be moved to a separate file like utils/sorts.ts) ---

/**
 * Comparator function for sorting RowPage objects by Name.
 * @param a - First RowPage object.
 * @param b - Second RowPage object.
 * @param direction - Sort direction ("asc" or "desc").
 * @returns -1 if a < b, 1 if a > b, 0 if equal, based on direction.
 */
function sortByNameComparator(
  a: RowPage,
  b: RowPage,
  direction: "asc" | "desc"
): number {
  const nameA = a.Name.toLowerCase();
  const nameB = b.Name.toLowerCase();
  if (nameA < nameB) {
    return direction === "asc" ? -1 : 1;
  }
  if (nameA > nameB) {
    return direction === "asc" ? 1 : -1;
  }
  return 0;
}

/**
 * Comparator function for sorting RowPage objects by a Date property.
 * Handles cases where dates might be missing or invalid.
 * @param a - First RowPage object.
 * @param b - Second RowPage object.
 * @param direction - Sort direction ("asc" or "desc").
 * @param dateKey - The key (property name) of the Date field to sort by.
 * @returns -1 if a < b, 1 if a > b, 0 if equal, based on direction.
 */
function sortByDateComparator(
  a: RowPage,
  b: RowPage,
  direction: "asc" | "desc",
  dateKey:
    | "DateFound"
    | "DayPosted"
    | "ApplicationDeadline"
    | "DateApplied"
    | "ExpireDate"
): number {
  // Convert dates to milliseconds for comparison, treat invalid/missing dates as -Infinity to push them to end in asc.
  const dateA =
    a[dateKey] instanceof Date
      ? a[dateKey].getTime()
      : a[dateKey]
        ? new Date(a[dateKey]).getTime()
        : -Infinity;
  const dateB =
    b[dateKey] instanceof Date
      ? b[dateKey].getTime()
      : b[dateKey]
        ? new Date(b[dateKey]).getTime()
        : -Infinity;

  if (dateA < dateB) {
    return direction === "asc" ? -1 : 1;
  }
  if (dateA > dateB) {
    return direction === "asc" ? 1 : -1;
  }
  return 0;
}

// --- useTableSorting Custom Hook ---

/**
 * A custom React hook for managing all table sorting logic and state.
 * It takes filtered data and returns the sorted data, along with
 * sort properties and handler functions to control the sorting.
 *
 * @param filteredData The array of RowPage objects after filtering has been applied.
 * @returns An object containing:
 * - sortedData: The RowPage[] array after sorting has been applied.
 * - sortProps: An object containing all the state variables for sorting (e.g., current sort directions).
 * - sortHandlers: An object containing all the functions to change sort states.
 */
export const useTableSorting = (filteredData: RowPage[]) => {
  // --- State for Sort Directions ---
  const [sortDirectionName, setSortDirectionName] = useState<
    "asc" | "desc" | null
  >(null);
  const [sortDirectionDateFound, setSortDirectionDateFound] = useState<
    "asc" | "desc" | null
  >(null);
  const [sortDirectionDayPosted, setSortDirectionDayPosted] = useState<
    "asc" | "desc" | null
  >(null);

  // --- Reset Functions for Sorting ---
  const resetNameSort = () => setSortDirectionName(null);
  const resetDateFoundSort = () => setSortDirectionDateFound(null);
  const resetDayPostedSort = () => setSortDirectionDayPosted(null);

  // --- Sort Handlers (to be called by UI) ---
  const handleNameSort = (direction: "asc" | "desc") => {
    setSortDirectionName(direction);
    // Reset other sorts when a new column is sorted
    setSortDirectionDateFound(null);
    setSortDirectionDayPosted(null);
  };

  const handleDateFoundSort = (direction: "asc" | "desc") => {
    setSortDirectionDateFound(direction);
    // Reset other sorts
    setSortDirectionName(null);
    setSortDirectionDayPosted(null);
  };

  const handleDayPostedSort = (direction: "asc" | "desc") => {
    setSortDirectionDayPosted(direction);
    // Reset other sorts
    setSortDirectionName(null);
    setSortDirectionDateFound(null);
  };

  // --- Memoized Sorted Data ---
  const sortedData = useMemo(() => {
    const sortableData = [...filteredData]; // Create a shallow copy to avoid mutating original array

    if (sortDirectionName) {
      sortableData.sort((a, b) =>
        sortByNameComparator(a, b, sortDirectionName)
      );
    } else if (sortDirectionDateFound) {
      sortableData.sort((a, b) =>
        sortByDateComparator(a, b, sortDirectionDateFound, "DateFound")
      );
    } else if (sortDirectionDayPosted) {
      sortableData.sort((a, b) =>
        sortByDateComparator(a, b, sortDirectionDayPosted, "DayPosted")
      );
    }

    return sortableData;
  }, [
    filteredData,
    sortDirectionName,
    sortDirectionDateFound,
    sortDirectionDayPosted,
  ]);

  return {
    sortedData,
    sortProps: {
      sortDirectionName,
      sortDirectionDateFound,
      sortDirectionDayPosted,
    },
    sortHandlers: {
      handleNameSort,
      handleDateFoundSort,
      handleDayPostedSort,
      resetNameSort,
      resetDateFoundSort,
      resetDayPostedSort,
    },
  };
};

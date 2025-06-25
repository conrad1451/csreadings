import { useState, useMemo } from "react";

/**
 * Generic comparator function for sorting RowPage objects by any string property.
 * @param a - First RowPage object.
 * @param b - Second RowPage object.
 * @param direction - Sort direction ("asc" or "desc").
 * @param key - The key (property name) of the string field to sort by.
 * @returns -1 if a < b, 1 if a > b, 0 if equal, based on direction.
 */

import { RowPage } from "../utils/dataTransforms";
function sortByStringComparator(
  a: RowPage,
  b: RowPage,
  direction: "asc" | "desc",
  key: keyof Pick<
    RowPage,
    "Name" | "Source" | "Area" | "Link" | "Type" | "PageURL"
    // "Name" | "Source" | "Area" | "Link" | "Type" | "PageURL" | "pageContent"
  > // Restrict to string properties
): number {
  const valueA = String(a[key] || "").toLowerCase(); // Ensure it's a string, handle null/undefined
  const valueB = String(b[key] || "").toLowerCase();

  if (valueA < valueB) {
    return direction === "asc" ? -1 : 1;
  }
  if (valueA > valueB) {
    return direction === "asc" ? 1 : -1;
  }
  return 0;
}

// CHQ: Gemini AI edits include removing Source from dateKey and using
// logic to push invalid entries to the end of the list
/**
 * Comparator function for sorting RowPage objects by a Date property.
 * Handles cases where dates might be missing or invalid by consistently
 * pushing them to the end of the sorted list (either ascending or descending).
 *
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
    | "CreatedStart"
    | "CreatedTime"
    | "EditedTime"
    | "PublishedStart"
    | "PublishedEnd"
): number {
  // Helper to safely get the time in milliseconds from a date value.
  // Returns +/-Infinity if the date is invalid or missing, ensuring consistent placement in sort.
  const getSafeTime = (
    dateValue: Date | any,
    sortDirection: "asc" | "desc"
  ): number => {
    let time: number;

    if (dateValue instanceof Date) {
      time = dateValue.getTime();
    } else if (dateValue) {
      // If it's not a Date object but is truthy (e.g., a string)
      const parsedDate = new Date(dateValue);
      time = parsedDate.getTime();
    } else {
      // If dateValue is falsy (null, undefined, etc.)
      time = sortDirection === "asc" ? Infinity : -Infinity; // Push falsy/missing to the end
    }

    // If getTime() results in NaN (Invalid Date), treat it as Infinity to push it to the end.
    if (isNaN(time)) {
      return sortDirection === "asc" ? Infinity : -Infinity;
    }
    return time;
  };

  const dateA = getSafeTime(a[dateKey], direction);
  const dateB = getSafeTime(b[dateKey], direction);

  // Normal comparison for valid dates
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
  const [sortDirectionNotedTime, setsortDirectionNotedTime] = useState<
    "asc" | "desc" | null
  >(null);
  const [sortDirectionCreatedTime, setsortDirectionCreatedTime] = useState<
    "asc" | "desc" | null
  >(null);
  const [sortDirectionEditedTime, setsortDirectionEditedTime] = useState<
    "asc" | "desc" | null
  >(null);
  const [sortDirectionSource, setsortDirectionSource] = useState<
    "asc" | "desc" | null
  >(null);

  // CHQ: Gemini AI added helper function resetAllSortDirections
  // --- Helper to reset all other sort directions except the active one ---
  const resetAllSortDirections = (excludeKey: string | null = null) => {
    if (excludeKey !== "Name") setSortDirectionName(null);
    if (excludeKey !== "CreatedStart") setsortDirectionNotedTime(null);
    if (excludeKey !== "CreatedTime") setsortDirectionCreatedTime(null);
    if (excludeKey !== "EditedTime") setsortDirectionEditedTime(null);
    if (excludeKey !== "Source") setsortDirectionSource(null);
    // Add more resets for other sortable columns here
  };

  // --- Reset Functions for Sorting ---
  const resetNameSort = () => setSortDirectionName(null);
  const resetNotedTimeSort = () => setsortDirectionNotedTime(null); // For CreatedStart
  const resetCreatedTimeSort = () => setsortDirectionCreatedTime(null);
  const resetEditedTimeSort = () => setsortDirectionEditedTime(null);
  const resetSourceSort = () => setsortDirectionSource(null); // Corrected function name

  // --- Sort Handlers (to be called by UI) ---

  const resetOtherSortsUponNewSort = true;
  // const resetOtherSortsUponNewSort = false;

  // --- Sort Handlers (to be called by UI) ---
  const handleNameSort = (direction: "asc" | "desc") => {
    setSortDirectionName(direction);
    if (resetOtherSortsUponNewSort) {
      resetAllSortDirections("Name");
    }
  };

  const handleCreatedTimeSort = (direction: "asc" | "desc") => {
    setsortDirectionCreatedTime(direction);
    if (resetOtherSortsUponNewSort) {
      resetAllSortDirections("CreatedTime");
    }
  };

  const handleEditedTimeSort = (direction: "asc" | "desc") => {
    setsortDirectionEditedTime(direction); // Corrected: should set EditedTime direction
    if (resetOtherSortsUponNewSort) {
      resetAllSortDirections("EditedTime");
    }
  };

  const handleNotedTimeSort = (direction: "asc" | "desc") => {
    setsortDirectionNotedTime(direction); // For CreatedStart
    if (resetOtherSortsUponNewSort) {
      resetAllSortDirections("CreatedStart");
    }
  };

  const handleSourceSort = (direction: "asc" | "desc") => {
    setsortDirectionSource(direction);
    if (resetOtherSortsUponNewSort) {
      resetAllSortDirections("Source");
    }
  };

  // --- Memoized Sorted Data ---
  const sortedData = useMemo(() => {
    // Create a shallow copy to avoid mutating the original filteredData array.
    const sortableData = [...filteredData];

    // Apply sorting based on the currently active sort direction.
    // The order of these `if/else if` blocks determines sort priority if multiple
    // sort directions were active (though `resetOtherSortsUponNewSort` makes only one active).
    if (sortDirectionName) {
      sortableData.sort((a, b) =>
        sortByStringComparator(a, b, sortDirectionName, "Name")
      );
    } else if (sortDirectionNotedTime) {
      // Corresponds to CreatedStart
      sortableData.sort((a, b) =>
        sortByDateComparator(a, b, sortDirectionNotedTime, "CreatedStart")
      );
    } else if (sortDirectionCreatedTime) {
      sortableData.sort((a, b) =>
        sortByDateComparator(a, b, sortDirectionCreatedTime, "CreatedTime")
      );
    } else if (sortDirectionEditedTime) {
      sortableData.sort((a, b) =>
        sortByDateComparator(a, b, sortDirectionEditedTime, "EditedTime")
      );
    } else if (sortDirectionSource) {
      // Use sortByStringComparator for the Source column as it's a string
      sortableData.sort((a, b) =>
        sortByStringComparator(a, b, sortDirectionSource, "Source")
      );
    }

    return sortableData;
  }, [
    filteredData, // Recalculate if the data being sorted changes
    sortDirectionName,
    sortDirectionNotedTime, // Corresponds to CreatedStart
    sortDirectionCreatedTime,
    sortDirectionEditedTime,
    sortDirectionSource,
  ]);

  return {
    sortedData,
    sortProps: {
      sortDirectionName,
      sortDirectionNotedTime, // Exported for CreatedStart
      sortDirectionCreatedTime,
      sortDirectionEditedTime,
      sortDirectionSource,
    },
    sortHandlers: {
      handleNameSort,
      handleNotedTimeSort, // Exported for CreatedStart
      handleCreatedTimeSort,
      handleEditedTimeSort,
      handleSourceSort,
      resetNameSort,
      resetNotedTimeSort, // Exported for CreatedStart
      resetCreatedTimeSort,
      resetEditedTimeSort,
      resetSourceSort, // Corrected name
    },
  };
};

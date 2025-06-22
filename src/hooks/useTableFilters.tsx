// CHQ: Gemini AI generated

import { useState, useMemo } from "react";
import { SelectChangeEvent } from "@mui/material/Select"; // For Material-UI Select events

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

interface Item {
  value: string;
}

// --- Utility Filtering Functions (Can be moved to a separate file like utils/filters.ts) ---

/**
 * Filters RowPage data based on a single selected value for a specified key.
 * @param filterEnabled - Boolean to enable/disable this filter.
 * @param selectedValue - The value to filter by.
 * @param curData - The current array of RowPage objects to filter.
 * @param selection - The key (property name) on which to apply the filter.
 * @returns Filtered array of RowPage objects.
 */
function filterBySingleSelect(
  filterEnabled: boolean,
  selectedValue: string,
  curData: RowPage[],
  selection: "Source"
): RowPage[] {
  if (filterEnabled && selectedValue !== "") {
    return curData.filter((row) => row[selection] === selectedValue);
  }
  return curData;
}

/**
 * Filters RowPage data where a given array property contains ALL of the selected values.
 * @param filterEnabled - Boolean to enable/disable this filter.
 * @param propNameList - An array of values that the RowPage property must include.
 * @param curData - The current array of RowPage objects to filter.
 * @param selection - The key (property name) on which to apply the multi-select filter.
 * @returns Filtered array of RowPage objects.
 */
function filterByMultiSelect(
  filterEnabled: boolean,
  propNameList: string[],
  curData: RowPage[],
  selection: "Tags"
): RowPage[] {
  // Ensure the filter is enabled, propNameList has actual values, and the first value isn't an empty string (from initial state)
  if (filterEnabled && propNameList.length > 0 && propNameList[0] !== "") {
    return curData.filter(
      (row) =>
        row[selection] && // Ensure the property exists and is not null/undefined
        Array.isArray(row[selection]) && // Ensure it's an array
        // Check if ALL selected items are present in the row's property array
        propNameList.every((curItem) =>
          (row[selection] as string[]).includes(curItem)
        )
    );
  }
  return curData;
}

/**
 * Filters RowPage data based on whether the Name property includes the filter text (case-insensitive).
 * @param data - The array of RowPage objects to filter.
 * @param enabled - Boolean to enable/disable this filter.
 * @param filterText - The text to search for in the Name property.
 * @returns Filtered array of RowPage objects.
 */
function filterByPageName(
  data: RowPage[],
  enabled: boolean,
  filterText: string
): RowPage[] {
  if (enabled && filterText.trim() !== "") {
    return data.filter((row) =>
      row.Name.toLowerCase().includes(filterText.toLowerCase())
    );
  }
  return data;
}

/**
 * Filters RowPage data based on the number of Tags a row has.
 * @param data - The array of RowPage objects to filter.
 * @param count - The exact tag count to filter by, or "" for no filter.
 * @returns Filtered array of RowPage objects.
 */
function filterByTagCount(data: RowPage[], count: number | ""): RowPage[] {
  if (count !== "") {
    return data.filter((row) => row.Tags.length === count);
  }
  return data;
}

// --- useTableFilters Custom Hook ---

/**
 * A custom React hook for managing all table filtering logic and state.
 * It takes the raw table data and returns the filtered data, along with
 * filter properties and handler functions to control the filters.
 *
 * @param initialData The initial, unfiltered data in RowPage[] format.
 * @returns An object containing:
 * - filteredData: The RowPage[] array after all filters have been applied.
 * - filterProps: An object containing all the state variables for filters.
 * - filterHandlers: An object containing all the functions to change filter states.
 * - derivedLists: An object containing lists derived from the data for filter options (e.g., tag counts).
 */
export const useTableFilters = (initialData: RowPage[]) => {
  // --- State for Filters ---
  const [pageFilterEnabled, setPageFilterEnabled] = useState(false);
  const [pageFilterText, setPageFilterText] = useState("");

  const [sourceFilterEnabled, setSourceFilterEnabled] = useState(false);
  const [sourceSelected, setSourceSelected] = useState<string>("");

  const [tagFilterEnabled, setTagFilterEnabled] = useState(false);
  const [tagNameList, setTagNameList] = useState<string[]>([]);

  const [tagCountFilter, setTagCountFilter] = useState<number | "">("");

  // --- Derived Lists for Filter Options ---
  const uniqueTagCounts = useMemo(() => {
    return [
      ...new Set(initialData.map((row: RowPage) => row.Tags.length)),
    ].sort((a, b) => a - b);
  }, [initialData]);

  const tagCountOptions = useMemo(
    () => ["", ...uniqueTagCounts], // "" for "All" option
    [uniqueTagCounts]
  );

  // --- Filter Handlers ---

  const handlePageFilterToggle = () => {
    setPageFilterEnabled((prev) => !prev);
    setPageFilterText(""); // Clear filter text when toggling off
  };

  const handleSourceFilterToggle = () => {
    setSourceFilterEnabled((prev) => !prev);
  };

  const handleTagFilterToggle = () => {
    setTagFilterEnabled((prev) => !prev);
  };

  const handleTagCountChange = (event: SelectChangeEvent<number | string>) => {
    setTagCountFilter(event.target.value as number | "");
  };

  const handleSourceChange = (selection: Item | null) => {
    setSourceSelected(selection ? selection.value : "");
  };

  // Multi-select handlers for BasicDropdownList (assuming single selection on change)
  // For a true multi-select dropdown, BasicDropdownList would need to return an array of Items.
  // For now, we'll assume it returns one selected item at a time, and we manage the list.
  const handleTagNameChange = (selection: Item | null) => {
    // This logic assumes BasicDropdownList handles adding/removing to a multi-select list.
    // If it's a single selection, you'd need to re-think how you manage `tagNameList`.
    // For a basic mock, we can just set it to the selected item or clear it.
    // A more robust multi-select would use a different `BasicDropdownList` behavior.
    if (selection && selection.value) {
      // If the item is already in the list, remove it. Otherwise, add it.
      setTagNameList((prev) =>
        prev.includes(selection.value)
          ? prev.filter((tag) => tag !== selection.value)
          : [...prev, selection.value]
      );
    } else {
      // Handle clear selection for BasicDropdownList if it sends null/empty value
      setTagNameList([]);
    }
  };

  // --- Reset Functions ---
  const resetPageFilters = () => {
    setPageFilterText("");
    setPageFilterEnabled(false);
  };
  const resetTagCountFilters = () => setTagCountFilter("");
  const resetSourceFilters = () => setSourceSelected("");

  const resetTagFilters = () => setTagNameList([]);

  // --- Memoized Filtered Data ---
  const filteredData = useMemo(() => {
    let currentFilteredData = initialData;

    // Apply page name filter
    currentFilteredData = filterByPageName(
      currentFilteredData,
      pageFilterEnabled,
      pageFilterText
    );

    // Apply tag count filter
    currentFilteredData = filterByTagCount(currentFilteredData, tagCountFilter);

    // Apply multi-select filters
    currentFilteredData = filterByMultiSelect(
      tagFilterEnabled,
      tagNameList,
      currentFilteredData,
      "Tags"
    );

    // Apply single-select status filter
    currentFilteredData = filterBySingleSelect(
      sourceFilterEnabled,
      sourceSelected,
      currentFilteredData,
      "Source"
    );

    return currentFilteredData;
  }, [
    initialData,
    pageFilterEnabled,
    pageFilterText,
    sourceFilterEnabled,
    sourceSelected,
    tagCountFilter,
    tagFilterEnabled,
    tagNameList,
  ]);

  return {
    filteredData,
    filterProps: {
      isPageFilterEnabled: pageFilterEnabled,
      pageFilterText,
      tagCountFilter,
      isSourceFilterEnabled: sourceFilterEnabled,
      sourceSelected,
      isTagFilterEnabled: tagFilterEnabled,
      tagNameList,
    },
    filterHandlers: {
      togglePageFilter: handlePageFilterToggle,
      setPageFilterText,
      handleTagCountChange,
      toggleSourceFilter: handleSourceFilterToggle,
      handleSourceChange,
      toggleTagFilter: handleTagFilterToggle,
      handleTagNameChange,
      resetPageFilters,
      resetTagCountFilters,
      resetSourceFilters,
      resetTagFilters,
    },
    derivedLists: {
      tagCountOptions,
    },
  };
};

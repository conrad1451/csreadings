// import { useState, useMemo } from "react";
import { useState } from "react";

// --- Interfaces (Copied from your original file for completeness) ---
// Assuming these are defined globally or imported from a shared types file
interface ColumnVisibility {
  Name: boolean;
  Status: boolean;
  Level: boolean;
  Source: boolean;
  DateFound: boolean;
  DayPosted: boolean;
  ApplicationDeadline: boolean;
  DateApplied: boolean;
  ExpireDate: boolean;
  PostingURL: boolean;
  Connection: boolean;
  State: boolean;
  Setup: boolean;
  Company: boolean;
  Education: boolean;
  Duties: boolean;
  Tags: boolean;
  Tenure: boolean;
  Location: boolean;
  PageURL: boolean;
}

// --- Default and Preset Column Visibility Settings ---
// These were in your original CustomTable file, now moved here for centralization
const defaultColumnVisibility: ColumnVisibility = {
  Name: true,
  Status: true,
  Level: false,
  Source: true,
  DateFound: true,
  DayPosted: false,
  ApplicationDeadline: false,
  DateApplied: true,
  ExpireDate: true,
  PostingURL: true,
  Connection: false,
  State: false,
  Setup: false,
  Company: false,
  Education: false,
  Duties: false,
  Tags: true,
  Tenure: false,
  Location: false,
  PageURL: true,
};

const visibilityPresets: Map<string, ColumnVisibility> = new Map();

visibilityPresets.set("default", defaultColumnVisibility); // Explicitly set the default
visibilityPresets.set("smartphone", {
  Name: true,
  Status: true,
  Level: false,
  Source: false,
  DateFound: true,
  DayPosted: false,
  ApplicationDeadline: false,
  DateApplied: false,
  ExpireDate: false,
  PostingURL: false,
  Connection: false,
  State: false,
  Setup: false,
  Company: true,
  Education: false,
  Duties: true,
  Tags: true,
  Tenure: false,
  Location: false,
  PageURL: true,
});

visibilityPresets.set("companyInfo", {
  Name: true,
  Status: false,
  Level: false,
  Source: false,
  DateFound: true,
  DayPosted: false,
  ApplicationDeadline: false,
  DateApplied: false,
  ExpireDate: false,
  PostingURL: false,
  Connection: false,
  State: true,
  Setup: true,
  Company: true,
  Education: false,
  Duties: false,
  Tags: false,
  Tenure: true,
  Location: true,
  PageURL: false,
});

visibilityPresets.set("workerSetup", {
  Name: true,
  Status: false,
  Level: false,
  Source: false,
  DateFound: true,
  DayPosted: false,
  ApplicationDeadline: false,
  DateApplied: false,
  ExpireDate: false,
  PostingURL: false,
  Connection: false,
  State: true,
  Setup: true,
  Company: true,
  Education: false,
  Duties: true,
  Tags: false,
  Tenure: true,
  Location: false,
  PageURL: false,
});

// --- useColumnVisibility Custom Hook ---

/**
 * A custom React hook for managing the visibility of table columns.
 * It provides state for visible columns and handler functions to toggle
 * individual columns, reset to a default, or apply preset visibility.
 *
 * @param initialPresetKey Optional. A key from `visibilityPresets` to set initial visibility.
 * Defaults to "default".
 * @returns An object containing:
 * - visibleColumns: The current ColumnVisibility object.
 * - handleToggleColumn: A function to toggle the visibility of a single column.
 * - setPresetVisibility: A function to apply a predefined visibility preset.
 * - resetVisibility: A function to reset to the default visibility.
 * - presets: The map of available visibility presets.
 */
export const useColumnVisibility = (
  initialPresetKey: keyof typeof visibilityPresets | string = "default"
) => {
  // Use a functional update for useState to ensure we get the correct initial state
  const [visibleColumns, setVisibleColumns] = useState<ColumnVisibility>(() => {
    // Attempt to get the preset, fall back to default if key is not found

    // Argument of type 'string | unique symbol | unique symbol' is not assignable to parameter of type 'string'.
    //   Type 'typeof Symbol.iterator' is not assignable to type 'string'.ts(2345)
    // (parameter) initialPresetKey: string | typeof Symbol.iterator | typeof Symbol.toStringTag
    // Optional. A key from visibilityPresets to set initial visibility. Defaults to "default".

    // @param initialPresetKey
    // Optional. A key from visibilityPresets to set initial visibility. Defaults to "default".
    // return visibilityPresets.get(initialPresetKey) || defaultColumnVisibility;

    return (
      visibilityPresets.get(String(initialPresetKey)) || defaultColumnVisibility
    );
  });

  /**
   * Toggles the visibility of a single column.
   * @param event The change event from a Switch or similar input.
   */
  const handleToggleColumn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  /**
   * Applies a predefined column visibility preset.
   * @param presetKey The key of the preset to apply (e.g., "smartphone", "companyInfo").
   */
  const setPresetVisibility = (presetKey: keyof typeof visibilityPresets) => {
    const preset = visibilityPresets.get(String(presetKey));
    if (preset) {
      setVisibleColumns(preset);
    } else {
      console.warn(
        `Preset "${String(presetKey)}" not found. Applying default visibility.`
      );
      setVisibleColumns(defaultColumnVisibility);
    }
  };

  /**
   * Resets column visibility to the global default setting.
   */
  const resetVisibility = () => {
    setVisibleColumns(defaultColumnVisibility);
  };

  return {
    visibleColumns,
    handleToggleColumn,
    setPresetVisibility,
    resetVisibility,
    presets: visibilityPresets, // Provide presets if the consumer needs to list them
  };
};

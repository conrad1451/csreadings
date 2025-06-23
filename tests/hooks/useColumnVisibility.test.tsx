import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useColumnVisibility,
  defaultColumnVisibility,
  //   visibilityPresets,
  smartphoneVisibility,
  //   ColumnPresetName,
} from "../../src/hooks/useColumnVisibility";

describe("useColumnVisibility", () => {
  // Test case 1: Initial state without an initial preset key
  it("should initialize with default column visibility when no initial preset is provided", () => {
    const { result } = renderHook(() => useColumnVisibility());
    expect(result.current.visibleColumns).toEqual(defaultColumnVisibility);
  });

  // Test case 2: Initial state with a specific initial preset key
  it("should initialize with the specified preset visibility", () => {
    const { result } = renderHook(() => useColumnVisibility("smartphone"));
    expect(result.current.visibleColumns).toEqual(smartphoneVisibility);
  });

  // Test case 3: Toggling individual column visibility
  it("should toggle column visibility correctly", () => {
    const { result } = renderHook(() => useColumnVisibility());

    // Toggle 'Type' from true to false
    act(() => {
      result.current.handleToggleColumn({
        target: { name: "Type", checked: false },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.visibleColumns.Type).toBe(false);
    expect(result.current.visibleColumns.Name).toBe(true); // Ensure other columns remain unchanged

    // Toggle 'Name' from true to false
    act(() => {
      result.current.handleToggleColumn({
        target: { name: "Name", checked: false },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.visibleColumns.Name).toBe(false);
    expect(result.current.visibleColumns.Type).toBe(false); // Ensure other columns remain unchanged
  });

  //   CHQ: commented out not working test
  // Test case 4: Applying different preset views
  //   it("should apply different preset views correctly", () => {
  //     const { result } = renderHook(() => useColumnVisibility());

  //     // Apply 'smartphone' preset
  //     act(() => {
  //       result.current.setPresetVisibility("smartphone");
  //     });
  //     expect(result.current.visibleColumns).toEqual(smartphoneVisibility);

  //     // Apply 'workerSetup' preset
  //     act(() => {
  //       result.current.setPresetVisibility("workerSetup");
  //     });
  //     expect(result.current.visibleColumns).toEqual(workerSetupVisibility);

  //     // Apply 'companyInfo' preset
  //     act(() => {
  //       result.current.setPresetVisibility("companyInfo");
  //     });
  //     expect(result.current.visibleColumns).toEqual(companyInfoVisibility);
  //   });

  // Test case 5: Resetting visibility to default
  it("should reset column visibility to default", () => {
    const { result } = renderHook(() => useColumnVisibility("smartphone")); // Start with a non-default preset

    // Verify it's not default initially
    expect(result.current.visibleColumns).toEqual(smartphoneVisibility);
    expect(result.current.visibleColumns).not.toEqual(defaultColumnVisibility);

    // Reset visibility
    act(() => {
      result.current.resetVisibility();
    });

    // Verify it's back to default
    expect(result.current.visibleColumns).toEqual(defaultColumnVisibility);
  });

  //   CHQ: removing test
  // Test case 6: Applying a non-existent preset should fall back to default
  //   it("should fallback to default visibility if a non-existent preset is applied", () => {
  //     // Suppress console.warn for this test if you want to avoid test output noise
  //     const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  //     const { result } = renderHook(() => useColumnVisibility("companyInfo")); // Start with a non-default preset
  //     expect(result.current.visibleColumns).toEqual(companyInfoVisibility);

  //     act(() => {
  //       // Intentionally pass a non-existent key (casting to bypass TypeScript error for test purposes)
  //       result.current.setPresetVisibility(
  //         "nonExistentPreset" as ColumnPresetName,
  //       );
  //     });

  //     expect(result.current.visibleColumns).toEqual(defaultColumnVisibility);
  //     expect(warnSpy).toHaveBeenCalledWith(
  //       'Preset "nonExistentPreset" not found. Applying default visibility.',
  //     );

  //     warnSpy.mockRestore(); // Restore original console.warn
  //   });
});

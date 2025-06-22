import React, { useState, useMemo } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  Switch,
  TextField,
  // FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
// import { SelectChangeEvent } from "@mui/material/Select";

import BasicDownshift from "./BasicDropdownList";

// --- Import Custom Hooks ---
import { useTableFilters } from "./hooks/useTableFilters";
import { useTableSorting } from "./hooks/useTableSorting"; // Path to your useTableSorting.ts
import {
  useColumnVisibility,
  ColumnVisibility,
  visibilityPresets,
} from "./hooks/useColumnVisibility";
import { displayDate } from "./utils/dateDisplay";
// Import the data transformation functions from the utilities file
import {
  mapPagesToCustomTableData,
  producePropList,
} from "./utils/dataTransforms"; // Adjust the path as per your project structure

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
// function mapPagesToCustomTableData(pages: Page[]) {
//   return pages.map((page) =>
//     createCustomTableData(
//       page.id,
//       page.Name,
//       page.Area,
//       page.Source,
//       page.Link,
//       page.Type,
//       page.Tags,
//       page.PageURL,
//       page.pageContent,
//       page.CreatedTime,
//       page.EditedTime,
//       page.CreatedStart,
//       page.CreatedEnd,
//       page.PublishedStart,
//       page.PublishedEnd
//     )
//   );
// }

// const ElementChoice = (props: { textLine: string }) => {
//   const text = props.textLine;

//   if (text.startsWith('[p]')) {
//       // return <p>{text.slice(3)}</p>;
//       return <p>{text}</p>;
//   } else if (text.startsWith('[h1]')) {
//       // return <h1>{text.slice(4)}</h1>;
//       return <h1>{text}</h1>;
//   } else if (text.startsWith('[h2]')) {
//       // return <h2>{text.slice(4)}</h2>;
//       return <h2>{text}</h2>;
//   } else if (text.startsWith('[h3]')) {
//       // return <h3>{text.slice(4)}</h3>;
//       return <h3>{text}</h3>;
//   } else {
//       return <>{text}</>;
//   }
// };

// function producePropList(myTableView: RowPage[], selection: "Tags") {
//   const propNames: Array<keyof RowPage> = ["Tags"];
//   if (propNames.includes(selection)) {
//     const singleListOfThePropRaw = myTableView.reduce<string[]>(
//       (accumulator, row) => {
//         if (row[selection] && Array.isArray(row[selection])) {
//           return [...accumulator, ...row[selection]];
//         }
//         return accumulator;
//       },
//       []
//     );

//     const singleListOfTheProp = [...new Set(singleListOfThePropRaw)];

//     const propList: Item[] = singleListOfTheProp.map((theProp) => ({
//       value: theProp,
//     }));

//     return propList;
//   } else {
//     // CHQ: Gemini AI created list to store all tags
//     const allCompanies = myTableView.reduce<string[]>((accumulator, row) => {
//       if (row.Tags && Array.isArray(row.Tags)) {
//         return [...accumulator, ...row.Tags];
//       }
//       return accumulator;
//     }, []);

//     const uniqueTags = [...new Set(allCompanies)];

//     const tagList: Item[] = uniqueTags.map((tag) => ({
//       value: tag,
//     }));

//     return tagList;
//   }
// }

// const ResetButton = React.forwardRef(
//   (
//     props: {
//       theFontSize: string;
//       theMinWidth: string;
//       thePadding: string;
//       theMargin: string;
//       theVisibility: boolean;
//       resetFunction: () => void;
//     },
//     ref
//   ) => {
//     // Add ref as the second argument
//     return (
// Modify ResetButton
const ResetButton = React.forwardRef<
  HTMLButtonElement,
  {
    theFontSize: string;
    theMinWidth: string;
    thePadding: string;
    theMargin: string;
    theVisibility: boolean;
    resetFunction: () => void;
  }
>((props, ref) => {
  return (
    <>
      <Button
        onClick={() => props.resetFunction()}
        title="Reset"
        style={{
          fontSize: props.theFontSize,
          minWidth: props.theMinWidth,
          padding: props.thePadding,
          margin: props.theMargin,
          visibility: props.theVisibility ? "visible" : "hidden",
        }}
        ref={ref} // This ref is now typed as HTMLButtonElement
      >
        🔄
      </Button>
    </>
  );
});
const MultiSelectFilterSection = (props: {
  sectionText: string;
  labelText: string;
  theList: Item[];
  otherList: string[];
  handleTheChange: (selection: Item | null) => void;
  filterEnabled: boolean;
  handleToggleFilter: () => void;
  handleReset: () => void;
}) => {
  return (
    <>
      <div className="top-controls">
        <div>
          <Typography>{props.sectionText}</Typography>
          <BasicDownshift
            items={props.theList}
            labelText={props.labelText}
            handlethechange={props.handleTheChange}
          />
        </div>
        <Switch
          checked={props.filterEnabled}
          onChange={props.handleToggleFilter}
        />
        <ResetButton
          theFontSize="18px"
          theMinWidth="auto"
          thePadding="2px"
          theMargin="0px"
          theVisibility={true}
          resetFunction={props.handleReset}
        />
      </div>
      {/*CHQ: added by Gemini AI*/}
      <>{props.otherList.join("||")}</>
    </>
  );
};

const ColumnVisibilityToggles = (props: {
  visibleColumns: ColumnVisibility;
  handleToggleColumn: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const allColumnKeys: Array<keyof ColumnVisibility> = [
    "Name",
    "Source",
    "Tags",
    "PageURL",
    "CreatedTime",
    "EditedTime",
    "CreatedStart",
    "CreatedEnd",
    "PublishedStart",
    "PublishedEnd",
    "Area",
    "Source",
    "Link",
    "Type",
    "Tags",
    "PageURL",
    "pageContent",
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {allColumnKeys.map((colName) => (
        <FormControlLabel
          key={colName}
          control={
            <Switch
              checked={props.visibleColumns[colName]}
              onChange={props.handleToggleColumn}
              name={colName}
            />
          }
          label={colName}
        />
      ))}
    </Box>
  );
};

const ColumnVisibilityControlModal = (props: {
  open: boolean;
  onClose: () => void;
  visibleColumns: ColumnVisibility;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectPreset: (preset: keyof typeof visibilityPresets) => void;
  onReset: () => void;
  presets: Map<string, ColumnVisibility>;
}) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: 800 }, // Responsive width
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Customize Column Visibility
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Apply Preset:</Typography>
          <FormControl fullWidth size="small">
            <Select
              value="" // No initial selection, user chooses from list
              label="Presets"
              onChange={(e) =>
                props.onSelectPreset(
                  e.target.value as keyof typeof visibilityPresets
                )
              }
            >
              <MenuItem value="">
                <em>None (Select Preset)</em>
              </MenuItem>
              {[...props.presets.keys()].map((key) => (
                <MenuItem key={key} value={key}>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}{" "}
                  {/* Format camelCase to readable */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={props.onReset} variant="outlined" sx={{ mt: 1 }}>
            Reset to Default
          </Button>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Toggle Individual Columns:
        </Typography>
        <ColumnVisibilityToggles
          visibleColumns={props.visibleColumns}
          handleToggleColumn={props.onToggle}
        />

        <Button onClick={props.onClose} variant="contained" sx={{ mt: 3 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const FilterControlsSection = (props: {
  filterProps: ReturnType<typeof useTableFilters>["filterProps"];
  filterHandlers: ReturnType<typeof useTableFilters>["filterHandlers"];
  derivedLists: ReturnType<typeof useTableFilters>["derivedLists"];
  tagList: Item[];
}) => {
  return (
    <Box
      sx={{
        mb: 4,
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Table Filters
      </Typography>

      {/* Page Name Filter */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <Typography>Filter by Name:</Typography>
        <Switch
          checked={props.filterProps.isPageFilterEnabled}
          onChange={props.filterHandlers.togglePageFilter}
        />
        {props.filterProps.isPageFilterEnabled && (
          <TextField
            label="Filter Text"
            value={props.filterProps.pageFilterText}
            onChange={(e) =>
              props.filterHandlers.setPageFilterText(e.target.value)
            }
            size="small"
            sx={{ flexGrow: 1 }}
          />
        )}
        <Button
          onClick={props.filterHandlers.resetPageFilters}
          disabled={
            !props.filterProps.isPageFilterEnabled &&
            props.filterProps.pageFilterText === ""
          }
        >
          Reset
        </Button>
      </Box>

      {/* Tag Count Filter */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="tag-count-filter-label">Tag Count</InputLabel>
          <Select
            labelId="tag-count-filter-label"
            id="tag-count-filter"
            value={props.filterProps.tagCountFilter}
            label="Tag Count"
            onChange={props.filterHandlers.handleTagCountChange}
          >
            <MenuItem value="">All</MenuItem>
            {props.derivedLists.tagCountOptions.map(
              (count: string | number) =>
                count !== "" && (
                  <MenuItem key={count} value={count}>
                    {count}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
        <Button
          onClick={props.filterHandlers.resetTagCountFilters}
          disabled={props.filterProps.tagCountFilter === ""}
        >
          Reset
        </Button>
      </Box>

      {/* Tags Filter (Multi-Select) */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <Typography>Filter by Tags:</Typography>
        <Switch
          checked={props.filterProps.isTagFilterEnabled}
          onChange={props.filterHandlers.toggleTagFilter}
        />
        {props.filterProps.isTagFilterEnabled && (
          <BasicDownshift
            items={props.tagList}
            labelText="Select Tags"
            handlethechange={props.filterHandlers.handleTagNameChange}
          />
        )}
        {props.filterProps.tagNameList.length > 0 && (
          <Typography variant="caption" sx={{ ml: 1 }}>
            Selected: {props.filterProps.tagNameList.join(", ")}
          </Typography>
        )}
        <Button
          onClick={props.filterHandlers.resetTagFilters}
          disabled={
            !props.filterProps.isTagFilterEnabled &&
            props.filterProps.tagNameList.length === 0
          }
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

function displayListInBulletPoints(arr: string[] | undefined) {
  if (!arr || arr.length === 0) {
    return "-";
  }
  return (
    <ul
      style={{
        marginLeft: "0px",
        paddingLeft: "2px",
        listStyleType: "none", // To remove default bullets if preferred
      }}
    >
      {arr.map((point, pointIndex) => (
        <li key={pointIndex}>{point}</li>
      ))}
    </ul>
  );
}

function displayURL(theRowURL: string | undefined) {
  return typeof theRowURL === "string" && theRowURL.trim() !== "" ? (
    <Tooltip title={theRowURL}>
      <a href={theRowURL} target="_blank" rel="noopener noreferrer">
        Link
      </a>
    </Tooltip>
  ) : (
    "-"
  );
}

const TableHeaderCells = (props: {
  visibleColumns: ColumnVisibility;
  sortProps: ReturnType<typeof useTableSorting>["sortProps"];
  sortHandlers: ReturnType<typeof useTableSorting>["sortHandlers"];
}) => {
  const allColumnKeys: Array<keyof ColumnVisibility> = [
    "Name",
    "Source",
    "Tags",
    "PageURL",
    "CreatedTime",
    "EditedTime",
    "CreatedStart",
    "CreatedEnd",
    "PublishedStart",
    "PublishedEnd",
    "Area",
    "Source",
    "Link",
    "Type",
    "Tags",
    "PageURL",
    "pageContent",
  ];

  // Modified: Only include truly sortable columns
  const sortableColumns: Partial<
    Record<keyof ColumnVisibility, (direction: "asc" | "desc") => void>
  > = {
    Name: props.sortHandlers.handleNameSort,
    Source: props.sortHandlers.handleSourceSort,
    CreatedTime: props.sortHandlers.handleCreatedTimeSort,
    EditedTime: props.sortHandlers.handleEditedTimeSort,
    CreatedStart: props.sortHandlers.handleNotedTimeSort,
  };

  // Modified: Only include sort directions for truly sortable columns
  const sortDirectionMap: Partial<
    Record<keyof ColumnVisibility, "asc" | "desc" | null>
  > = {
    Name: props.sortProps.sortDirectionName,
    Source: props.sortProps.sortDirectionSource,
    CreatedTime: props.sortProps.sortDirectionCreatedTime,
    EditedTime: props.sortProps.sortDirectionEditedTime,
    CreatedStart: props.sortProps.sortDirectionCreatedTime,
  };

  // Modified: Only include reset handlers for truly sortable columns
  const resetSortHandlerMap: Partial<
    Record<keyof ColumnVisibility, () => void>
  > = {
    Name: props.sortHandlers.resetNameSort,
    Source: props.sortHandlers.resetNotedTimeSort,
    CreatedTime: props.sortHandlers.resetCreatedTimeSort,
    EditedTime: props.sortHandlers.resetEditedTimeSort,
    CreatedStart: props.sortHandlers.resetNotedTimeSort,
  };

  return (
    <TableHead>
      <TableRow>
        {allColumnKeys.map((colName) =>
          props.visibleColumns[colName] ? (
            <TableCell key={colName}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  {colName}
                </Typography>
                {sortableColumns[colName] && ( // This condition now correctly checks if the column is sortable
                  <>
                    <Button
                      onClick={() => sortableColumns[colName]?.("asc")} // Added optional chaining
                      title="Sort Ascending"
                      sx={{
                        minWidth: "auto",
                        p: "2px",
                        visibility:
                          sortDirectionMap[colName] === "asc"
                            ? "hidden"
                            : "visible",
                      }}
                    >
                      ⬆️
                    </Button>
                    <Button
                      onClick={() => sortableColumns[colName]?.("desc")} // Added optional chaining
                      title="Sort Descending"
                      sx={{
                        minWidth: "auto",
                        p: "2px",
                        visibility:
                          sortDirectionMap[colName] === "desc"
                            ? "hidden"
                            : "visible",
                      }}
                    >
                      ⬇️
                    </Button>
                    {sortDirectionMap[colName] && (
                      <Button
                        onClick={resetSortHandlerMap[colName]}
                        title="Reset Sort"
                        sx={{ minWidth: "auto", p: "2px" }}
                      >
                        🔄
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </TableCell>
          ) : null
        )}
      </TableRow>
    </TableHead>
  );
};

const TableBodyRows = (props: {
  data: RowPage[];
  visibleColumns: ColumnVisibility;
}) => {
  const allColumnKeys: Array<keyof ColumnVisibility> = [
    "Name",
    "Source",
    "Tags",
    "PageURL",
    "CreatedTime",
    "EditedTime",
    "CreatedStart",
    "CreatedEnd",
    "PublishedStart",
    "PublishedEnd",
    "Area",
    "Source",
    "Link",
    "Type",
    "Tags",
    "PageURL",
    "pageContent",
  ];

  return (
    <TableBody>
      {props.data.map((row) => (
        <TableRow key={row.myID}>
          {allColumnKeys.map((colName) =>
            props.visibleColumns[colName] ? (
              <TableCell key={colName}>
                {colName === "Name" && row.Name}
                {colName === "Source" && row.Source}
                "Tags", "PageURL", "", "", "PublishedStart", "PublishedEnd",
                "Area", "Source",
                {colName === "CreatedTime" && displayDate(row.CreatedTime)}
                {colName === "EditedTime" && displayDate(row.EditedTime)}
                {/* {colName === "CreatedEnd" && displayDate(row.CreatedEnd)} */}
                {colName === "PublishedStart" &&
                  displayDate(row.PublishedStart)}
                {/* {colName === "PublishedEnd" && displayDate(row.PublishedEnd)} */}
                {colName === "Area" && row.Area}
                {colName === "Source" && row.Source}
                {colName === "Link" && row.Link}
                {colName === "Type" && row.Type}
                {colName === "Tags" && displayListInBulletPoints(row.Tags)}
                {colName === "PageURL" && displayURL(row.PageURL)}
              </TableCell>
            ) : null
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};

const CustomTable = (props: { thePages: Page[] }) => {
  // 1. Data Transformation: Convert Page[] to RowPage[]
  const rawTableData: RowPage[] = useMemo(
    () => mapPagesToCustomTableData(props.thePages),
    [props.thePages]
  );

  // Filter out rows with empty names (as per your original logic)
  const initialTableDataForHooks = rawTableData.filter(
    (row) => row && row.Name && row.Name.trim() !== ""
  );

  // 2. Column Visibility Hook
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const {
    visibleColumns,
    handleToggleColumn,
    setPresetVisibility,
    resetVisibility,
    presets,
  } = useColumnVisibility("default"); // Set initial preset

  // 3. Filtering Hook
  const { filteredData, filterProps, filterHandlers, derivedLists } =
    useTableFilters(initialTableDataForHooks);

  // 4. Sorting Hook
  const { sortedData, sortProps, sortHandlers } = useTableSorting(filteredData);

  // Derive lists for dropdowns based on the currently filtered data
  // These should be passed to FilterControlsSection
  const tagList = useMemo(
    () => producePropList(sortedData, "Tags"),
    [sortedData]
  );
  return (
    <Box sx={{ p: 2 }}>
      {/* Table Controls Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 2,
          alignItems: "flex-start",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setIsColumnModalOpen(true)}
          sx={{ mb: { xs: 2, md: 0 } }}
        >
          Customize Columns
        </Button>

        {/* Filter Controls */}
        <FilterControlsSection
          filterProps={filterProps}
          filterHandlers={filterHandlers}
          derivedLists={derivedLists}
          tagList={tagList}
        />
      </Box>

      {/* Column Visibility Modal */}
      <ColumnVisibilityControlModal
        open={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        visibleColumns={visibleColumns}
        onToggle={handleToggleColumn}
        onSelectPreset={setPresetVisibility}
        onReset={resetVisibility}
        presets={presets}
      />

      {/* Main Table Display */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table stickyHeader aria-label="job application table">
          <TableHeaderCells
            visibleColumns={visibleColumns}
            sortProps={sortProps}
            sortHandlers={sortHandlers}
          />
          <TableBodyRows data={sortedData} visibleColumns={visibleColumns} />
        </Table>
      </TableContainer>

      {/* Optional: MyDataBreakdown */}
      {/* If MyDataBreakdown needs filtered/sorted data, pass `sortedData` */}
      {/* <MyDataBreakdown data={sortedData} /> */}
    </Box>
  );
};

// export { createCustomTableData, MultiSelectFilterSection };
// CHQ: got warning when tried to implement above
// Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.eslint(react-refresh/only-export-components)

export { MultiSelectFilterSection };
export default CustomTable;

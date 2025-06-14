import { useState, useMemo, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  // Modal,
  Box,
  Typography,
  Switch,
  TextField,
  // FormGroup,
  // FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";

import BasicDownshift from "./BasicDropdownList";

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

function createCustomTableData(
  myID: string,
  Name: string,
  Area: string,
  Source: string,
  Link: string,
  Type: string,
  Tags: string[],
  PageURL: string,
  pageContent: string,
  CreatedTime: Date,
  EditedTime: Date,
  CreatedStart: Date,
  CreatedEnd: Date,
  PublishedStart: Date,
  PublishedEnd: Date
) {
  return {
    myID,
    Name,
    Area,
    Source,
    Link,
    Type,
    Tags,
    PageURL,
    pageContent,
    CreatedTime,
    EditedTime,
    CreatedStart,
    CreatedEnd,
    PublishedStart,
    PublishedEnd,
  };
}

function mapPagesToCustomTableData(pages: Page[]) {
  return pages.map((page) =>
    createCustomTableData(
      page.id,
      page.Name,
      page.Area,
      page.Source,
      page.Link,
      page.Type,
      page.Tags,
      page.PageURL,
      page.pageContent,
      page.CreatedTime,
      page.EditedTime,
      page.CreatedStart,
      page.CreatedEnd,
      page.PublishedStart,
      page.PublishedEnd
    )
  );
}

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

function producePropList(myTableView: RowPage[], selection: "Tags") {
  const propNames: Array<keyof RowPage> = ["Tags"];
  if (propNames.includes(selection)) {
    const singleListOfThePropRaw = myTableView.reduce<string[]>(
      (accumulator, row) => {
        if (row[selection] && Array.isArray(row[selection])) {
          return [...accumulator, ...row[selection]];
        }
        return accumulator;
      },
      []
    );

    const singleListOfTheProp = [...new Set(singleListOfThePropRaw)];

    const propList: Item[] = singleListOfTheProp.map((theProp) => ({
      value: theProp,
    }));

    return propList;
  } else {
    // CHQ: Gemini AI created list to store all tags
    const allCompanies = myTableView.reduce<string[]>((accumulator, row) => {
      if (row.Tags && Array.isArray(row.Tags)) {
        return [...accumulator, ...row.Tags];
      }
      return accumulator;
    }, []);

    const uniqueTags = [...new Set(allCompanies)];

    const tagList: Item[] = uniqueTags.map((tag) => ({
      value: tag,
    }));

    return tagList;
  }
}

const PageNameFilterSection = (props: {
  toggleLabel: string;
  isFilteringPages: boolean;
  theFilterText: string;
  handleTheToggleFilter: () => void;
  setTheFilterText: (event: any) => void;
}) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography>{props.toggleLabel}</Typography>
        <Switch
          checked={props.isFilteringPages}
          onChange={props.handleTheToggleFilter}
        />
        {props.isFilteringPages && (
          <>
            <TextField
              label="Filter Text"
              value={props.theFilterText}
              onChange={(e) => props.setTheFilterText(e.target.value)}
              sx={{ ml: 2 }}
            />
          </>
        )}
      </Box>
    </>
  );
};

const TagCountFilterSection = (props: {
  theTagCount: number | "";
  theTagCountOptions: (string | number)[];
  handleTheTagCountChange: (event: SelectChangeEvent<number | "">) => void;
}) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FormControl sx={{ ml: 2, minWidth: 120 }}>
          <InputLabel id="tag-count-filter-label">Tag Count</InputLabel>
          <Select
            labelId="tag-count-filter-label"
            id="tag-count-filter"
            value={props.theTagCount}
            label="Tag Count"
            onChange={props.handleTheTagCountChange}
          >
            {props.theTagCountOptions.map((count: string | number) => (
              <MenuItem key={count === "" ? "all" : count} value={count}>
                {count === "" ? "All" : count}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
const AscendingSortButton = (props: {
  theFontSize: string;
  theMinWidth: string;
  thePadding: string;
  theMargin: string;
  theVisibility: boolean;
  sortFunction: (direction: "asc" | "desc") => void;
}) => {
  return (
    <>
      <Button
        onClick={() => props.sortFunction("asc")}
        title="Ascending"
        style={{
          fontSize: props.theFontSize,
          minWidth: props.theMinWidth,
          padding: props.thePadding,
          margin: props.theMargin,
          visibility: props.theVisibility ? "visible" : "hidden",
        }}
      >
        ⬆️
      </Button>
    </>
  );
};

const DescendingSortButton = (props: {
  theFontSize: string;
  theMinWidth: string;
  thePadding: string;
  theMargin: string;
  theVisibility: boolean;
  sortFunction: (direction: "asc" | "desc") => void;
}) => {
  return (
    <>
      <Button
        onClick={() => props.sortFunction("desc")}
        title="Descending"
        style={{
          fontSize: props.theFontSize,
          minWidth: props.theMinWidth,
          padding: props.thePadding,
          margin: props.theMargin,
          visibility: props.theVisibility ? "visible" : "hidden",
        }}
      >
        ⬇️
      </Button>
    </>
  );
};

const ResetButton = (props: {
  theFontSize: string;
  theMinWidth: string;
  thePadding: string;
  theMargin: string;
  theVisibility: boolean;
  resetFunction: () => void;
}) => {
  return (
    <>
      <Button
        onClick={() => props.resetFunction()}
        // title="Ascending"
        title="Reset"
        style={{
          fontSize: props.theFontSize,
          minWidth: props.theMinWidth,
          padding: props.thePadding,
          margin: props.theMargin,
          visibility: props.theVisibility ? "visible" : "hidden",
        }}
      >
        🔄
      </Button>
    </>
  );
};

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

function filterDataByMultiSelect(
  filterEnabled: boolean,
  propNameList: string[],
  curData: RowPage[],
  selection: "Tags"
) {
  if (filterEnabled && propNameList.length > 0 && propNameList[0] !== "") {
    return curData.filter(
      (row) =>
        row[selection] &&
        propNameList.every((curTag) => row[selection].includes(curTag))
    );
  } else {
    return curData;
  }
}

const CustomTable = (props: { thePages: Page[] }) => {
  const customTableData = mapPagesToCustomTableData(props.thePages);
  // const [tableData, setTableData] = useState(customTableData.filter((row) => row && row.Name && row.Name.trim() !== ''));
  // const [tableView, setTableView] = useState(tableData);
  //   const [filterEnabled, setFilterEnabled] = useState(false);
  //   const [filterText, setFilterText] = useState("");

  const [defaultListOrderNames, setDefaultListOrderNames] = useState<string[]>(
    []
  );

  const [ascendingListOrderNames, setAscendingListOrderNames] = useState<
    string[]
  >([]);
  const [descendingListOrderNames, setDescendingListOrderNames] = useState<
    string[]
  >([]);
  const tableData = customTableData.filter(
    (row) => row && row.Name && row.Name.trim() !== ""
  );
  const tableView = tableData;
  // const [tableView, setTableView] = useState(tableData);

  // CHQ: Gemini AI generated part - for filtering via tag count
  const [tagCountFilter, setTagCountFilter] = useState<number | "">("");
  const uniqueTagCounts = [
    ...new Set(tableData.map((row) => row.Tags.length)),
  ].sort((a, b) => a - b);
  const tagCountOptions = ["", ...uniqueTagCounts];

  const [sortDirectionName, setSortDirectionName] = useState<
    "asc" | "desc" | null
  >(null);

  const [tagNameList, setTagNameList] = useState<Array<string>>([""]);

  const resetTagFilters = () => {
    setTagNameList([]);
  };

  // Update global default lists on initial load and when the data changes
  useEffect(() => {
    setDefaultListOrderNames(tableData.map((item) => item.Name));
    // setDefaultListOrderDateFound(
    //   tableData.map((item) =>
    //     item.DateFound instanceof Date ? item.DateFound.toISOString() : "-"
    //   )
    // );
    // setDefaultListOrderDayPosted(
    //   tableData.map((item) =>
    //     item.DayPosted instanceof Date ? item.DayPosted.toISOString() : "-"
    //   )
    // );
  }, [tableData]);

  const nameSorter = (a: RowPage, b: RowPage) => {
    const nameA = a.Name.toLowerCase();
    const nameB = b.Name.toLowerCase();
    if (nameA < nameB) {
      return sortDirectionName === "asc" ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortDirectionName === "asc" ? 1 : -1;
    }
    return 0;
  };

  const resetNameSort = () => {
    setSortDirectionName(null);
    setAscendingListOrderNames([]);
    setDescendingListOrderNames([]);
  };

  const [pageFilterEnabled, setPageFilterEnabled] = useState(false);
  const [pageFilterText, setPageFilterText] = useState("");

  const [tagfilterEnabled, setTagfilterEnabled] = useState(false);

  function displayDate(curDate: Date) {
    return (
      <>
        {/** CHQ: generated by Gemini AI */}
        {curDate instanceof Date
          ? curDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long", // Use 'long' for the full month name
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : curDate
          ? // Attempt to parse the string into a Date object
            new Date(curDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long", // Use 'long' for the full month name
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "-"}
      </>
    );
  }

  function displayListInBulletPoints(arr: string[]) {
    return (
      <ul
        style={{
          marginLeft: "0px",
          paddingLeft: "2px",
        }}
      >
        {arr.map((point, pointIndex) => (
          <li key={pointIndex}>{point}</li>
        ))}
      </ul>
    );
  }

  function displayURL(theRowURL: string) {
    return typeof theRowURL === "string" ? (
      <a href={theRowURL} target="_blank" rel="noopener noreferrer">
        {theRowURL}
      </a>
    ) : (
      "-" // Or some other fallback, like '-' or JSON.stringify(row.PostingURL) for debugging
    );
  }

  const handlePageFilterToggle = () => {
    setPageFilterEnabled(!pageFilterEnabled);
    setPageFilterText(""); // Clear filter text when toggling off
  };

  // CHQ: added by Gemini AI to enable text field which handles filtering
  //   const handleToggleFilter = () => {
  //     setFilterEnabled(!filterEnabled);
  //     setFilterText(""); // Clear filter text when toggling off
  //   };

  const handleTagFilterToggle = () => {
    setTagfilterEnabled(!tagfilterEnabled);
    // setTagFilterText(""); // Clear filter text when toggling off
    // tableView will be updated in the useEffect hook
  };

  const handleTagCountChange = (event: SelectChangeEvent<number | "">) => {
    setTagCountFilter(event.target.value as number | "");
  };

  const handleNameSort = (direction: "asc" | "desc") => {
    setSortDirectionName(direction);
  };

  const filteredTableData = useMemo(() => {
    let currentFilteredData = tableData.filter((row: RowPage) => {
      const nameMatch =
        !pageFilterEnabled ||
        row.Name.toLowerCase().includes(pageFilterText.toLowerCase());
      const tagCountMatch =
        tagCountFilter === "" || row.Tags.length === tagCountFilter;
      return nameMatch && tagCountMatch;
    });

    currentFilteredData = filterDataByMultiSelect(
      tagfilterEnabled,
      tagNameList,
      currentFilteredData,
      "Tags"
    );

    return currentFilteredData;
  }, [
    tableData,
    pageFilterEnabled,
    pageFilterText,
    tagCountFilter,
    tagfilterEnabled,
    tagNameList,
  ]);

  const sortedTableData = useMemo(() => {
    let sortedData = [...filteredTableData];

    if (sortDirectionName) {
      sortedData.sort(nameSorter);
    }
    // else if (sortDirectionDateFound) {
    //   sortedData.sort(dateFoundSorter);
    // } else if (sortDirectionDayPosted) {
    //   sortedData.sort(dayPostedSorter);
    // }

    return sortedData;
  }, [
    filteredTableData,
    sortDirectionName,
    // sortDirectionDateFound,
    // sortDirectionDayPosted,
  ]);

  // CHQ: defaultSort boolean checks added by GeminiAI
  const isNameDefaultSort =
    sortDirectionName === null ||
    (sortDirectionName === "asc" &&
      JSON.stringify(ascendingListOrderNames) ===
        JSON.stringify(defaultListOrderNames)) ||
    (sortDirectionName === "desc" &&
      JSON.stringify(descendingListOrderNames) ===
        JSON.stringify(defaultListOrderNames));

  const tagList = producePropList(sortedTableData, "Tags");
  //   const [choiceIndex, setChoiceIndex] = useState<number>(0);

  //   useEffect(() => {
  //     setVisibleColumns(
  //       visibilitySettings.get(visibilitySettingChoices[choiceIndex]) ||
  //         defaultColumnVisibility
  //     );
  //   }, [choiceIndex]);

  const handleChangeTag = (selection: Item | null) => {
    alert(selection ? `You selected ${selection.value}` : "Selection Cleared");

    const newVal = selection ? selection.value : "";

    setTagNameList((prevList) => {
      if (prevList.length === 1) {
        if (prevList[0] === "") {
          return [newVal];
        }
      }

      return prevList.concat(newVal);
    });
  };

  return (
    <>
      <MultiSelectFilterSection
        sectionText={"Filter tags:"}
        labelText={"Enter a tag name: "}
        theList={tagList}
        otherList={tagNameList}
        handleTheChange={handleChangeTag}
        filterEnabled={tagfilterEnabled}
        handleToggleFilter={handleTagFilterToggle}
        handleReset={resetTagFilters}
      />
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <PageNameFilterSection
          toggleLabel={"Filter Page Content:"}
          isFilteringPages={pageFilterEnabled}
          theFilterText={pageFilterText}
          handleTheToggleFilter={handlePageFilterToggle}
          setTheFilterText={setPageFilterText}
        />
        <TagCountFilterSection
          theTagCount={tagCountFilter}
          theTagCountOptions={tagCountOptions}
          handleTheTagCountChange={handleTagCountChange}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, tableLayout: "fixed" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left" width={"2%"}>
                #
              </TableCell>
              <TableCell
                align="left"
                style={{
                  width: "7.5%",
                  overflowWrap: "break-word",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Name
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      ml: 1,
                    }}
                  >
                    <AscendingSortButton
                      theFontSize="8px"
                      theMinWidth="auto"
                      thePadding="2px"
                      theMargin="0px"
                      theVisibility={true}
                      sortFunction={handleNameSort}
                    />
                    <DescendingSortButton
                      theFontSize="8px"
                      theMinWidth="auto"
                      thePadding="2px"
                      theMargin="0px"
                      theVisibility={true}
                      sortFunction={handleNameSort}
                    />
                  </Box>
                  {/* CHQ: Tooltip popup added by GeminiAI */}
                  <Tooltip
                    title={"bro"}
                    // title={isNameDefaultSort ? "Sort is the default state" : ""}
                    placement="left"
                    arrow
                    open={
                      isNameDefaultSort &&
                      (sortDirectionName === "asc" ||
                        sortDirectionName === "desc")
                    }
                  >
                    <ResetButton
                      theFontSize="8px"
                      theMinWidth="auto"
                      thePadding="0px"
                      theMargin="0px"
                      theVisibility={!isNameDefaultSort}
                      resetFunction={resetNameSort}
                    />
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell align="left" width={"4%"}>
                Source
              </TableCell>
              <TableCell align="left" width={"4%"}>
                Created Time
              </TableCell>
              <TableCell align="left" width={"4%"}>
                Edited Time
              </TableCell>
              <TableCell
                className="link-column"
                align="left"
                style={{
                  width: "5%",
                  overflowWrap: "break-word",
                }}
              >
                Link
              </TableCell>
              <TableCell align="left" width={"4%"}>
                Type
              </TableCell>

              <TableCell
                className="tags-column"
                align="left"
                style={{
                  width: "10%",
                  overflowWrap: "break-word",
                }}
              >
                Tags
              </TableCell>

              <TableCell
                className="notion-column"
                align="left"
                style={{
                  width: "5%",
                  overflowWrap: "break-word",
                }}
              >
                Notion Page URL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableView.map((row, index) =>
              row && row.Name ? (
                <TableRow
                  key={row.Name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>

                  <TableCell align="left">{row.Source}</TableCell>
                  <TableCell align="left">
                    {displayDate(row.CreatedTime)}
                  </TableCell>
                  <TableCell align="left">
                    {displayDate(row.EditedTime)}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      overflowWrap: "break-word",
                    }}
                  >
                    {displayURL(row.Link)}
                  </TableCell>
                  <TableCell align="left">{row.Type}</TableCell>
                  <TableCell align="left">
                    {displayListInBulletPoints(row.Tags)}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "128px",
                      overflowWrap: "break-word",
                    }}
                  >
                    {displayURL(row.PageURL)}
                  </TableCell>
                  {/* <TableCell align="left">
                                      <Button variant="contained" onClick={() => handleButtonClick(row.myID, index)}>
                                          Fetch Content
                                      </Button>
                                  </TableCell> */}
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;

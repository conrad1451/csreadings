// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState } from "react";

interface Page {
  name: string;
  tags: string[];
}

function createCustomTableData(name: string, tags: string[]) {
  return { name, tags };
}

function mapPagesToCustomTableData(pages: Page[]) {
  return pages.map((page) => createCustomTableData(page.name, page.tags));
}


 
function getSlice(mainStr, start, end){
  if (typeof mainStr !== 'string' || typeof start !== 'number' || typeof end !== 'number') {
    return ""; // Handle invalid input types
  }
    return mainStr.slice(start, end);
}
 
function getSubstring(mainString, startIndex, endIndex) {
/**
 * Extracts a substring from a given string.
 *
 * @param {string} mainString - The original string.
 * @param {number} startIndex - The starting index of the substring (inclusive).
 * @param {number} endIndex - The ending index of the substring (exclusive).
 * @returns {string} - The extracted substring, or an empty string if indices are invalid.
 */

if (typeof mainString !== 'string' || typeof startIndex !== 'number' || typeof endIndex !== 'number') {
  return ""; // Handle invalid input types
}

if (startIndex < 0) {
  startIndex = 0; // Correct negative start index
}

if (endIndex < 0) {
  endIndex = 0; // Correct negative end index
}

if (startIndex >= mainString.length) {
  return ""; // Start index out of bounds
}

if (endIndex > mainString.length) {
  endIndex = mainString.length; // Correct end index out of bounds
}

if (startIndex >= endIndex) {
  return ""; // Start index must be less than end index
}

return mainString.substring(startIndex, endIndex);
}

function substringInArray(stringArray, substring) {
  /**
   * Checks if a substring exists within any of the strings in an array.
   *
   * @param {string[]} stringArray - The array of strings to search within.
   * @param {string} substring - The substring to search for.
   * @returns {boolean} - True if the substring is found in any string, false otherwise.
   */

  if (!Array.isArray(stringArray) || typeof substring !== 'string') {
    return false; // Handle invalid input
  }

  for (let i = 0; i < stringArray.length; i++) {
    if (typeof stringArray[i] === 'string' && stringArray[i].includes(substring)) {
      return true; // Substring found!
    }
  }

  return false; // Substring not found in any string
}

function filterObjectsBySubstring(theRows: any, substring:string) {
  /**
   * Filters an array of objects based on whether any string in their 'stringArray' property
   * contains a given substring.
   *
   * @param {object[]} objects - An array of objects, each containing a 'stringArray' property (string[]).
   * @param {string} substring - The substring to search for.
   * @returns {object[]} - An array of objects that meet the filter criteria.
   */

  if (!Array.isArray(theRows) || typeof substring !== 'string') {
    return []; // Handle invalid input
  }


  // I do not understand why the filter failed
  return theRows.filter(row => {
    if (row  && row.tags)
      { return row.tags.some((str:string) => typeof str === 'string' && str.includes(substring)); }
    return false; // Object or stringArray is invalid, so filter it out.
  });

  return theRows;
}

const CustomTable = (props: { thePages: Page[] }) => {
  const customTableData = mapPagesToCustomTableData(props.thePages);
  const [curPage, setCurPage] = useState(0);
// gemini
  const [tableData, setTableData] = useState(customTableData.filter((row) => row && row.name && row.name.trim() !== "")); // initialize table data with initial filtered data.

  function concatenateArrayToString(arr: string[]): string {
    return arr.reduce((accumulator, currentValue) => accumulator + (currentValue + " || "), "");
  }
  const numOptions = 4;
  
  const handlePageChange = (event: any) => {
    event.preventDefault();
    const newPage = (curPage + 1) % numOptions;
    setCurPage(newPage);
    setTableData(filterChoice(newPage)); //Gemini
  };
  
  const filterChoice = ( theSelection: number) => {
    switch (theSelection) {
      case 0:
        return filteredData;
       case 1:
        // return  filteredData.filter((row) => row && row.tags.filter((tag) => tag.search("Codesandbox")));
        // return filterObjectsBySubstring(filteredData, "codesandbox");
        return filteredData.filter((row) => row.tags.some((str:string) => typeof str === 'string' && str.includes("Potential Resource")));
  
      case 2:
        // return  filteredData.filter((row) => row && row.tags.filter((tag) => tag.search("flask")));
        // return filteredData.filter((_, index) => index % 5 === 0); // CHQ: this works, nice
        return filteredData.filter((row) => row.tags.some((str:string) => typeof str === 'string' && str.includes("ReactJS")));
 
      case 3:
        // return  filteredData.filter((row) => row && row.tags.filter((tag) => tag.search("flask")));
        // return filteredData.filter((_, index) => index % 5 === 0); // CHQ: this works, nice
        return filteredData.filter((row) => row.tags.some((str:string) => typeof str === 'string' && str.includes("FreeCodeCamp"))); 

      default:
        // return  filteredData.filter((row) => row && row.tags.filter((tag) => tag.search("bye")));
        return filteredData;
     }
  }

  // Filter out rows with blank names
  const filteredData = customTableData.filter((row) => row && row.name && row.name.trim() !== "");

  const filterList = ["All", "Potential Resource", "ReactJS", "FreeCodeCamp"];
  return (
    <>
     <button type="submit" onClick={handlePageChange}>
      Current View: {filterList[curPage]}
    </button>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              row && row.name ? ( // Safety Check
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{concatenateArrayToString(row.tags)}</TableCell>
                </TableRow>
              ) : null // or return a placeholder row
            ))}
          </TableBody>
        </Table>
      </TableContainer>;

    </>
  );
};

export default CustomTable;
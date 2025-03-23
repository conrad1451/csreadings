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
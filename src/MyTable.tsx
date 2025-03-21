import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  function concatenateArrayToString(arr: string[]): string {
    return arr.reduce((accumulator, currentValue) => accumulator + (currentValue + " || "), "");
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customTableData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{concatenateArrayToString(row.tags)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { CustomTable };
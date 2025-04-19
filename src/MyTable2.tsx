import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; 
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

interface Page {
  id: string;
  Name: string;
  Area: string;
  Source: string;
  Link: string;
  Type: string;
  Tags: string[];
  PageURL: string;
  pageContent: string;
}

function createCustomTableData(myID: string, Name: string, Area: string, Source: string, Link: string, Type: string, Tags: string[], PageURL: string, pageContent: string) {
  return { myID, Name, Area, Source, Link, Type, Tags, PageURL, pageContent };
}

function mapPagesToCustomTableData(pages: Page[]) {
  return pages.map((page) => createCustomTableData(page.id, page.Name, page.Area, page.Source, page.Link, page.Type, page.Tags, page.PageURL, page.pageContent));
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

const CustomTable = (props: { thePages: Page[]; setPages: React.Dispatch<React.SetStateAction<Page[]>> }) => {
  const customTableData = mapPagesToCustomTableData(props.thePages);
  const [tableData, setTableData] = useState(customTableData.filter((row) => row && row.Name && row.Name.trim() !== ''));
  const [filterEnabled, setFilterEnabled] = useState(false); // CHQ: added by Gemini AI to enable filter text field
  const [filterText, setFilterText] = useState(''); // CHQ: added by Gemini AI to enable filter text field

  // function concatenateArrayToString(arr: string[] | undefined | null): string {
  //   if (Array.isArray(arr)) {
  //     return arr.reduce((accumulator, currentValue) => accumulator + (currentValue + ' || '), '');
  //   } else {
  //     return '';
  //   }
  // }

  // function displayListInBulletPoints(arr:string[] | undefined | null): string
  function displayListInBulletPoints(arr:string[])
  {
    return(
      <>
      <ul
        // style={{
        //   width: '250px',
        //   overflowWrap: 'break-word' 
        // }}
        >
        {/* error when paramter type is (arr:string[] | undefined | null) */}
        {/* 'arr' is possibly 'null' or 'undefined'.ts(18049) */}
        {arr.map((point, pointIndex) => (
          <li key={pointIndex}>{point}</li>
        ))}
      </ul> {/* End of the unordered list */}
      </> 
    )
  }

    // CHQ: added by Gemini AI to enable text field which handles filtering
  const handleFilter = () => {
    const filteredData = customTableData.filter((row) =>
      row.pageContent && row.pageContent.toLowerCase().includes(filterText.toLowerCase())
    );
    setTableData(filteredData);
  };

    // CHQ: added by Gemini AI to enable text field which handles filtering
  const handleToggleFilter = () => {
    // setFilterEnabled(!filterEnabled);
    setFilterEnabled(false);
    if (!filterEnabled) {
      setTableData(customTableData.filter((row) => row && row.Name && row.Name.trim() !== ''));
    }
  };
 
  return (
    <>
     {/*CHQ: added by Gemini AI*/} 
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography>(Filter Toggle is disabled until further notice)</Typography>
          {/* <Typography>Filter Page Content:</Typography> */}
          <Switch checked={filterEnabled} onChange={handleToggleFilter} />
          {filterEnabled && (
              <>
                  <TextField
                      label="Filter Text"
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      sx={{ ml: 2 }}
                  />
                  <Button variant="contained" onClick={handleFilter} sx={{ ml: 1 }}>
                      Filter
                  </Button>
              </>
          )}
      </Box>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell align="left" width={'2.5%'}>#</TableCell>
                      <TableCell align="left"
                          style={{
                              width: '15%',
                              overflowWrap: 'break-word',
                          }}
                      >
                          Name
                      </TableCell>
                      <TableCell align="left" width={'5%'}>Area</TableCell>
                      <TableCell align="left" width={'5%'}>Source</TableCell>
                      <TableCell className="link-column" align="left"
                          style={{
                              width: '5%',
                              overflowWrap: 'break-word',
                          }}
                      >
                          Link
                      </TableCell>
                      <TableCell align="left" width={'2.5%'}>Type</TableCell>
                      <TableCell className="tags-column" align="left"
                          style={{
                              width: '15%',
                              overflowWrap: 'break-word',
                          }}
                      >
                          Tags</TableCell>
                      <TableCell className="notion-column" align="left"
                          style={{
                              width: '5%',
                              overflowWrap: 'break-word',
                          }}
                      >
                          Notion Page URL</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {tableData.map((row, index) =>
                      row && row.Name ? (
                          <TableRow key={row.Name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">
                                  {index + 1}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  {row.Name}
                              </TableCell>
                              <TableCell align="left">{row.Area}</TableCell>
                              <TableCell align="left">{row.Source}</TableCell>
                              <TableCell align="left"
                                  style={{
                                      overflowWrap: 'break-word',
                                  }}
                              >
                                  <a href={row.Link} target="_blank" rel="noopener noreferrer">
                                      {row.Link}
                                  </a>
                              </TableCell>
                              <TableCell align="left">{row.Type}</TableCell>
                              <TableCell align="left"> 
                                  {displayListInBulletPoints(row.Tags)}
                              </TableCell>
                              <TableCell align="left"
                                  style={{
                                      width: '128px',
                                      overflowWrap: 'break-word',
                                  }}
                              >
                                  <a href={row.PageURL} target="_blank" rel="noopener noreferrer">
                                      {row.PageURL}
                                  </a>
                              </TableCell>
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
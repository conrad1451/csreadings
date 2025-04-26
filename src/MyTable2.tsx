import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button'; 
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
    PublishedEnd: Date,      
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
      PublishedEnd 
    };
  }
  
  function mapPagesToCustomTableData(pages: Page[]) {
    return pages.map((page) => createCustomTableData(
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
      page.PublishedEnd))
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

const CustomTable = (props: { thePages: Page[] }) => {
    const customTableData = mapPagesToCustomTableData(props.thePages);
    // const [tableData, setTableData] = useState(customTableData.filter((row) => row && row.Name && row.Name.trim() !== ''));
    // const [tableView, setTableView] = useState(tableData);
    const [filterEnabled, setFilterEnabled] = useState(false);
    const [filterText, setFilterText] = useState('');
  
  
    const tableData = customTableData.filter((row) => row && row.Name && row.Name.trim() !== '');
    const tableView = tableData;
    // const [tableView, setTableView] = useState(tableData);
  
    // CHQ: Gemini AI generated part - for filtering via tag count
    const [tagCountFilter, setTagCountFilter] = useState<number | ''>('');
    const uniqueTagCounts = [...new Set(tableData.map(row => row.Tags.length))].sort((a, b) => a - b);
    const tagCountOptions = ['', ...uniqueTagCounts];
    
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
      const handleToggleFilter = () => {
        setFilterEnabled(!filterEnabled);
        setFilterText(''); // Clear filter text when toggling off
    };
  
    const handleTagCountChange = (event: SelectChangeEvent<number | ''>) => {
      setTagCountFilter(event.target.value as number | '');
    };
  
    return (
      <>
          {/*CHQ: added by Gemini AI*/}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography>Filter Page Content:</Typography>
              <Switch checked={filterEnabled} onChange={handleToggleFilter} />
              {filterEnabled && (
                  <>
                      <TextField
                          label="Filter Text"
                          value={filterText}
                          onChange={(e) => setFilterText(e.target.value)}
                          sx={{ ml: 2 }}
                      /> 
                  </>
              )}
  
              <FormControl sx={{ ml: 2, minWidth: 120 }}>
                  <InputLabel id="tag-count-filter-label">Tag Count</InputLabel>
                  <Select
                      labelId="tag-count-filter-label"
                      id="tag-count-filter"
                      value={tagCountFilter}
                      label="Tag Count"
                      onChange={handleTagCountChange}
                  >
                      {tagCountOptions.map((count) => (
                          <MenuItem key={count === '' ? 'all' : count} value={count}>
                              {count === '' ? 'All' : count}
                          </MenuItem>
                      ))}
                  </Select>
              </FormControl>
          </Box>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell align="left" width={'2%'}>#</TableCell>
                          <TableCell align="left"
                              style={{
                                  width: '7.5%',
                                  overflowWrap: 'break-word',
                              }}
                          >
                              Name
                          </TableCell>
                          <TableCell align="left" width={'4%'}>Source</TableCell>
                          <TableCell align="left" width={'4%'}>Created Time</TableCell>
                          <TableCell align="left" width={'4%'}>Edited Time</TableCell>
                          <TableCell className="link-column" align="left"
                            style={{
                                width: '5%',
                                overflowWrap: 'break-word',
                            }}>
                                Link
                          </TableCell>
                          <TableCell align="left" width={'4%'}>Type</TableCell>

                          <TableCell className="tags-column" align="left"
                              style={{
                                  width: '10%',
                                  overflowWrap: 'break-word',
                              }}
                          >
                              Tags
                          </TableCell>
 
                          <TableCell className="notion-column" align="left"
                                style={{
                                    width: '5%',
                                    overflowWrap: 'break-word',
                                }}
                                >
                                    Notion Page URL
                          </TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {tableView.map((row, index) =>
                          row && row.Name ? (
                              <TableRow key={row.Name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row">
                                      {index + 1}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                      {row.Name}
                                  </TableCell>
                                    
                                  <TableCell align="left">{row.Source}</TableCell>
                                  <TableCell align="left">
                                  {/** CHQ: generated by Gemini AI */}  
                                  {row.CreatedTime instanceof Date ? (
                                      row.CreatedTime.toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long', // Use 'long' for the full month name
                                          day: '2-digit',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          second: '2-digit',
                                      })
                                  ) : row.CreatedTime ? (
                                      // Attempt to parse the string into a Date object
                                      new Date(row.CreatedTime).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long', // Use 'long' for the full month name
                                          day: '2-digit',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          second: '2-digit',
                                      })
                                  ) : (
                                      '-'
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {/** CHQ: generated by Gemini AI */}  
                                  {row.EditedTime instanceof Date ? (
                                      row.EditedTime.toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long', // Use 'long' for the full month name
                                          day: '2-digit',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          second: '2-digit',
                                      })
                                  ) : row.EditedTime ? (
                                      // Attempt to parse the string into a Date object
                                      new Date(row.EditedTime).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long', // Use 'long' for the full month name
                                          day: '2-digit',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          second: '2-digit',
                                      })
                                  ) : (
                                      '-'
                                  )}
                                </TableCell>
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
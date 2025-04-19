import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; 
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
// import { Fragment } from 'react'; // Import Fragment

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
  const [modalOpen, setModalOpen] = useState(false);   // CHQ: added by Gemini AI to enable modal appearance
  const [modalContent, setModalContent] = useState('');   // CHQ: added by Gemini AI to enable setting modal content
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

  const handleCloseModal = () => {
    setModalOpen(false);
  };

    // CHQ: added by Gemini AI to enable text field which handles filtering
  const handleFilter = () => {
    const filteredData = customTableData.filter((row) =>
      row.pageContent && row.pageContent.toLowerCase().includes(filterText.toLowerCase())
    );
    setTableData(filteredData);
  };

    // CHQ: added by Gemini AI to enable text field which handles filtering
  const handleToggleFilter = () => {
    setFilterEnabled(!filterEnabled);
    if (!filterEnabled) {
      setTableData(customTableData.filter((row) => row && row.Name && row.Name.trim() !== ''));
    }
  };

  // const renderModalContent0 = (content: string) => {
  //   const parts = content.split(/\[-n-\]/); // Split by the delimiter
  //   return (
  //       <>
  //           {parts.map((part, index) => (
  //               <Fragment key={index}>
  //                 <ElementChoice textLine={part}/>
  //                   {/* {part} */}
  //                   {index < parts.length - 1 && <br />} {/* Add <br> except after the last part */}
  //               </Fragment>
  //           ))}
  //       </>
  //   );
  // };

  const renderModalContent1 = (content: string) => {
    const parts = content.split(/\[-n-\]/); // Split by the delimiter
    return (
      <>
        {parts.map((part, index) => {

          // if(part.includes("[p]")) {
          //   return(
          //     <Typography key={index} variant="h5" component="h5" fontWeight="bold">
          //       {part+"sss"}
          //     </Typography>)
          // } else 
          if(part.includes("[h1]")) { 
            return(
              <Typography key={index} variant="h3" component="h3" fontWeight="bold">
                {part.split("[h1]")}
                {/* dont know why {part.split("[h1]")}[0] didnt work but ok */}
              </Typography>)          
          } else if(part.includes("[h2]")) {
            return(
              <Typography key={index} variant="h4" component="h4" fontWeight="bold">
                {part.split("[h2]")}
                {/* dont know why {part.split("[h2]")}[0] didnt work but ok */}
              </Typography>)
          } else if(part.includes("[h3]")) {
            return(
              <Typography key={index} variant="h5" component="h5" fontWeight="bold">
                {part.split("[h3]")}
               {/* dont know why {part.split("[h3]")}[0] didnt work but ok */}
              </Typography>)
          } else{
            return(
              <Typography key={index} component="p" fontWeight="regular">
                {part.split("[p]")}
                {/* dont know why {part.split("[h3]")}[0] didnt work but ok */}
              </Typography>)
          }
 
        })}
      </>
    );
  };
/**For example, if content was:

"This is a paragraph.[p]This is more text.[h1]This is a heading"

Then, the parts array would be:

["This is a paragraph.", "[p]", "This is more text.", "[h1]", "This is a heading"] */
  
  // const renderModalContent = (content: string) => {
  //   const parts = content.split(/(\[p\]|\[h1\]|\[h2\]|\[h3\])/g);
  //   let firstLine = true;
  //   return (
  //     <>
  //       {parts.map((part, index) => {

  //         if(part.includes("[p]")) {
  //           return <p key={index}>{part.split("[p]")[0]}</p>;
  //         } else if(part.includes("[h1]")) {
  //           return <h1 key={index}>{part.split("[h1]")[0]}</h1>;
  //         } else if(part.includes("[h2]")) {
  //           return(
  //             <Typography key={index} variant="h4" component="h4" fontWeight="bold">
  //              {part}
  //             </Typography>)
  //         } else if(part.includes("[h3]")) {
  //           return(
  //             <Typography key={index} variant="h5" component="h5" fontWeight="bold">
  //              {part.split("[h3]")[0]}
  //             </Typography>)
  //         } else{
  //           return(
  //             <Typography key={index} component="p" fontWeight="regular">
  //               {part}
  //             </Typography>)
  //         }
 
  //       })}
  //     </>
  //   );
  // };

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
      <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50vw',
              height: '80vh',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
          }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                  Page Content
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, flexGrow: 1 }}>
                  {renderModalContent1(modalContent)} {/* Use the new function here */}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button variant="contained" onClick={handleCloseModal}>
                      Close
                  </Button>
              </Box>
          </Box>
      </Modal>
    </>
  );
};

export default CustomTable;
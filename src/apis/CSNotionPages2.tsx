// Source:
// [1]: https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
// [2]: https://refine.dev/blog/material-ui-select-component/ 


import { useEffect, useState } from "react";
import axios from "axios";  
import CustomTable from "../MyTable2";
// const databaseId = process.env.CS_CONTENT;
 
 
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

const ReturnFormat2 = (props: {
  thePages: Page[];
}) => {
  return (
    <div>
      <CustomTable thePages={props.thePages} />
    </div>
  );
};

const CSNotionPages2 = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dataSource = import.meta.env.VITE_TABLE_DATA_SOURCE;
 
  
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(dataSource);
            const theData: Page[] = response.data;
            setPages(theData);

            // CHQ: Gemini AI: Extract all unique tags from the fetched pages
            const tags = new Set<string>();
            theData.forEach(page => {
            page.Tags.forEach(tag => tags.add(tag));
        });
        // setAvailableTags(Array.from(tags));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }

  useEffect(() => {
    fetchData();
  }, []);

//   const handleLeftClick = () => {
//     setChoiceIndex((prevIndex) => {
//       return (prevIndex - 1) % infoChoices.length;
//     });
//   };

//   const handleRightClick = () => {
//     setChoiceIndex((prevIndex) => {
//       return (prevIndex + 1) % infoChoices.length;
//     });
//   };

//   const handleTagChange = (value: string) => {
//     setSelectedTag(value);
//     // Filter pages based on the selected tag.
//     if (value) { // Only filter if a tag is actually selected.  If value is null, show all.
//         const filteredPages = pages.filter(page => page.Tags.includes(value));
//         setPages(filteredPages); // Update the displayed pages
//     }
//     else{
//         fetchData();
//     }
//   };

  // const handleSetTags = (value: string) =>{
  //   setTheTags(value => theTags.concat(value))
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <div className="flex justify-center items-center gap-4 mb-4">
        <Button onClick={handleLeftClick}>Left</Button>
        <h4>{infoChoices[choiceIndex]}</h4>
        <Button onClick={handleRightClick}>Right</Button>
      </div> */}
      <div></div>
      {/* <Select defaultValue="dog">
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
      </Select> */}
      {/* <Button onClick={handleSetTags}>Add to filtering</Button> */}
      <text>Tags included in filtering:</text>
      <ReturnFormat2 thePages={pages} />
    </div>
  );
};

export default CSNotionPages2;
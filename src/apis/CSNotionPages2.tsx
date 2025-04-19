// Source:
// [1]: https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
// [2]: https://refine.dev/blog/material-ui-select-component/ 


import { useEffect, useState } from "react";
import axios from "axios";  
// import {BasicTable, CustomTable} from "../MyTable";
import CustomTable from "../MyTable2";
// const databaseId = process.env.CS_CONTENT;
import Button from '@mui/material/Button';
 
// import Select from "@mui/joy/Select";
// import SelectContent from "@mui/joy/Select";
// import SelectItem from "@mui/joy/Select";
// import SelectTrigger from "@mui/joy/Select";
// import SelectValue from "@mui/joy/Select";

// import Option from "@mui/joy/Option";
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

// const ReturnFormat1 = (props: {thePages: Page[]}) => {
//     return (
//         <div>
//           {props.thePages.map((page) => (
//             <div key={page.name}>
//               <p>
//                 {"Name -->"} {page.name}:
//               </p>
//               <p>
//                 {"Tags --> "}
//                 {page.tags.map((tag) => (
//                   <span key={tag}>
//                     {tag + " || "}
//                   </span>
//                 ))}
//               </p>
//               <br />
//               <br />
//             </div>
//           ))}
//         </div>
//     );
// }

const ReturnFormat2 = (props: {
  thePages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
}) => {
  return (
    <div>
      <CustomTable thePages={props.thePages} setPages={props.setPages} />
    </div>
  );
};

const CSNotionPages2 = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dataSource = import.meta.env.VITE_CAREER_SOURCE;
  const infoChoices = [
    "/interviews",
    "/kristenamy",
    "/bonnie",
    "/bernadette",
    "/mikepeditto",
    "/careeradjacent",
    "/onetag",
    "/twotags", 
    "/threetags"
  ];
  const [choiceIndex, setChoiceIndex] = useState<number>(infoChoices.length - 2); // Start at "/careeradjacent"
  // const [selectedTag, setSelectedTag] = useState<string | null>(null); // State for selected tag
  // const [availableTags, setAvailableTags] = useState<string[]>([]);

  // const [theTags, setTheTags] = useState<string[]>([]);
  
    const fetchData = async (index: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(dataSource + infoChoices[index]);
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
    fetchData(choiceIndex);
  }, [choiceIndex]);

  const handleLeftClick = () => {
    setChoiceIndex((prevIndex) => {
      return (prevIndex - 1) % infoChoices.length;
    });
  };

  const handleRightClick = () => {
    setChoiceIndex((prevIndex) => {
      return (prevIndex + 1) % infoChoices.length;
    });
  };

  // const handleTagChange = (value: string) => {
  //   setSelectedTag(value);
  //   // Filter pages based on the selected tag.
  //   if (value) { // Only filter if a tag is actually selected.  If value is null, show all.
  //       const filteredPages = pages.filter(page => page.Tags.includes(value));
  //       setPages(filteredPages); // Update the displayed pages
  //   }
  //   else{
  //       fetchData(choiceIndex);
  //   }
  // };

  // const handleSetTags = (value: string) =>{
  //   setTheTags(value => theTags.concat(value))
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center items-center gap-4 mb-4">
        <Button onClick={handleLeftClick}>Left</Button>
        <h4>{infoChoices[choiceIndex]}</h4>
        <Button onClick={handleRightClick}>Right</Button>
      </div>
      <div></div>
      {/* <Select defaultValue="dog">
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
      </Select> */}
      {/* <Button onClick={handleSetTags}>Add to filtering</Button> */}
      <text>Tags included in filtering:</text>
      <ReturnFormat2 thePages={pages} setPages={setPages} />
    </div>
  );
};

export default CSNotionPages2;
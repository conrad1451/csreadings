// CSNotionPages2.tsx

// Source:
// [1]: https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
// [2]: https://refine.dev/blog/material-ui-select-component/

import { useEffect, useState } from "react";
import CustomTable from "../MyTable2";
// const databaseId = process.env.CS_CONTENT;

import { Page } from "../utils/dataTypes";

const ReturnFormat2 = (props: { thePages: Page[] }) => {
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
      const response = await fetch(dataSource);
      if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
      }
      const theData: Page[] = await response.json();
      setPages(theData);
      // CHQ: Gemini AI: Extract all unique tags from the fetched pages
      const tags = new Set<string>();
      theData.forEach((page) => {
        page.Tags.forEach((tag) => tags.add(tag));
      });
      // setAvailableTags(Array.from(tags));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

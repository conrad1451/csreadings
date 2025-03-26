// Source:
// [1]: https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/

import { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../MyTable";

interface Page {
  name: string;
  tags: string[];
}

const ReturnFormat2 = (props: { thePages: Page[] }) => {
  return (
    <div>
      <CustomTable thePages={props.thePages} />
    </div>
  );
};

const CSNotionPages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const dataSource = import.meta.env.VITE_TABLE_DATA_SOURCE; // Access the env variable

    axios
      .get(dataSource)
      .then((res) => {
        const theData: Page[] = res.data;
        setPages(theData);
        setIsLoading(false); // Set loading to false when data is fetched
        console.log(pages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading message
  }

  return <ReturnFormat2 thePages={pages} />;
};

export default CSNotionPages;
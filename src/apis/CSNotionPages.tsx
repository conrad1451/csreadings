// Source:
// [1]: https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/

import { useEffect, useState } from "react";
import CustomTable from "../MyTable";

import { PageAlt as Page } from "../utils/dataTypes";

const ReturnFormat2 = (props: { thePages: Page[] }) => {
  return (
    <div>
      <CustomTable thePages={props.thePages} />
    </div>
  );
};

const CSNotionPages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const dataSource = import.meta.env.VITE_TABLE_DATA_SOURCE;

    fetch(dataSource)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error, status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Page[]) => {
        setPages(data);
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <ReturnFormat2 thePages={pages} />;
};
export default CSNotionPages;

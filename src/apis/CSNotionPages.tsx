// Source:
// [1]: https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/

import { useEffect, useState } from "react";
import axios from "axios";
// import {BasicTable, CustomTable} from "../MyTable";
import CustomTable from "../MyTable";
// const databaseId = process.env.CS_CONTENT;

interface Page {
  name: string;
  tags: string[];
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

const ReturnFormat2 = (props: {thePages: Page[]}) => {
    return (
        <div>
            <CustomTable thePages={props.thePages}/> 
        </div>
    );
}

const CSNotionPages = () => {
    const [pages, setPages] = useState<Page[]>([]);
  
    useEffect(() => {
      const dataSource = import.meta.env.VITE_TABLE_DATA_SOURCE; // Access the env variable
  
      axios.get(dataSource).then((res) => {
        const theData: Page[] = res.data;
        setPages(theData);
        console.log(pages);
      });
    }, []);

    // return (<ReturnFormat1 thePages={pages}/>);

    return (<ReturnFormat2 thePages={pages}/>);

};
    

export default CSNotionPages;
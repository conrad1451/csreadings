// dataTransforms.ts

export interface Item {
  value: string;
}

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
  // pageContent: string;
}

interface RowPage {
  myID: string;
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
  // pageContent: string;
}
export function createCustomTableData(
  myID: string, // First as per 'targetPage.id'
  Name: string,
  CreatedTime: Date,
  EditedTime: Date,
  CreatedStart: Date,
  CreatedEnd: Date,
  PublishedStart: Date,
  PublishedEnd: Date,
  Area: string,
  Source: string,
  Link: string,
  Type: string,
  Tags: string[],
  PageURL: string
  // pageContent: string
): RowPage {
  return {
    myID,
    Name,
    CreatedTime,
    EditedTime,
    CreatedStart,
    CreatedEnd,
    PublishedStart,
    PublishedEnd,
    Area,
    Source,
    Link,
    Type,
    Tags,
    PageURL,
    // pageContent,
  };
}

// Note: The mapPagesToCustomTableData function (if it exists in your MyTable.tsx)
// will also need to be updated to pass arguments to createCustomTableData in this new order.
// For example:
/**/
export function mapPagesToCustomTableData(pages: Page[]): RowPage[] {
  return pages.map((page) =>
    createCustomTableData(
      page.id,
      page.Name,
      page.CreatedTime,
      page.EditedTime,
      page.CreatedStart,
      page.CreatedEnd,
      page.PublishedStart,
      page.PublishedEnd,
      page.Area,
      page.Source,
      page.Link,
      page.Type,
      page.Tags,
      page.PageURL
      // page.pageContent
    )
  );
}

export function producePropList(
  myTableView: RowPage[],
  selection: keyof RowPage
): Item[] {
  // Helper to determine if the property on RowPage is expected to be an array of strings.
  // This list should be updated if new array-type properties are added to RowPage
  // that need to be processed by this function.
  const isArrayProp = (prop: keyof RowPage) =>
    ["Area", "Source", "Tags"].includes(prop as string);

  // Use reduce to iterate over each row and accumulate all relevant property values
  // into a single flat array of strings.
  const rawList: string[] = myTableView.reduce<string[]>((accumulator, row) => {
    const propValue = row[selection]; // Get the value of the selected property from the current row

    // Check if the property is expected to be an array and if its value is indeed an array.
    if (isArrayProp(selection) && Array.isArray(propValue)) {
      // CHQ: The two lines below determine the text that fills the options for the dropdown list
      // If it's an array, spread its elements into the accumulator.
      // return [...accumulator, ..."propValue"];
      return [...accumulator, ...propValue];
    } else if (
      // If it's not an array property, check if its value is a non-empty string.
      // CHQ: No need to keep single selects out of options that dropdown can select from
      // !isArrayProp(selection) &&
      typeof propValue === "string" &&
      propValue.trim() !== ""
    ) {
      // If it's a valid non-empty string, add it to the accumulator.
      return [...accumulator, propValue];
    }
    // If the value is not a string, or an empty string, or doesn't match the expected type,
    // it's ignored and the accumulator remains unchanged.
    return accumulator;
  }, []);

  // Create a Set from the raw list to automatically filter out duplicate values,
  // then convert it back to an array.
  const uniqueList = [...new Set(rawList)];

  // Map the unique string values into the { value: string } format required by the Item interface.
  const propList: Item[] = uniqueList.map((theProp) => ({
    value: theProp,
  }));

  return propList;
}

// export function producePropList(
//   myTableView: RowPage[],
//   selection: keyof RowPage // Changed from "Tags"

//   // selection: "Tags"
// ): Item[] {
//   // Helper to determine if the property on RowPage is expected to be an array
//   const isArrayProp = (prop: keyof RowPage) =>
//     [
//       "Area",
//       "Source",
//       "Tags",
//       // Add any other array properties from RowPage if they exist
//     ].includes(prop as string); // Cast to string for includes check if needed

//   const rawList: string[] = myTableView.reduce<string[]>((accumulator, row) => {
//     const propValue = row[selection];
//     if (isArrayProp(selection) && Array.isArray(propValue)) {
//       return [...accumulator, ...propValue];
//     } else if (
//       !isArrayProp(selection) &&
//       typeof propValue === "string" &&
//       propValue.trim() !== ""
//     ) {
//       // Handle single string properties like Status or Level
//       return [...accumulator, propValue];
//     }
//     return accumulator;
//   }, []);

//   const uniqueList = [...new Set(rawList)];

//   const propList: Item[] = uniqueList.map((theProp) => ({
//     value: theProp,
//   }));

//   return propList;
// }

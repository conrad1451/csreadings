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
  pageContent: string;
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
  pageContent: string;
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
  PageURL: string,
  pageContent: string
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
    pageContent,
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
      page.PageURL,
      page.pageContent
    )
  );
}

export function producePropList(
  myTableView: RowPage[],
  selection: "Tags"
): Item[] {
  // Helper to determine if the property on RowPage is expected to be an array
  const isArrayProp = (prop: keyof RowPage) =>
    [
      "Tags",
      "Company",
      "Tenure",
      "Setup",
      "State",
      "Duties",
      "Education",
    ].includes(prop);

  const rawList: string[] = myTableView.reduce<string[]>((accumulator, row) => {
    const propValue = row[selection];
    if (isArrayProp(selection) && Array.isArray(propValue)) {
      return [...accumulator, ...propValue];
    } else if (
      !isArrayProp(selection) &&
      typeof propValue === "string" &&
      propValue.trim() !== ""
    ) {
      // Handle single string properties like Status or Level
      return [...accumulator, propValue];
    }
    return accumulator;
  }, []);

  const uniqueList = [...new Set(rawList)];

  const propList: Item[] = uniqueList.map((theProp) => ({
    value: theProp,
  }));

  return propList;
}

// dataTypes.ts

export interface Item {
  value: string;
}

export interface BasicDownshiftProps {
  items: Item[];
  labelText: string;
  handlethechange: (selection: Item | null) => void;
}

export interface Page {
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

export interface PageAlt {
  name: string;
  tags: string[];
}

export interface RowPage {
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

export interface ColumnVisibility {
  myID: boolean;
  Name: boolean;
  CreatedTime: boolean;
  EditedTime: boolean;
  NotedTime: boolean;
  CreatedEnd: boolean;
  PublishedStart: boolean;
  PublishedEnd: boolean;
  Area: boolean;
  Source: boolean;
  Link: boolean;
  Type: boolean;
  Tags: boolean;
  PageURL: boolean;
  // pageContent: boolean;
}

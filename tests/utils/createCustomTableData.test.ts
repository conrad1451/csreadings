// --- tests/utils/createCustomTableData.test.ts ---
// import { createCustomTableData } from "./MyTable";

// import { createCustomTableData } from "../../src/MyTable2";

import { it, expect, describe, afterEach, vi } from "vitest";
// Add the Item interface from your original component
interface Item {
  value: string;
}

// Define the interface for the props that BasicDownshift expects
interface BasicDownshiftProps {
  items: Item[];
  labelText: string;
  handlethechange: (selection: Item | null) => void;
}
interface Page {
  id: string;
  Name: string;
  Status: string;
  Level: string;
  Source: string[];
  DateFound: Date;
  DayPosted: Date;
  ApplicationDeadline: Date;
  DateApplied: Date;
  ExpireDate: Date;
  PostingURL: string;
  Connection: string;
  State: string[];
  Setup: string[];
  Company: string[];
  Education: string[];
  Duties: string[];
  Tags: string[];
  Tenure: string[];
  Location: string;
  PageURL: string;
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

import { createCustomTableData } from "../../src/customDataTable";

// --- Mock Data ---
// Creating a diverse set of mock pages to test various filters and sorts
const mockPages: Page[] = [
  {
    id: "1",
    Name: "Frontend Engineer",
    Status: "Applied",
    Level: "Mid",
    Source: ["LinkedIn", "Indeed"],
    DateFound: new Date("2024-01-10T10:00:00Z"),
    DayPosted: new Date("2024-01-05T09:00:00Z"),
    ApplicationDeadline: new Date("2024-02-01T23:59:59Z"),
    DateApplied: new Date("2024-01-15T11:00:00Z"),
    ExpireDate: new Date("2024-03-01T00:00:00Z"),
    PostingURL: "https://example.com/fe",
    Connection: "John Doe",
    State: ["Remote"],
    Setup: ["Full-time"],
    Company: ["TechCorp"],
    Education: ["Bachelors"],
    Duties: ["Develop UIs", "Collaborate"],
    Tags: ["React", "TypeScript", "Frontend"],
    Tenure: ["Permanent"],
    Location: "Remote",
    PageURL: "https://notion.so/fe1",
  },
  {
    id: "2",
    Name: "Backend Developer",
    Status: "Interview",
    Level: "Senior",
    Source: ["Referral"],
    DateFound: new Date("2024-01-08T14:00:00Z"),
    DayPosted: new Date("2024-01-01T10:00:00Z"),
    ApplicationDeadline: new Date("2024-01-25T23:59:59Z"),
    DateApplied: new Date("2024-01-10T12:00:00Z"),
    ExpireDate: new Date("2024-02-15T00:00:00Z"),
    PostingURL: "https://example.com/be",
    Connection: "Jane Smith",
    State: ["On-site"],
    Setup: ["Full-time"],
    Company: ["InnovateX"],
    Education: ["Masters"],
    Duties: ["Design APIs", "Database management"],
    Tags: ["Node.js", "Python", "Backend", "API"],
    Tenure: ["Contract"],
    Location: "New York, NY",
    PageURL: "https://notion.so/be2",
  },
  {
    id: "3",
    Name: "Data Scientist",
    Status: "Rejected",
    Level: "Junior",
    Source: ["Indeed"],
    DateFound: new Date("2024-01-12T09:00:00Z"),
    DayPosted: new Date("2024-01-07T08:00:00Z"),
    ApplicationDeadline: new Date("2024-02-10T23:59:59Z"),
    DateApplied: new Date("2024-01-18T10:00:00Z"),
    ExpireDate: new Date("2024-03-10T00:00:00Z"),
    PostingURL: "https://example.com/ds",
    Connection: "https://example2.com/qag",
    State: ["Hybrid"],
    Setup: ["Full-time"],
    Company: ["DataFlow"],
    Education: ["PhD"],
    Duties: ["Statistical modeling", "Machine learning"],
    Tags: ["Python", "Machine Learning"],
    Tenure: ["Permanent"],
    Location: "San Francisco, CA",
    PageURL: "https://notion.so/ds3",
  },
  {
    id: "4",
    Name: "QA Engineer",
    Status: "Applied",
    Level: "Mid",
    Source: ["Glassdoor"],
    DateFound: new Date("2024-01-11T13:00:00Z"),
    DayPosted: new Date("2024-01-06T11:00:00Z"),
    ApplicationDeadline: new Date("2024-02-05T23:59:59Z"),
    DateApplied: new Date("2024-01-16T14:00:00Z"),
    ExpireDate: new Date("2024-03-05T00:00:00Z"),
    PostingURL: "https://example.com/qa",
    Connection: "https://example2.com/qag",
    State: ["Remote"],
    Setup: ["Full-time"],
    Company: ["TechCorp"],
    Education: ["Bachelors"],
    Duties: ["Test software", "Automate tests"],
    Tags: ["QA", "Testing", "Automation"],
    Tenure: ["Permanent"],
    Location: "Remote",
    PageURL: "https://notion.so/qa4",
  },
];
describe("createCustomTableData", () => {
  it("should correctly join Source array into a string", () => {
    const rowPage: RowPage = createCustomTableData(
      mockPages[0].id,
      mockPages[0].Name,
      mockPages[0].Status,
      mockPages[0].Level,
      mockPages[0].Source.join(" | "),
      mockPages[0].DateFound,
      mockPages[0].DayPosted,
      mockPages[0].ApplicationDeadline,
      mockPages[0].DateApplied,
      mockPages[0].ExpireDate,
      mockPages[0].PostingURL,
      mockPages[0].Connection,
      mockPages[0].State,
      mockPages[0].Setup,
      mockPages[0].Company
      //   mockPages[0].PageURL
    );
    expect(rowPage.Source).toBe("LinkedIn | Indeed");
  });

  // ... more test cases
});

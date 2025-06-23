export function displayDate(curDate: Date | string | undefined) {
  // Handles Date objects, string dates, and undefined/null values
  let dateObj: Date | null = null;
  if (curDate instanceof Date) {
    dateObj = curDate;
  } else if (typeof curDate === "string") {
    try {
      dateObj = new Date(curDate);
      if (isNaN(dateObj.getTime())) {
        // Check if parsing resulted in an invalid date
        dateObj = null;
      }
    } catch (e) {
      dateObj = null;
    }
  }

  return dateObj && dateObj.getTime() > 0 // Ensure date is valid and not epoch (new Date(0))
    ? dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";
}

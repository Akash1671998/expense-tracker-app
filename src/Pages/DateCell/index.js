import React from "react";

const DateCell = ({ value }) => {
    console.log("???????????????",value)
  try {
    if (!value.createAt) return "—";

    const date = new Date(value.createAt);

    if (isNaN(date.getTime())) return "Invalid Date";

    // Format: YYYY-MM-DD
    const formattedDate = date.toISOString().split("T")[0];

    return <span>{formattedDate}</span>;
  } catch (error) {
    return "Invalid Date";
  }
};

export default DateCell;

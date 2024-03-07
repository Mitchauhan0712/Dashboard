import React from "react";
import { Typography } from "@material-tailwind/react";

export function Footer({ currentDate }) {
  const formattedDate = currentDate
    ? currentDate
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join("-")
    : "N/A";

  return (
    <footer className="  border-t border-blue-gray-50 py-4 text-center md:flex-row md:justify-between">
      <Typography color="blue-gray" className="font-medium text-sm">
        &copy; All Rights Reserved {formattedDate} My Website
      </Typography>
    </footer>
  );
}

// BreadcrumbsWithIcon.js
import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
// import { useLocation } from "react-router-dom";

const breadcrumbMap = {
  dashboard: ["Dashboard"],
  membership: ["Dashboard", "Membership"],
  user: ["Dashboard", "User"],
  settings: ["Dashboard", "Settings"],
};

export function BreadcrumbsWithIcon({ activeComponent }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    setBreadcrumbs(breadcrumbMap[activeComponent] || []);
  }, [activeComponent]);

  return (
    <Breadcrumbs>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>&nbsp; &nbsp;</span>}
          <a href="dashboard" className="opacity-60">
            <span>{crumb}</span>
          </a>
          {index === 0 && <span>&nbsp;&nbsp;</span>}
        </React.Fragment>
      ))}
    </Breadcrumbs>
  );
}

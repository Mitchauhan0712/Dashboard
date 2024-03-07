import React from "react";

import Analytics from "./Analytics";

import Wrapper from "./Wrapper";

const Dashboard = () => {
  return (
    <Wrapper activeComponent="dashboard">
      <Analytics />
    </Wrapper>
  );
};
export default Dashboard;

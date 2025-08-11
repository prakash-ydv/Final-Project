import React from "react";
import NavBar from "../components/NavBar";
import IssueDetail from "../components/IssueDetail";
import IssueMap from "../components/IssueMap";
import UpdateStatus from "../components/UpdateStatus";

function IssuePage() {
  return (
    <>
      <NavBar />

      <IssueDetail />
      <IssueMap />
      <UpdateStatus />
    </>
  );
}

export default IssuePage;

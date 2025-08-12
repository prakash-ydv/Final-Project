import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import IssueDetail from "../components/IssueDetail";
import IssueMap from "../components/IssueMap";
import UpdateStatus from "../components/UpdateStatus";
import { getOneIssue } from "../api/getIssueById";

function IssuePage() {
  const { issueId } = useParams();
  const [issueData, setIssueData] = useState(null);

  useEffect(() => {
    async function fetchIssue() {
      const data = await getOneIssue(issueId);
      if (data.success) {
        setIssueData(data.data);
      } else {
        // handle error or show "not found"
      }
    }
    if (issueId) fetchIssue();
  }, [issueId]);

  if (!issueData) {
    return (
      <>
        <NavBar />
        <p>Loading issue data...</p>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <IssueDetail
        title={issueData.issueTitle}
        status={issueData.issueStatus}
        address={issueData.issueAddress}
        landmark={issueData.landmark}
        image={issueData.imageUrl}
      />
      <IssueMap lat={issueData.issueCoordinates.latitude} lng={issueData.issueCoordinates.longitude} />
      <UpdateStatus issueId={issueId} />
    </>
  );
}

export default IssuePage;

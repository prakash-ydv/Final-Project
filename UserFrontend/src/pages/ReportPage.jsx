import React from "react";
import NavBar from "../components/NavBar";
import ReportIssueForm from "../components/reportPage/ReportIssueForm";
import { useUser } from "../context/UserContext";
import VerifyEmail from "../components/VerifyEmail";

function ReportPage() {
  const { user } = useUser();
  return (
    <div>
      <NavBar />
      {user.isVerified ? <ReportIssueForm /> : <VerifyEmail />}
    </div>
  );
}

export default ReportPage;

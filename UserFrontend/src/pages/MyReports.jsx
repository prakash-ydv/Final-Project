import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import IssueCard from "../components/IssueCard";
import Footer from "../components/Footer";
import { getMyReports } from "../api/issueOperations";
import { useUser } from "../context/UserContext";

function MyReports() {
  const { isLogedIn } = useUser();
  const [reports, setReports] = useState([]);
  const [total, setTotal] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [resolved, setResolved] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyReports();

        if (data?.success && Array.isArray(data.issues)) {
          console.log(data);

          const totalIssues = data.issues.length;
          const inProgressCount = data.issues.filter(
            (issue) => issue.issueStatus === "in-progress"
          ).length;
          const resolvedCount = data.issues.filter(
            (issue) => issue.issueStatus === "resolved"
          ).length;
          const rejectedCount = data.issues.filter(
            (issue) => issue.issueStatus === "rejected"
          ).length;

          setTotal(totalIssues);
          setInProgress(inProgressCount);
          setResolved(resolvedCount);
          setRejected(rejectedCount);
          setReports(data.issues);
        } else {
          console.log("Data not found or success false", data);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }

    if (isLogedIn) {
      fetchData();
    }
  }, [isLogedIn]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 px-5 lg:px-10">
        <div className="mx-auto space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <StatCard title="Total Reports" value={total} color="bg-blue-500" />
            <StatCard
              title="In-Progress"
              value={inProgress}
              color="bg-yellow-500"
            />
            <StatCard title="Resolved" value={resolved} color="bg-green-500" />
            <StatCard title="Rejected" value={rejected} color="bg-red-500" />
          </div>

          {/* Reports List */}
          <div className="bg-white p-5 rounded-xl">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Your Reports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {console.log(reports)}
              {reports.length > 0 ? (
                reports.map((item, index) => (
                  <IssueCard key={index} image={item.imageUrl} title={item.issueTitle} status={item.issueStatus} category={item.issueDepartment} />
                ))
              ) : (
                <p>No reports found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="px-5 lg:px-10 mt-10">
        <Footer />
      </section>
    </>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl text-white shadow-md ${color}`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default MyReports;

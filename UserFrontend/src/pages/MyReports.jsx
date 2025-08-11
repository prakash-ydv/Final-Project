import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import IssueCard from "../components/IssueCard";
import Footer from "../components/Footer";

function MyReports() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Simulated data (Replace with real API calls)
    const fetchData = async () => {
      setUser({
        name: "Golu Kumar",
        email: "golu@example.com",
        phone: "9876543210",
        city: "Bhopal",
      });

      setStats({
        total: 12,
        pending: 4,
        completed: 7,
        rejected: 1,
      });

      setReports([
        {
          title: "Pothole near Sector 7",
          category: "Pothole",
          status: "Pending",
          date: "2025-08-01",
        },
        {
          title: "Overflowing Garbage in Road",
          category: "Garbage",
          status: "Completed",
          date: "2025-07-29",
        },
        {
          title: "Streetlight Not Working",
          category: "Streetlight",
          status: "Rejected",
          date: "2025-07-25",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 px-5 lg:px-10">
        <div className="mx-auto space-y-8">
          {/* Stats Section */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              <StatCard
                title="Total Reports"
                value={stats.total}
                color="bg-blue-500"
              />
              <StatCard
                title="Pending"
                value={stats.pending}
                color="bg-yellow-500"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                color="bg-green-500"
              />
              <StatCard
                title="Rejected"
                value={stats.rejected}
                color="bg-red-500"
              />
            </div>
          )}

          {/* Reports List */}

          <div className="bg-white p-5 rounded-xl ">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Your Reports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <IssueCard />
              <IssueCard />
              <IssueCard />
              <IssueCard />
              <IssueCard />
              <IssueCard />
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

function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default MyReports;

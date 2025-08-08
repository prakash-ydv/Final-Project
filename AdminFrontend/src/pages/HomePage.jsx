import React from "react";
import NavBar from "../components/NavBar";
import HeroCard from "../components/HeroCard";
import {
  ChartColumnIncreasing,
  CircleCheckBig,
  Clock1,
  TriangleAlert,
} from "lucide-react";
import RecentIssueCard from "../components/RecentIssueCard";

function HomePage() {
  const heroDetails = [
    {
      title: "Total Issues",
      number: 124,
      text: "+21 from last month",
      textColor: "blue",
      logo: <ChartColumnIncreasing className="text-blue-500 font-bold" />,
      color: "blue",
    },
    {
      title: "Active Issues",
      number: 58,
      text: "23 urgent, 35 normal",
      textColor: "gray",
      logo: <TriangleAlert className="text-orange-500 font-bold" />,
      color: "orange",
    },
    {
      title: "Resolved Today",
      number: 14,
      text: "Target: 12/day",
      textColor: "green",
      logo: <CircleCheckBig className="text-green-500 font-bold" />,
      color: "green",
    },
    {
      title: "Avg Resolution",
      number: 3.2,
      text: "days",
      textColor: "gray",
      logo: <Clock1 className="text-purple-500 font-bold" />,
      color: "purple",
    },
  ];

  const recentIssues = [
    {
      issueId: "IR-2024-015",
      title: "Water leak on Elm Street",
      priority: "high",
      location: "Elm Street & 3rd Ave",
      category: "Infrastructure",
      timeAgo: "10 minutes ago",
    },
    {
      issueId: "IR-2024-014",
      title: "Damaged stop sign",
      priority: "medium",
      location: "Main St & Oak Ave",
      category: "Traffic",
      timeAgo: "2 hours ago",
    },
    {
      issueId: "IR-2024-013",
      title: "Graffiti on school wall",
      priority: "low",
      location: "Roosevelt Elementary",
      category: "Vandalism",
      timeAgo: "4 hours ago",
    },
  ];

  return (
    <>
      <NavBar />

      {/* Top Stats */}
      <section className="p-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {heroDetails.map((item, index) => (
          <HeroCard
            key={index}
            title={item.title}
            number={item.number}
            text={item.text}
            textColor={item.textColor}
            logo={item.logo}
            color={item.color}
          />
        ))}
      </section>

      {/* Search & Filters */}
      <section className="p-5 lg:px-10 mt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-800">Recent Issues</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search issues..."
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Filter by Status</option>
              <option value="Reported">Reported</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Filter by Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Issues List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mt-4">
          {recentIssues.map((issue, index) => (
            <RecentIssueCard
              key={index}
              issueId={issue.issueId}
              title={issue.title}
              priority={issue.priority}
              location={issue.location}
              category={issue.category}
              timeAgo={issue.timeAgo}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <nav className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
          </nav>
        </div>
      </section>
    </>
  );
}

export default HomePage;

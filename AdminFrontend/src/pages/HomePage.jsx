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
import IssueMap from "../components/IssueMap";

function HomePage() {
  const issues = [
    {
      id: "ISSUE001",
      title: "Water pipe leakage near FC Road",
      description: "Major leakage causing water wastage and road flooding.",
      location: "FC Road, Pune",
      priority: "high",
      status: "In Progress",
      lat: 18.5289,
      lng: 73.8417,
    },
    {
      id: "ISSUE002",
      title: "Streetlight not working",
      description: "Dark area at night, potential safety risk.",
      location: "Kothrud, Pune",
      priority: "medium",
      status: "Reported",
      lat: 18.5074,
      lng: 73.8077,
    },
    {
      id: "ISSUE003",
      title: "Potholes on road",
      description: "Multiple potholes slowing down traffic.",
      location: "Shivaji Nagar, Pune",
      priority: "low",
      status: "Assigned",
      lat: 18.5308,
      lng: 73.8476,
    },
    {
      id: "ISSUE004",
      title: "Overflowing garbage bin",
      description: "Waste overflowing for 3 days, foul smell in area.",
      location: "Camp Area, Pune",
      priority: "medium",
      status: "Resolved",
      lat: 18.5158,
      lng: 73.8762,
    },
    {
      id: "ISSUE005",
      title: "Broken traffic signal",
      description: "Signal not functioning, causing traffic jams.",
      location: "Swargate, Pune",
      priority: "high",
      status: "In Progress",
      lat: 18.501,
      lng: 73.862,
    },
    {
      id: "ISSUE006",
      title: "Drainage blockage",
      description: "Water clogging during rains due to blockage.",
      location: "Aundh, Pune",
      priority: "high",
      status: "Reported",
      lat: 18.5635,
      lng: 73.8077,
    },
    {
      id: "ISSUE007",
      title: "Fallen tree blocking road",
      description: "Tree uprooted due to storm, blocking traffic.",
      location: "Baner, Pune",
      priority: "medium",
      status: "In Progress",
      lat: 18.559,
      lng: 73.7898,
    },
    {
      id: "ISSUE008",
      title: "Open manhole",
      description: "Hazardous open manhole near residential area.",
      location: "Viman Nagar, Pune",
      priority: "high",
      status: "Assigned",
      lat: 18.5669,
      lng: 73.9143,
    },
    {
      id: "ISSUE009",
      title: "Illegal parking causing jams",
      description: "Cars parked in no-parking zone, blocking road.",
      location: "Deccan Gymkhana, Pune",
      priority: "low",
      status: "Resolved",
      lat: 18.5162,
      lng: 73.8415,
    },
    {
      id: "ISSUE010",
      title: "Street flooding after rain",
      description: "Poor drainage causing water to accumulate.",
      location: "Koregaon Park, Pune",
      priority: "medium",
      status: "In Progress",
      lat: 18.5362,
      lng: 73.893,
    },
    {
      id: "ISSUE011",
      title: "Collapsed footpath",
      description: "Damaged footpath posing a risk to pedestrians.",
      location: "Hinjewadi Phase 1, Pune",
      priority: "medium",
      status: "Reported",
      lat: 18.5918,
      lng: 73.7381,
    },
    {
      id: "ISSUE012",
      title: "Garbage burning causing pollution",
      description: "Air pollution due to open garbage burning.",
      location: "Hadapsar, Pune",
      priority: "high",
      status: "Reported",
      lat: 18.5001,
      lng: 73.926,
    },
  ];

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
      {/* map */}
      <section className="flex flex-col p-5 lg:mx-10 rounded-lg overflow-hidden border border-gray-100 shadow-md">
        <h1 className="font-bold text-2xl pb-5">Issue Map</h1>
        <IssueMap issues={issues} />
      </section>

      {/* recent issue */}
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
        <div className="bg-white rounded-lg overflow-hidden mt-4">
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
      </section>
    </>
  );
}

export default HomePage;

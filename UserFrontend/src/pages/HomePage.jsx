import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import HeroStats from "../components/HeroStats";
import HeroIntro from "../components/HeroIntro";
import IssueCard from "../components/IssueCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

function HomePage() {
  const { userLocation } = useUser();
  const [trendingIssues, setTrendingIssues] = useState([
    {
      issueCoordinates: {
        latitude: 16.5975,
        longitude: 74.1005,
      },
      _id: "689a1393e20bf0269b6d4f35",
      issueId: "ISSUE112",
      issueTitle: "garbage roadside",
      issueDepartment: "Garbage",
      reporterName: "Prakash Yadav",
      reporterPhone: 8210918083,
      reporterId: "6899a16d06ec9b0368554466",
      landmark: "near market",
      issueStatus: "pending",
      imageUrl:
        "https://res.cloudinary.com/ddzhczocz/image/upload/v1754928018/uploads/m7rjr5tx0fsuyxjxcpsi.jpg",
      upvotedBy: [],
      comments: [],
      createdAt: "2025-08-11T16:00:19.072Z",
      updatedAt: "2025-08-11T16:00:19.072Z",
      __v: 0,
    },
    {
      issueCoordinates: {
        latitude: 18.4943,
        longitude: 74.01971,
      },
      _id: "689a0d13e20bf0269b6d4f26",
      issueId: "ISSUE112",
      issueTitle: "Garbag in Old Lake",
      issueDepartment: "Garbage",
      reporterName: "Prakash Yadav",
      reporterPhone: 8210918083,
      reporterId: "6899a16d06ec9b0368554466",
      landmark: "Near Old School",
      issueStatus: "pending",
      imageUrl:
        "https://res.cloudinary.com/ddzhczocz/image/upload/v1754926354/uploads/kwp7igzjgupl4tztccaq.webp",
      upvotedBy: [],
      comments: [],
      createdAt: "2025-08-11T15:32:35.370Z",
      updatedAt: "2025-08-11T15:32:35.370Z",
      __v: 0,
    },
    {
      issueCoordinates: {
        latitude: 16.5975,
        longitude: 74.1005,
      },
      _id: "689a0ae9e20bf0269b6d4ef8",
      issueId: "ISSUE112",
      issueTitle: "Garbag Dump",
      issueDepartment: "Garbage",
      reporterName: "Prakash Yadav",
      reporterPhone: 8210918083,
      reporterId: "6899a16d06ec9b0368554466",
      landmark: "near new market",
      issueStatus: "resolved",
      imageUrl:
        "https://res.cloudinary.com/ddzhczocz/image/upload/v1754925801/uploads/ofz4qz8vsfhh1ton3imf.avif",
      upvotedBy: [],
      comments: [],
      createdAt: "2025-08-11T15:23:21.444Z",
      updatedAt: "2025-08-11T15:23:21.444Z",
      __v: 0,
    },
    {
      issueCoordinates: {
        latitude: 18.49423,
        longitude: 74.01965,
      },
      _id: "689a0a94e20bf0269b6d4ef2",
      issueId: "ISSUE112",
      issueTitle: "Illegal Garbage Dump",
      issueDepartment: "Garbage",
      reporterName: "Prakash Yadav",
      reporterPhone: 8210918083,
      reporterId: "6899a16d06ec9b0368554466",
      landmark: "Near Taj Mahal",
      issueStatus: "pending",
      imageUrl:
        "https://res.cloudinary.com/ddzhczocz/image/upload/v1754925716/uploads/b9ucxpas5yzgoqmgtv69.jpg",
      upvotedBy: [],
      comments: [],
      createdAt: "2025-08-11T15:21:56.182Z",
      updatedAt: "2025-08-11T15:21:56.182Z",
      __v: 0,
    },
    {
      issueCoordinates: {
        latitude: 18.49561,
        longitude: 74.02021,
      },
      _id: "6899f7931692573747f4e73f",
      issueId: "ISSUE112",
      issueTitle: "Cracks in Road",
      issueDepartment: "Pothole",
      reporterName: "Prakash Yadav",
      reporterPhone: 8210918083,
      reporterId: "6899a16d06ec9b0368554466",
      landmark: "Near Main Road",
      issueStatus: "pending",
      imageUrl:
        "https://res.cloudinary.com/ddzhczocz/image/upload/v1754920850/uploads/u6xmttnaco84ctl8cr17.jpg",
      upvotedBy: [],
      comments: [],
      createdAt: "2025-08-11T14:00:51.379Z",
      updatedAt: "2025-08-11T14:00:51.379Z",
      __v: 0,
    },
    {
      issueCoordinates: {
        latitude: 18.49561,
        longitude: 74.02021,
      },
      _id: "6899f35c2655dbef77f381be",
      issueId: "ISSUE112",
      issueTitle: 'Garbage"',
      issueDepartment: "Garbage",
      issueDesc: "Garbage in riverSide",
      reporterName: "Prakash Yadav",
      reporterPhone: 8210918083,
      reporterId: "6899a16d06ec9b0368554466",
      issueStatus: "rejected",
      imageUrl:
        "https://res.cloudinary.com/ddzhczocz/image/upload/v1754919772/uploads/rsc183zduk1giiw5nrjh.jpg",
      upvotedBy: [],
      comments: [],
      createdAt: "2025-08-11T13:42:52.720Z",
      updatedAt: "2025-08-11T13:42:52.720Z",
      __v: 0,
    },
    {
      issueCoordinates: {
        latitude: 18.52703,
        longitude: 73.84596,
      },
      issueStatus: "pending",
      _id: "6899db8d8d081abd04e7a066",
      issueId: "ISSUE112",
      issueTitle: "maar pit",
      issueDepartment: "Noise",
      reporterName: "Prakash Yadav",
      reporterPhone: 8210918083,
      reporterId: "6899a16d06ec9b0368554466",
      landmark: "MIT College",
      imageUrl:
        "https://res.cloudinary.com/ddzhczocz/image/upload/v1754913677/uploads/mlfnygqrowi4pvs1hijg.jpg",
      upvotedBy: [],
      comments: [],
      createdAt: "2025-08-11T12:01:17.477Z",
      updatedAt: "2025-08-11T12:01:17.477Z",
      __v: 0,
    },
    {
      issueCoordinates: {
        latitude: 18.49561,
        longitude: 74.02021,
      },
      issueStatus: "pending",
      _id: "6899cf8dbeadbf06d0d8a5db",
      issueId: "ISSUE112",
      issueTitle: "Garbage Dump",
      issueDepartment: "Garbage",
      issueDesc: "Garbage in riverSide",
      reporterName: "Prakash Yadav",
      reporterPhone: 8210918083,
      reporterId: "6899a16d06ec9b0368554466",
      imageUrl:
        "https://res.cloudinary.com/ddzhczocz/image/upload/v1754910604/uploads/taxdcvezljsczij2pkkg.jpg",
      upvotedBy: [],
      comments: [],
      createdAt: "2025-08-11T11:10:05.287Z",
      updatedAt: "2025-08-11T11:10:05.287Z",
      __v: 0,
    },
    {
      issueCoordinates: {
        latitude: 18.49561,
        longitude: 74.02021,
      },
      issueStatus: "pending",
      _id: "6899c1e743ec101fea7c5a9a",
      issueId: "ISSUE112",
      issueTitle: "Garbage Dump",
      issueDepartment: "Garbage",
      issueDesc: "Garbage in riverSide",
      reporterName: "Prakash Yadav",
      reporterPhone: 8210918083,
      reporterId: "6899a16d06ec9b0368554466",
      imageUrl:
        "https://res.cloudinary.com/ddzhczocz/image/upload/v1754907111/uploads/tdr7o9c14i35hk3oaqjw.jpg",
      upvotedBy: [],
      comments: [],
      createdAt: "2025-08-11T10:11:51.971Z",
      updatedAt: "2025-08-11T10:11:51.971Z",
      __v: 0,
    },
  ]);
  useEffect(() => {
    if (!userLocation) return;
    console.log(userLocation);
  }, [userLocation]);

  return (
    <div>
      <NavBar />
      <HeroIntro />
      <HeroStats />

      {/* trendig section */}
      <div className="px-5 md:px-10 mt-10">
        <div className="flex items-center justify-between w-full my-5 ">
          <h1 className="text-2xl font-bold">Trending Issues</h1>
          <Link
            to={"/feed"}
            className="p-1 rounded-lg border border-gray-100 shadow-md text-sm w-22 h-8 flex items-center justify-center roboto"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {trendingIssues?.map((items, index) => (
            <IssueCard key={index} image={items?.imageUrl} title={items.issueTitle} category={items.issueDepartment}
            status={items.issueStatus}/>
          ))}
        </div>
      </div>
      <footer className="px-5 lg:px-10 mt-10 lg:mt-20">
        <Footer />
      </footer>
    </div>
  );
}

export default HomePage;

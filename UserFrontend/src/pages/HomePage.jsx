import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import HeroStats from "../components/HeroStats";
import HeroIntro from "../components/HeroIntro";
import IssueCard from "../components/IssueCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function HomePage() {
  const { userLocation } = useUser;
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
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </div>
      </div>
      <footer className="px-5 lg:px-10 mt-10 lg:mt-20">
        <Footer />
      </footer>
    </div>
  );
}

export default HomePage;

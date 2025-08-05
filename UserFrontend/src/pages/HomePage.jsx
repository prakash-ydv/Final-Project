import React from "react";
import NavBar from "../components/NavBar";
import HeroStats from "../components/HeroStats";
import HeroIntro from "../components/HeroIntro";
import IssueCard from "../components/IssueCard";

function HomePage() {
  return (
    <div>
      <NavBar />
      <HeroIntro />
      <HeroStats />

      {/* trendig section */}
      <div className="px-5 md:px-10 mt-10">
        <h1 className="text-2xl font-bold mb-5">Trending Issues</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

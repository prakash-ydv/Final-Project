import React from "react";
import NavBar from "../components/NavBar";
import HeroStats from "../components/HeroStats";
import HeroIntro from "../components/HeroIntro";

function HomePage() {
  return (
    <div>
      <NavBar />
      <HeroIntro/>
      <HeroStats />
    </div>
  );
}

export default HomePage;

import React from "react";
import DashBoardBox from "../components/DashBoardBox";
import NavBar from "../components/NavBar";
import DashBoardIssueCard from "../components/DashBoardIssueCard";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <NavBar />
      <h1 className="px-5 text-2xl font-bold pt-5">Daily Stats</h1>
      <div className="p-5 lg-px-10 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        <DashBoardBox title={"Total"} stat={12} color={"bg-red-500"} />
        <DashBoardBox title={"Today"} stat={"7/8"} color={"bg-yellow-500"} />
        <DashBoardBox title={"Target"} stat={7} color={"bg-blue-500"} />
        <DashBoardBox title={"Pending"} stat={1} color={"bg-orange-500"} />
      </div>

      <section className="px-5 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <DashBoardIssueCard />
        <DashBoardIssueCard />
        <DashBoardIssueCard />
        <DashBoardIssueCard />
      </section>

      <Footer />
    </>
  );
}

export default HomePage;

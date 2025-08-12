import React, { useEffect, useState } from "react";
import DashBoardBox from "../components/DashBoardBox";
import NavBar from "../components/NavBar";
import DashBoardIssueCard from "../components/DashBoardIssueCard";
import Footer from "../components/Footer";
import { getAllGarbageIssues } from "../api/getAllGarbageIssues";

function HomePage() {
  const [garbageData, setGarbageData] = useState([]);
  const [totalIssues, setTotalIssues] = useState(null);

  useEffect(() => {
    async function handleGarbageIssueFetch() {
      const data = await getAllGarbageIssues();

      if (data.success) {
        console.log(data)
        setGarbageData(data.data);
        setTotalIssues(data.count);
        console.log("Data Set");
      }
    }
    handleGarbageIssueFetch();
  }, []);

  return (
    <>
      <NavBar />
      <h1 className="px-5 text-2xl font-bold pt-5">Daily Stats</h1>
      <div className="p-5 lg-px-10 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        <DashBoardBox
          title={"Total"}
          stat={totalIssues || "NA"}
          color={"bg-red-500"}
        />
        <DashBoardBox title={"Today"} stat={"0/5"} color={"bg-yellow-500"} />
        <DashBoardBox title={"Target"} stat={4} color={"bg-blue-500"} />
        <DashBoardBox title={"Pending"} stat={1} color={"bg-orange-500"} />
      </div>

      <section className="px-5 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {garbageData.length > 0 ? (
          garbageData.map((item, index) => (
            <DashBoardIssueCard
              key={item._id || index}
              title={item.issueTitle}
              status={item.issueStatus}
              issueId={item.issueId}
              imageUrl={item.imageUrl}
            />
            // Pass props so your card can display info, not just empty boxes
          ))
        ) : (
          <p>No Issue Found</p>
        )}
      </section>

      <Footer />
    </>
  );
}

export default HomePage;

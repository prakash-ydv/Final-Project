import React from "react";
import NavBar from "../components/NavBar";
import HeroCard from "../components/HeroCard";
import {
  ChartColumnIncreasing,
  CircleCheckBig,
  Clock,
  Clock1,
  TriangleAlert,
} from "lucide-react";

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
      title: "Resolved Toady",
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
  return (
    <>
      <NavBar />

      <section className="p-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {heroDetails.map((item, index) => (
          <HeroCard
            title={item.title}
            number={item.number}
            text={item.text}
            textColor={item.textColor}
            logo={item.logo}
            color={item.color}
          />
        ))}
      </section>
    </>
  );
}

export default HomePage;

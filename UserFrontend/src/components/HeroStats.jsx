import React from "react";
import StatCard from "./StatCard";

function HeroStats() {
  return (
    <>
      {/* Responsive stats container */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 mt-2">
        {/* Total Issue */}
        <StatCard
          value="247"
          label="Total Issue"
          subtitle="+12 today"
          color="text-blue-700"
          subtitleColor="text-green-700"
        />

        {/* Resolved */}
        <StatCard
          value="189"
          label="Resolved"
          subtitle="76% rate"
          color="text-green-500"
          subtitleColor="text-green-500"
        />

        {/* Progress */}
        <StatCard
          value="42"
          label="In Progress"
          subtitle="17% active"
          color="text-orange-500"
          subtitleColor="text-blue-500"
        />

        {/* Urgent */}
        <StatCard
          value="16"
          label="Urgent"
          subtitle="Needs attention"
          color="text-red-500"
          subtitleColor="text-red-500"
        />

        {/* Avg Days */}
        <StatCard
          value="3.2"
          label="Avg Days"
          subtitle="Resolution Time"
          color="text-purple-500"
          subtitleColor="text-gray-500"
        />

        {/* Satisfaction */}
        <StatCard
          value="94%"
          label="Satisfaction"
          subtitle="Community rating"
          color="text-blue-500"
          subtitleColor="text-green-500"
        />
      </div>
    </>
  );
}

export default HeroStats;

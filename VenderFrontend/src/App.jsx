import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IssuePage from "./pages/IssuePage";
import RecentWorks from "./pages/RecentWorks";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/issue", element: <IssuePage /> },
  { path: "/recentworks", element: <RecentWorks /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

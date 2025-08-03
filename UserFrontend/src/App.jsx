import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/about",
    element: <h1>this is about</h1>,
  },
  {
    path: "/report",
    element: <ReportPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

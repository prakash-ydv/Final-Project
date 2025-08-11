import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashBoard from "./pages/DashBoard";

const router = createBrowserRouter([{ path: "/", element: <DashBoard /> }]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

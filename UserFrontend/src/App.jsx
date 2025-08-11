import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import FeedPage from "./pages/FeedPage";
import IssuePage from "./pages/IssuePage";
import ProtectedRoute from "./security/ProtectedRoute";
import MyReports from "./pages/MyReports";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/myreports",
    element: (
      // <ProtectedRoute>
        <MyReports />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/report",
    element: (
      // <ProtectedRoute>
        <ReportPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/feed",
    element: <FeedPage />,
  },
  {
    path: "/golu",
    element: <IssuePage />,
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

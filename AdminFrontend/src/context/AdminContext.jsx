import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getLatestIssues } from "../api/getNewIssues";

// Create context
const AdminContext = createContext();

// Provider component
export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [allIssues, setAllIssues] = useState(null);

  useEffect(() => {
    async function getAllIssueData() {
      const data = await getLatestIssues();
      if (data) {
        setAllIssues(data);
        console.log("all issue saved", data);
      }
    }

    getAllIssueData();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, adminData, allIssues }}>
      {children}
    </AdminContext.Provider>
  );
}

// Custom hook for using context
export function useAdmin() {
  return useContext(AdminContext);
}

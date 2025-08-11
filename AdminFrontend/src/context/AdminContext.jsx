import { createContext, useContext, useState } from "react";

// Create context
const AdminContext = createContext();

// Provider component
export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState(null);

  return (
    <AdminContext.Provider value={{ isAdmin, adminData }}>
      {children}
    </AdminContext.Provider>
  );
}

// Custom hook for using context
export function useAdmin() {
  return useContext(AdminContext);
}

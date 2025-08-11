import React, { useState } from "react";
import { Menu, X, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useVendor } from "../context/VendorContext";
import { logOutVendor } from "../api/vendor";

function NavBar() {
  const navigate = useNavigate();
  const { isLogedIn, setIsLogedIn } = useVendor();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  async function handleLogOutUser() {
    console.log("loging Out");
    const respone = await logOutVendor();
    if (respone.success) {
      setIsLogedIn(false);
      navigate("/login");
    }
  }

  return (
    <nav className="w-full shadow-xs top-0 left-0 z-50 bg-white">
      <div className="max-w-[90rem] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 bg-blue-700 rounded-lg flex items-center justify-center">
            <Map className="text-white" />
          </span>
          <h1 className="text-2xl font-bold text-gray-800">
            CityFix <span className="text-xs font-light">Vendor</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center justify-center md:flex gap-6 text-gray-700 text-sm font-medium">
          <Link to={"/"} className="hover:text-blue-700 transition">
            Home
          </Link>
          <Link to={"/recentworks"} className="hover:text-blue-700 transition">
            Recent Works
          </Link>
          {isLogedIn ? (
            <button
              onClick={() => handleLogOutUser()}
              className="text-red-500 hover:text-blue-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"} className="hover:text-blue-700 transition">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Side Drawer for Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 right-0 w-3/4 h-[calc(100%-4rem)] bg-white shadow-lg z-9999 md:hidden"
          >
            <div className="p-6 flex flex-col gap-6 text-gray-800 font-semibold">
              <Link
                to={"/"}
                onClick={toggleMenu}
                className="hover:text-blue-700"
              >
                Home
              </Link>
              <Link
                to={"/works"}
                onClick={toggleMenu}
                className="hover:text-blue-700"
              >
                Recent Works
              </Link>
              {isLogedIn ? (
                <button
                  onClick={() => handleLogOutUser()}
                  className="text-start text-red-500 hover:text-blue-700 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  onClick={toggleMenu}
                  className="hover:text-blue-700"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavBar;

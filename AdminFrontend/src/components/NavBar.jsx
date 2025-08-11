import React, { useState } from "react";
import { Menu, X, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  //   dummy
  const [isLogedIn, setIsLogedIn] = useState(true);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  async function handleLogOutUser() {}

  return (
    <nav className="w-full shadow-xs top-0 left-0 z-50 bg-white">
      <div className="max-w-[90rem] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 bg-blue-700 rounded-lg flex items-center justify-center">
            <Map className="text-white" />
          </span>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            CityFix <small className="font-light text-xs">Admin</small>
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center justify-center md:flex gap-6 text-gray-700 text-sm font-medium">
          <span className="bg-gray-50 border border-gray-100 rounded-lg  p-2 font-semibold ">
            City : Pune
          </span>
          {isLogedIn ? (
            <button
              onClick={() => handleLogOutUser()}
              className="bg-red-500 p-1 px-4 rounded-lg text-white broder border-gray-100 hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className=" border border-gray-100 p-1 px-2 hover:bg-blue-500 rounded-lg hover:text-white transition"
            >
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
              {isLogedIn ? (
                <button
                  onClick={() => handleLogOutUser()}
                  className="text-center w-20 p-1 px-2 bg-red-500 rounded-lg hover:text-blue-700 transition"
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

import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Brand */}
        <h1 className="text-lg font-semibold text-white">VendorPortal</h1>
        
        {/* Links */}
        <div className="flex gap-6 mt-3 md:mt-0 text-sm">
          <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
          <a href="/orders" className="hover:text-white transition">Orders</a>
          <a href="/profile" className="hover:text-white transition">Profile</a>
          <a href="/support" className="hover:text-white transition">Support</a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 mt-4 border-t border-gray-700 pt-3">
        © {new Date().getFullYear()} VendorPortal. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

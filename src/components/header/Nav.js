import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Nav({ onLogout }) {
  return (
    <nav className="flex flex-row relative h-[80px] bg-pink-300 justify-between items-center px-4">
      <div>
        <h1 className="text-center font-semibold text-[24px]">
          <Link to="/">Grupp 6</Link>
        </h1>
      </div>
      <ul className="flex flex-row gap-4 mx-auto font-semibold text-[16px]">
        <li className="hover:text-purple-800">
          <Link to="/">Mock Data</Link>
        </li>
        <li className="hover:text-purple-800">
          <Link to="/apiPage">Api </Link>
        </li>
      </ul>
      <div className="flex items-center justify-center absolute top-4 right-4">
        <button
          className="bg-red-500 py-1 px-3 mx-4 text-[14px] text-black uppercase tracking-wider font-semibold rounded-md"
          onClick={onLogout}
        >
          Logout
        </button>
        <Link to="/UserPage" className="">
          <FaUser size={18} className="hover:text-purple-600" />
        </Link>
      </div>
      

      
    </nav>
  );
}

export default Nav;

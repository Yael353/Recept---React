import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthFlow from "../auth/AuthFlow";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kontrollera om en användare är inloggad
    const user = localStorage.getItem("currentUser");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AuthFlow onLogin={handleLogin} />;
  }

  return (
    <nav className="flex flex-row h-[80px] bg-pink-300 justify-center items-center px-4">
      <div>
        <h1 className="text-center font-semibold text-[24px]">
          <Link to="/">Grupp 6</Link>
        </h1>
      </div>
      <ul className="flex flex-row gap-4 mx-auto">
        <Link to="/">Mock Data</Link> -<Link to="/apiPage">Api </Link>
      </ul>
      <div className="flex items-center justify-center p-2">
        <button
          className="bg-red-400 py-2 px-6 text-white rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Nav;

import React, { useEffect, useState } from "react";
import Nav from "./header/Nav";
import { Outlet } from "react-router-dom";
import AuthFlow from "./auth/AuthFlow";

function Layout() {
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
   //localStorage.clear(); 
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AuthFlow onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav onLogout={handleLogout} />
      <main className="bg-purple-50 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

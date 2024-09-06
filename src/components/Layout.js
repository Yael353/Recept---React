import React from "react";
import Nav from "./header/Nav";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

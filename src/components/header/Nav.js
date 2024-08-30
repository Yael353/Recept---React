import React from "react";

function Nav() {
  return (
    <nav className="flex flex-row gap-10 h-[60px] bg-pink-300">
      <ul className="flex gap-4">
        <li>
          <a href="../../pages/ApiPage.html">API</a>
        </li>
        <li>
          <a href="/mock-data">Mock Data</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

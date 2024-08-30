import React from "react";


function Nav() {
  return (
    <nav className="flex flex-col h-[80px] bg-pink-300">
      <ul className="flex flex-row gap-4 justify-center">
        <li>
          <a href="../../pages/ApiPage.html">API</a>
        </li>
        -
        <li>
          <a href="/mock-data">Mock Data</a>
        </li>
      </ul>
      <h1 className="text-center font-semibold text-[24px]">Grupp 6</h1>
    </nav>
  );
}

export default Nav;

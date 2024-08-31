import React from "react";

function Nav() {
  return (
    <nav className="flex flex-col h-[80px] bg-pink-300 justify-center">
      <ul className="flex flex-row gap-4 mx-auto">
        <p>API</p>-<p>Mock Data</p>
      </ul>
      <h1 className="text-center font-semibold text-[24px]">Grupp 6</h1>
    </nav>
  );
}

export default Nav;

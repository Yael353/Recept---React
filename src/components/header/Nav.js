import React from "react";
import ApiPage from "../../ApiPage";


function Nav() {
  return (
    <nav className="flex flex-row gap-10 h-[60px] bg-pink-300">
      <ul className="flex gap-4">
        <li>

          <a href="#ApiPage">API</a>
        </li>
        <li>
            <a href="#MockDataPage">Mock data</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

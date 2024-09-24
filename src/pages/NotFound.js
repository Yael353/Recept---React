import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mx-auto text-[20px] h-screen">
      <p>404 Not found</p>
      <Link to="/" className="underline text-blue-800 ">Go back home</Link>
    </div>
  );
}

export default NotFoundPage;

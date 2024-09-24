import React, { useEffect, useState } from "react";

function UserPage() {
    const [savedCats, setSavedCats] = useState([])
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const username = user ? user.username : "Guest";

  useEffect(() => {
    // Fetch the saved favorites for the current user (or an empty array if none)
    const userFavs = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
    setSavedCats(userFavs);
  }, [username]);

  return (
    <div className="flex flex-col ">
      <div className="flex w-full flex-col max-w-[90rem] mx-auto px-4 ">
        <div className="w-full relative bg-green-200 ">
          <p className="absolute top-0 right-0">
            You are logged in as:
            <span className="font-semibold pl-2">{username}</span>
          </p>
        </div>
        <div className="flex py-10 font-semibold">Your saved recipes:</div>

        <ul>
          {savedCats.length > 0 ? (
            savedCats.map((fav) => (
              <div key={fav.idCategory}>
                <img
                  src={fav.strCategoryThumb}
                  alt={fav.strCategory}
                  style={{ width: "100px", height: "100px" }}
                />
                <h3 className="text-[24px] font-semibold">{fav.strCategory}</h3>
                <p>{fav.strCategoryDescription}</p>
              </div>
            ))
          ) : (
            <p>You have not saved any recipes yet!</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default UserPage;

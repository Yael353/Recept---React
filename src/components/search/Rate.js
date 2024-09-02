import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";

const RateRecipe = ({ addRate }) => {
  const [stars, setStars] = useState(1); //current value of stars - 1

  const addStars = () => {
    addRate(Number(stars)); //call addRate func, adds current nr of stars to rating
    setStars(1); //reset stars
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex text-gray-600 flex-row justify-center align-center"
      >
        <label htmlFor="stars">Rate</label>
        <input
          type="number"
          id="stars"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          placeholder="0"
          className="w-8 mx-1 inline-flex justify-center align-center border"
        />
        <button className=" " type="submit" onClick={addStars}>
          <FaRegStar color="gray" />
        </button>
      </form>
    </div>
  );
};

export default RateRecipe;

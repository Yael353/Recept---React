import React, { useEffect, useState } from "react";
import mockRecipes from "../mockData/recipes.json";

const MockDataCrud = () => {
  const [recipes, setRecipes] = useState([]);

  //get data
  useEffect(() => {
    setRecipes(mockRecipes.recipes);
  }, []);

  console.log("rec", recipes)
  return (
    <div>
      <h3>Mock Recipe List</h3>
      <ul>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <li key={index}>
              <h4>{recipe.title}</h4>
            </li>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </ul>
    </div>
  );
};

export default MockDataCrud;

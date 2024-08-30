import React from "react";
import { useState, useEffect } from "react";

import RECIPES_MOCK from "../mockData/recipes.json";

export default function GetRecipes() {
  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    const fetchRecipes = () => {
      setRecipes(RECIPES_MOCK.recipes);
    };
    fetchRecipes();
  }, []);

  /* console.log(recipes); */

  if (recipes) {
    return (
      <div>
        <h2>Recipes List</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <h3>{recipe.ingredients}</h3>
              {/* <button onClick={() => deleteBook(book.id)}>Delete</button> */}
            </li>
          ))}
        </ul>
      </div>
    );
  } else
    return (
      <div>
        <h1>RECIPES NOT FOUND</h1>
      </div>
    );
}

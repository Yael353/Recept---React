import React from "react";
import { useState, useEffect } from "react";
import RECIPES_MOCK from "../mockData/recipes.json";

function ShowIngredientsComponent({ ingredientList }) {
  return (
    <>
      <ul>
        <li></li>
      </ul>
    </>
  );
}

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Recipes List</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>Title: {recipe.title}</h3>
              <textarea rows="4" cols="50">
                <p>{recipe.ingredients}</p>
              </textarea>
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

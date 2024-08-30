import React from "react";
import { useState, useEffect } from "react";
import RECIPES_MOCK from "../mockData/recipes.json";

//Component Show Ingredients Array from recipes.json
function ShowIngredientsComponent({ ingredients }) {
  return (
    <>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.index}>
            <p>{ingredient}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
//Component Get and Show recipes from recipes.json
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
        <h1 style={{ textAlign: "center" }}>Recipes List</h1>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            background: "grey",
            gap: 10,
          }}
        >
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>Title: {recipe.title}</h3>
              <ShowIngredientsComponent ingredients={recipe.ingredients} />
              {/* <button onClick={() => deleteBook(book.id)}>Delete</button> */}
              <hr></hr>
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

import React from "react";
import { useState, useEffect } from "react";
import RECIPES_MOCK from "../mockData/recipes.json";

//Component Show Ingredients Array from recipes.json
function ShowIngredientsComponent({ ingredients }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: 200,
      }}
    >
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <p>{ingredient}</p>
          </li>
        ))}
      </ul>
    </div>
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

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((book) => book.id !== id));
    console.log(recipes.length);
  };

  //JSX code
  if (recipes) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ textAlign: "center" }}>Recipes List</h1>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            background: " #faf5ff",
            gap: 10,
          }}
        >
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>Title: {recipe.title}</h3>
              <ShowIngredientsComponent ingredients={recipe.ingredients} />
              <button
                style={{
                  background: "red",
                  marginLeft: 100,
                  borderRadius: 5,
                  color: "grey",
                }}
                onClick={() => deleteRecipe(recipe.id)}
              >
                Delete Btn
              </button>
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

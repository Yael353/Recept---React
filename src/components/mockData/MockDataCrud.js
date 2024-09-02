import React, { useEffect, useState } from "react";
import mockRecipes from "../mockData/recipes.json";

const MockDataCrud = ({ showForm, toggleForm }) => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState("");

  //get data
  useEffect(() => {
    setRecipes(mockRecipes.recipes);
  }, []);

  // Handle deleting a recipe
  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  return (
    <div className="bg-purple-50 px-4 py-6 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-center text-[24px] mb-4">
        Fetched Mock Recipe List
      </h2>
      <div className="flex mx-auto">
        <ul className="flex flex-wrap flew-row justify-around gap-4">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white my-6 px-6 py-4 shadow-md h-fit max-w-[500px]"
              >
                <li className="flex flex-col gap-6">
                  <h4 className="text-[20px] font-semibold">{recipe.title}</h4>
                  <img src={recipe.imageURL} alt="Not found" />
                  <div>
                    <h3 className="text-[18px] font-semibold">Ingredients:</h3>
                    <ul className="list-decimal ml-4 ">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[18px] font-semibold">Instructions:</h3>
                    <ul className="list-decimal ml-4">
                      {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  {/**rodrigo edit, delete func, place right top corner */}
                  <div className="flex gap-4">
                    <button className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-gray-400 text-white hover:bg-gray-600">
                      Edit
                    </button>
                    <button
                      className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-red-400 text-white hover:bg-red-600"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </ul>
      </div>
      <button
        className="addRecipeForm text-3xl bg-green-400 w-50 rounded-lg p-2 m-3"
        onClick={toggleForm}
      >
        {showForm ? "Close form" : "Add recipe"}
      </button>
    </div>
  );
};

export default MockDataCrud;

import React, { useEffect, useState } from "react";
import mockRecipes from "../mockData/recipes.json";

const MockDataCrud = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState("");

  //get data
  useEffect(() => {
    setRecipes(mockRecipes.recipes);
  }, []);

  //console.log("rec", recipes)

  const createRecipe = () => {};

  return (
    <div className="bg-purple-50 px-4 py-6 flex flex-col">
      <h3 className="font-semibold text-[24px] mb-4">
        Fetched Mock Recipe List
      </h3>
      <div>
        <ul className="px-4">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div className="bg-white my-6 px-6 py-4 shadow-md">
                <li key={index} className="flex flex-col gap-6">
                  <h4 className="text-[20px] font-semibold">{recipe.title}</h4>
                  <img src={recipe.imageURL} alt="Not found" />
                  <div>
                    <h3 className="text-[18px] font-semibold">Ingredients:</h3>
                    <ul className="list-decimal ml-4 ">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold">Instructions:</h3>
                    <ul className="list-decimal ml-4">
                      {recipe.instructions.map((step, index) => (
                        <li>{step}</li>
                      ))}
                    </ul>
                    {/**rodrigo edit, delete func, place right top corner */}
                    <div className="flex gap-4">
                        <button className="rounded-md px-4 py-1.5 bg-gray-400 text-white">Edit</button>
                        <button className="rounded-md px-4 py-1.5 bg-red-400 text-white">Delete</button>
                    </div>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </ul>
      </div>
    
    </div>
  );
};

export default MockDataCrud;

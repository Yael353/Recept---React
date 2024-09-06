import React, { useState } from "react";
import FormCard from "./FormCard";

function RecipeForm({ formObj }) {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [unit, setUnit] = useState("");
  const [amount, setAmount] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [stepsList, setStepsList] = useState([]);
  //const [formObj, setFormObj] = useState(null);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredient && unit && amount) {
      setIngredients([...ingredients, { ingredient, unit, amount }]);
      setIngredient("");
      setUnit("");
      setAmount("");
    }
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    if (steps) {
      setStepsList([...stepsList, steps]);
      setSteps("");
    }
  };

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newFormObj = {
      recipeName,
      description,
      ingredients,
      stepsList,
      image,
    };

    console.log("new form obj in crete recipeform", newFormObj);

    formObj(newFormObj);
    console.log("new form obj 2 in crete recipeform", newFormObj);

    setRecipeName("");
    setDescription("");
    setIngredients([]);
    setStepsList([]);
    setImage(null);
  };

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col justify-center items-center">
      <form
        className="recForm flex flex-col bg-white m-10 p-10 rounded-lg shadow-lg w-full max-w-3xl"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-8">
          Recipe Form
        </h3>

        <section className="firstPart mb-6">
          <div className="recipeTitle mb-4">
            <label
              htmlFor="recepieName"
              className="block text-lg font-medium text-gray-600 mb-2"
            >
              Name the dish
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              id="recepieName"
              placeholder="Title"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>

          <div className="describe">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-600 mb-2"
            >
              Describe the dish
            </label>
            <textarea
              id="description"
              placeholder="Give a mouthwatering description of your dish!"
              className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </section>

        <section className="ingredientSection mb-6">
          <div className="addIng2 mb-4">
            <label
              htmlFor="ingredientInput"
              className="block text-lg font-medium text-gray-600 mb-2"
            >
              Add ingredient
            </label>
            <input
              type="text"
              id="ingredientInput"
              placeholder="Ingredient"
              className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="dropdown"
                className="block text-lg font-medium text-gray-600 mb-2"
              >
                Unit of measurement
              </label>
              <select
                className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                id="dropDown"
                name="dropdown"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="" hidden>
                  Unit
                </option>
                <option value="g">g</option>
                <option value="hg">hg</option>
                <option value="ml">ml</option>
                <option value="dl">dl</option>
                <option value="msk">msk</option>
                <option value="tsk">tsk</option>
                <option value="krm">krm</option>
                <option value="st">st</option>
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="amountInput"
                className="block text-lg font-medium text-gray-600 mb-2"
              >
                Amount
              </label>
              <input
                className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                type="text"
                id="amountInput"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <button
            className="addButton bg-blue-500 text-white font-medium rounded-lg w-full py-3 mt-2 hover:bg-blue-600 transition"
            onClick={handleAddIngredient}
          >
            Add ingredient
          </button>
        </section>

        <div className="mb-6">
          <ul
            id="ingredientOutput"
            className="list-disc list-inside text-gray-700"
          >
            {ingredients.map((ing, index) => (
              <li key={index} className="mb-1">
                {ing.amount} {ing.unit} {ing.ingredient}
              </li>
            ))}
          </ul>
        </div>

        <section className="addIng2 mb-6">
          <label
            htmlFor="stepInput"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Steps
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="stepInput"
              placeholder="Write step"
              className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
            <button
              id="addStepBtn"
              className="bg-blue-500 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-600 transition"
              onClick={handleAddStep}
            >
              Add step
            </button>
          </div>
        </section>

        <div className="mb-6">
          <ul
            id="stepsOutput"
            className="list-decimal list-inside text-gray-700"
          >
            {stepsList.map((step, index) => (
              <li key={index} className="mb-1">
                {step}
              </li>
            ))}
          </ul>
        </div>

        <section className="uppLoadImg flex justify-center items-center flex-col mb-6">
          <img
            src={image || "/img/emptyImg.png"}
            alt="Empty plate"
            id="standardImage"
            className="h-64 object-cover rounded-lg mb-4 w-[400px]"
          />
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            id="imageInput"
            className="text-gray-600 w-[200px]"
            onChange={handleImageUpload}
          />
        </section>

        <div id="addRecipe">
          <button
            type="submit"
            id="addRecipeBtn"
            className="bg-green-500 text-white font-medium rounded-lg w-full py-3 hover:bg-green-600 transition"
          >
            Add recipe
          </button>
        </div>
      </form>
      <div className="w-full max-w-3xl mt-8">
        {formObj && <FormCard formObj={formObj} />}
      </div>
    </div>
  );
}

export default RecipeForm;

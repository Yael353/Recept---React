import React, { useState } from "react";

function RecipeForm() {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [unit, setUnit] = useState("");
  const [amount, setAmount] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [stepsList, setStepsList] = useState([]);

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
    // Handle form submission logic here
    console.log({
      recipeName,
      description,
      ingredients,
      stepsList,
      image,
    });
  };

  return (
    <form
      className="recForm flex flex-col bg-pink-300 m-20 p-20 justify-center items-center rounded-lg w-[40%] mx-auto"
      onSubmit={handleSubmit}
    >
      <section className="firstPart ">
        <div className="recipeTitle">
          <label htmlFor="recepieName">Name the dish</label>
          <input
            type="text"
            className="rounded-md p-2"
            id="recepieName"
            placeholder="Title"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>
        <div className="describe">
          <label htmlFor="description">Describe the dish</label>
          <textarea
            id="description"
            placeholder="Give a mouthwatering description of your dish!"
            className="description rounded-md p-2 h-40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </section>

      <section className="ingredientSection">
        <div className="addIng2">
          <label htmlFor="ingredientInput">Add ingredient</label>
          <input
            type="text"
            id="ingredientInput"
            placeholder="Ingredient"
            className="rounded-md p-2"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </div>
        <div className="addIng2">
          <label htmlFor="dropdown">Unit of measurement</label>
          <select
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

        <div className="addIng2">
          <label htmlFor="amountInput">Amount</label>
          <input
            type="text"
            id="amountInput"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="addButton" onClick={handleAddIngredient}>
          Add ingredient
        </button>
      </section>

      <div>
        <ul id="ingredientOutput">
          {ingredients.map((ing, index) => (
            <li key={index}>
              {ing.amount} {ing.unit} {ing.ingredient}
            </li>
          ))}
        </ul>
      </div>

      <section className="addIng2">
        <label htmlFor="stepInput">Steps</label>
        <input
          type="text"
          id="stepInput"
          placeholder="Write step"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <button id="addStepBtn" onClick={handleAddStep}>
          Add step
        </button>
      </section>

      <div>
        <ul id="stepsOutput">
          {stepsList.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>

      <section className="uppLoadImg">
        <img
          src={image || "/img/emptyImg.png"}
          alt="Empty plate"
          id="standardImage"
        />
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          id="imageInput"
          onChange={handleImageUpload}
        />
      </section>

      <div id="addRecipe">
        <button type="submit" id="addRecipeBtn">
          Add recipe
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;

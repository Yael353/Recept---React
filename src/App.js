import "./App.css";
import GetRecipes from "./components/api/GetRecipes";
import Nav from "./components/header/Nav";
import CreateRecipeForm from "./components/forms/CreateRecipeForm";
import MockDataCrud from "./components/mockData/MockDataCrud";
import MealSearch from "./components/search/MealSearch";
import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);

  function toggleForm() {
    setShowForm(!showForm);
  }

  return (
    <>
      <Nav />
      <GetRecipes />
      <MockDataCrud showForm={showForm} toggleForm={toggleForm} />
      <div className="flex flex-col justify-center w-full">
        {/* <h3 className="font-semibold text-center text-[24px] my-4">
          Add new recipe:{" "}
        </h3> */}
        {showForm && <CreateRecipeForm />}
      </div>
      <div>
        <MealSearch />
      </div>
    </>
  );
}

export default App;

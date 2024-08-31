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
      <div className="border-t border-gray-600 ">

      <MockDataCrud showForm={showForm} toggleForm={toggleForm} />
      <div className="flex flex-col justify-center w-full">
        {showForm && <CreateRecipeForm />}
      </div>
      </div>
      <div className="border-t border-gray-600 ">
        <MealSearch />
      </div>
    </>
  );
}

export default App;

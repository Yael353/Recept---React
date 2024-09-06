import React, { useState } from "react";
import "./App.css";
import GetRecipes2 from "./components/api/GetRecipes2";
import CreateRecipeForm from "./components/forms/CreateRecipeForm";
import MockDataCrud from "./components/mockData/MockDataCrud";

function App() {
  //showForm
  const [showForm, setShowForm] = useState(false);

  function toggleForm() {
    setShowForm(!showForm);
  }

  return (
    <>
      <div className="border-t border-gray-600 ">
        <MockDataCrud showForm={showForm} toggleForm={toggleForm} />
        <div className="flex flex-col justify-center w-full">
          {showForm && <CreateRecipeForm />}
        </div>
      </div>
      <GetRecipes2 />
    </>
  );
}

export default App;

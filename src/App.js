import "./App.css";
import GetRecipes from "./components/api/GetRecipes";
import Nav from "./components/header/Nav";
import CreateRecipeForm from "./components/forms/CreateRecipeForm";
import MockDataCrud from "./components/mockData/MockDataCrud";
import MealSearch from "./components/search/MealSearch";

function App() {
  return (
    <>
      <Nav />
      <GetRecipes />
      <MockDataCrud />
      <div className="flex flex-col justify-center w-full">
        <h3 className="font-semibold text-center text-[24px] my-4">
          Add new recipe:{" "}
        </h3>
        <CreateRecipeForm />
      </div>
      <div>
        <MealSearch />
      </div>
    </>
  );
}

export default App;

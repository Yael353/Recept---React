import "./App.css";
import GetRecipes from "./components/api/GetRecipes";
import Nav from "./components/header/Nav";
import CreateRecipeForm from "./components/forms/CreateRecipeForm";
import MockDataCrud from "./components/mockData/MockDataCrud";

function App() {
  return (
    <>
      <Nav />
      <GetRecipes />
      <MockDataCrud />
      <h3 className="font-semibold text-[24px] mb-4">Add new recipe: </h3>
      <CreateRecipeForm />

    </>
  );
}

export default App;

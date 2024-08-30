import "./App.css";
import GetRecipes from "./components/api/GetRecipes";
import Nav from "./components/header/Nav";
import CreateRecipeForm from "./components/forms/CreateRecipeForm";

function App() {
  return (
    <>
      <Nav />
      <GetRecipes />
      <MockDataCrud />
      <CreateRecipeForm />
    </>
  );
}

export default App;

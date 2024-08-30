import "./App.css";
import Nav from "./components/header/Nav";
import CreateRecipeForm from "./components/forms/CreateRecipeForm";

function App() {
  return (
    <>
      <Nav />
      <MockDataCrud />
      <CreateRecipeForm />
    </>
  );
}

export default App;

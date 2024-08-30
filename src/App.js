import "./App.css";
import GetRecipes from "./components/api/GetRecipes";
import Nav from "./components/header/Nav";

function App() {
  return (
    <>
      <Nav />
      <GetRecipes />
    </>
  );
}

export default App;

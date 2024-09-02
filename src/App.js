
import "./App.css";
import GetRecipes from "./components/api/GetRecipes";
import GetRecipes2 from "./components/api/GetRecipes2";
import Nav from "./components/header/Nav";
import AuthFlow from './components/auth/AuthFlow';
import CreateRecipeForm from "./components/forms/CreateRecipeForm";
import MockDataCrud from "./components/mockData/MockDataCrud";
import MealSearch from "./components/search/MealSearch";
import { useState, useEffect } from "react";

function App() {
  //showForm
  const [showForm, setShowForm] = useState(false);

  function toggleForm() {
    setShowForm(!showForm);
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kontrollera om en användare är inloggad
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AuthFlow onLogin={handleLogin} />;
  }

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center p-2">
        <button className="bg-red-400 text-white p-2 w-[200px] rounded-md" onClick={handleLogout}>Logout</button>
      </div>
      {/* <GetRecipes /> */}
      <GetRecipes2 />
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

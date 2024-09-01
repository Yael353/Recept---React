import React from "react";
import { useState, useEffect } from "react";

//NOTE: This Component works with an localhost API(Express) with GET/DELETE Operations
export default function GetRecipes2() {
  const [recipes, setRecipes] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    //GET FUNCTION
    const fetchRecipes = async () => {
      let data = null;
      try {
        const res = await fetch("http://localhost:4000/");
        data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error Fetch Data", error);
      } finally {
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, []);

  //DELETE FUNCTION
  const handleDelete = async (id, title) => {
    try {
      const res = await fetch(`http://localhost:4000/recipes/${id}`, {
        method: "DELETE",
      });
      console.log(res);
      setRecipes(recipes.filter((r) => r.id !== id));
      setMessage(`${title}, with id:${id}, have been deleted. :)`);
    } catch (error) {
      setMessage(`ERROR: ${title}, with id:${id} was not deleted!`);
      console.error("Error deleting post:", error);
    }
  };

  //JSX code
  if (recipes) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ textAlign: "center" }}>Recipes List</h1>
        <p> 🗣️ {message} </p>
        <br></br>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            background: " #faf5ff",
            gap: 10,
          }}
        >
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>Title: {recipe.title}</h3>
              <button
                style={{
                  background: "red",
                  marginLeft: 100,
                  borderRadius: 5,
                  color: "white",
                }}
                onClick={() => handleDelete(recipe.id, recipe.title)}
              >
                Delete Btn
              </button>
              <hr></hr>
            </li>
          ))}
        </ul>
      </div>
    );
  } else
    return (
      <div>
        <h1>🗣️ FAIL: RECIPE LIST NOT FOUND. Please RUN the API SERVER</h1>
      </div>
    );
}

import React, { useEffect, useState } from "react";
import RateRecipe from "./Rate";
import { FaHeart, FaRegStar } from "react-icons/fa";
import SearchBar from "./SearchBar"; //komponenten searchbar

const MealSearch = () => {
  //states
  const [categories, setCategories] = useState([]); //state - empty array to put the fetched categories
  //for edeting
  const [editingId, setEditingId] = useState(null); //id for edeting, null from start
  const [newDescription, setNewDescription] = useState("");
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  //filtrerar category
  const [filteredCategories, setFilteredCategories] = useState([]);
  //handle open/close create category
  const [isOpen, setIsOpen] = useState(false);
  //new rate
  const [newRate, setNewRate] = useState({});
  //save to userPage/favourite
  const [fav, setFav] = useState([]);

  //open create category form
  const openCreateCategoryForm = () => {
    setIsOpen(true);
  };
  //close create category form
  const closeCreateCategoryForm = () => {
    setIsOpen(false);
  };

  //create - handle add new category
  const handleAddCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]); //spread op - add the category to the current category list
    setFilteredCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  // - fetch meal categories - from the meal db
  useEffect(() => {
    async function getMeals() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const result = await response.json();
        //console.log("res", result);
        setCategories(result.categories.slice(0, 4));
        setFilteredCategories(result.categories.slice(0, 4)); // Initialize filtered categories
      } catch (err) {
        console.error("Error fetching meals!", err);
      }
    }
    getMeals();
  }, []);

  //funktion för att kunna hantera och hitta ett recept efter kategorin
  const handleSearch = (query) => {
    if (query === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) =>
        (category.strCategory || "").toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  //delete meal category by id
  const deleteMeal = (id) => {
    const deleteCategories = categories.filter(
      (meal) => meal.idCategory !== id
    );
    setCategories(deleteCategories);
    setFilteredCategories(deleteCategories);
  };

  //update meal category
  const updateMeal = (id) => {
    const updateCategories = categories.find((meal) => meal.idCategory === id);
    setEditingId(id);
    setNewDescription(updateCategories.strCategoryDescription);
    setNewCategoryTitle(updateCategories.strCategory);
  };

  //save the edited description/title(category)
  const saveUpdatedDescription = (id) => {
    const updateCategories = categories.map((meal) =>
      meal.idCategory === id
        ? {
            ...meal,
            strCategoryDescription: newDescription,
            strCategory: newCategoryTitle,
          }
        : meal
    );
    setCategories(updateCategories);
    setEditingId(null); //remove editing mode on id
    setFilteredCategories(updateCategories);
  };

  //close edit description
  const closeEditForm = () => {
    setEditingId(null);
  };

  //rating - update stars
  const handleRating = (id, newRate) => {
    setNewRate((prevRate) => ({
      ...prevRate,
      [id]: (prevRate[id] || 0) + newRate,
    }));
  };

  // Save to favorites
  const handleAddFav = (meal) => {
    // Get the current user (assumed to be saved in localStorage)
    const user = JSON.parse(localStorage.getItem("currentUser"));
  
    // If user exists, get the username (or use userId if available)
    const username = user ? user.username : null;
  
    if (!username) {
      console.log("User not logged in.");
      return; // Exit if no user is logged in
    }
  
    // Get the current favorites for this user (or an empty array if not found)
    const userFavs = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
  
    // Check if the meal is already in the user's favorites
    const existingFav = userFavs.find((favMeal) => favMeal.idCategory === meal.idCategory);
  
    let updatedFavs;
  
    if (existingFav) {
      // Remove the meal if it's already in favorites
      updatedFavs = userFavs.filter((favMeal) => favMeal.idCategory !== meal.idCategory);
    } else {
      // Add the meal to favorites
      updatedFavs = [...userFavs, meal];
    }
  
    // Save the updated favorites back to localStorage under the specific user key
    localStorage.setItem(`favorites_${username}`, JSON.stringify(updatedFavs));
  
    // Optionally, set the favorites state if needed (e.g., to trigger UI updates)
    setFav(updatedFavs);
  };

  return (
    <div className="h-full bg-purple-50">
      <div className="px-4 py-6 flex w-full h-full flex-col">
        <h3 className="font-semibold text-[24px] mb-4 text-center">
          Meal By Category - API
        </h3>
        <div className="flex mx-auto mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex mx-auto">
          {!isOpen ? (
            <button
              onClick={openCreateCategoryForm}
              className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-green-600 text-white hover:bg-green-600"
            >
              Add new category
            </button>
          ) : (
            <CategoryForm
              closeForm={closeCreateCategoryForm}
              addCatetegory={handleAddCategory}
            />
          )}
        </div>
        <div className="">
          {filteredCategories.length > 0 ? (
            <div className="">
              <ul className="flex flex-wrap flew-row justify-around gap-4">
                {filteredCategories.map((meal) => (
                  <div
                    key={meal.idCategory}
                    className={`bg-white min-w-[260px] w-full max-w-[500px]  my-6 px-6 py-8 flex flex-col shadow-md justify-between relative ${
                      editingId === meal.idCategory
                        ? "border border-black w-full"
                        : ""
                    }`}
                  >
                    <li className="flex flex-col gap-6">
                      <div className="flex flex-row items-center gap-1 absolute top-4 left-4">
                        <p>
                          Rating: {newRate[meal.idCategory] || 0}
                          {/*newRate === 1 ? "star" : "stars"*/}
                        </p>
                        <FaRegStar color="gray" />
                      </div>
                      {editingId === meal.idCategory ? (
                        <div className="mt-4">
                          <h3 className="font-semibold text-[18px]">
                            Edit Category:{" "}
                          </h3>
                          <input
                            className="border border-gray-300 p-2 w-fit"
                            type="text"
                            value={newCategoryTitle}
                            onChange={(e) =>
                              setNewCategoryTitle(e.target.value)
                            }
                          />
                        </div>
                      ) : (
                        <h4 className="text-[24px] font-semibold mt-3">
                          {meal.strCategory}
                        </h4>
                      )}
                      <div className="absolute font-semibold text-[18px] right-4 top-4">
                        <button onClick={() => deleteMeal(meal.idCategory)}>
                          X
                        </button>
                      </div>
                      <div className="flex justify-center max-w-[500px] pb-4 relative">
                        <img
                          className="max-w-[400px]"
                          src={meal.strCategoryThumb}
                          alt={meal.strCategory}
                        />
                        <div className="absolute bottom-[-28px] right-0">
                          <RateRecipe
                            addRate={(newRate) =>
                              handleRating(meal.idCategory, newRate)
                            }
                          />
                          {/**fav */}
                          <FaHeart
                            color={
                              fav.some(
                                (favMeal) =>
                                  favMeal.idCategory === meal.idCategory
                              )
                                ? "red"
                                : "gray"
                            } 
                            onClick={() => handleAddFav(meal)}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                      {editingId === meal.idCategory ? (
                        <div className="">
                          <h3 className="font-semibold text-[18px]">
                            Edit Description:{" "}
                          </h3>
                          <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="border border-gray-300 p-2 w-full h-[150px]"
                          />
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-[18px] pt-4">
                            Description:{" "}
                          </h3>

                          <p className="">{meal.strCategoryDescription}</p>
                        </div>
                      )}
                      {editingId === meal.idCategory ? (
                        <div className="flex gap-4 justify-end">
                          <button
                            onClick={() =>
                              saveUpdatedDescription(meal.idCategory)
                            }
                            className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-green-400 text-white hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={closeEditForm}
                            className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-red-400 text-white hover:bg-red-600"
                          >
                            Close
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-4 justify-end">
                          <button
                            onClick={() => updateMeal(meal.idCategory)}
                            className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-gray-400 text-white hover:bg-gray-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteMeal(meal.idCategory)}
                            className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-red-400 text-white hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p>No categories found..</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

//form for adding category
const CategoryForm = ({ closeForm, addCatetegory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImg, setCategoryImg] = useState("");

  const [newError, setNewError] = useState("");

  //to upload img -
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCategoryImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //create
  const saveCategory = (e) => {
    e.preventDefault();
    //console.log("Save category");

    if (categoryName && categoryDescription) {
      //img not required
      const newCategory = {
        idCategory: Date.now().toString(),
        strCategory: categoryName,
        strCategoryDescription: categoryDescription,
        strCategoryThumb: categoryImg,
      };

      addCatetegory(newCategory); //add the new category to the end of the list
      closeForm(); //close form when saved
    } else {
      setNewError("Something went wrong, fill in all the fields correctly!");
    }
  };

  return (
    <div className="bg-white px-10 py-8 max-w-[500px] shadow-md relative">
      <div className="absolute right-4 top-4 font-semibold text-[18px]">
        <button onClick={closeForm}>X</button>
      </div>
      <h2 className="font-semibold text-[24px] mb-6">Create a new category</h2>
      <form className="flex flex-col gap-6" onSubmit={saveCategory}>
        <div className="flex flex-col">
          <label htmlFor="category" className="font-semibold">
            Write category name:
          </label>
          <input
            type="text"
            placeholder="Category"
            id="category"
            className="px-2 py-1 border border-gray-500 "
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mealImg">Add Category image</label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            id="mealImg"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold">
            Write description:{" "}
          </label>
          <textarea
            id="description"
            className="px-2 py-1 border border-gray-500 h-[100px]"
            placeholder="Description"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-green-600 text-white hover:bg-green-600"
          >
            Add new category
          </button>
          <button
            onClick={closeForm}
            className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-gray-600 text-white hover:bg-gray-600"
          >
            Close form
          </button>
        </div>
        <div>{newError && <p className="text-red-600">{newError}</p>}</div>
      </form>
    </div>
  );
};

export default MealSearch;

import React, { useEffect, useState } from "react";

const MealSearch = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const [isOpen, setIsOpen] = useState(false);

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
  };

  //read - fetch meal categories
  useEffect(() => {
    async function getMeals() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const result = await response.json();
        //console.log("res", result);
        setCategories(result.categories.slice(0, 4));
      } catch (err) {
        console.error("Error fetching meals!", err);
      }
    }
    getMeals();
  }, []);

  //delete meal by id
  const deleteMeal = (id) => {
    const deleteCategories = categories.filter(
      (meal) => meal.idCategory !== id
    );
    setCategories(deleteCategories);
  };

  //update
  const updateMeal = (id) => {
    const updateCategories = categories.find((meal) => meal.idCategory === id);
    setEditingId(id);
    setNewDescription(updateCategories.strCategoryDescription);
  };

  //save the edited description
  const saveUpdatedDescription = (id) => {
    const updateCategories = categories.map((meal) =>
      meal.idCategory === id
        ? { ...meal, strCategoryDescription: newDescription }
        : meal
    );
    setCategories(updateCategories);
    setEditingId(null);
  };

  //close edit description
  const closeEditForm = () => {
    setEditingId(null);
  };

  return (
    <div className="bg-purple-50 px-4 py-6 flex w-full flex-col">
      <h3 className="font-semibold text-[24px] mb-4 text-center">
        Meal By Category - API
      </h3>
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
        {categories.length > 0 ? (
          <div className="">
            <ul className="flex flex-wrap flew-row justify-around gap-4">
              {categories.map((meal) => (
                <div
                  key={meal.idCategory}
                  className={`bg-white min-w-[260px] w-full max-w-[500px]  my-6 px-6 py-8 flex flex-col shadow-md justify-between relative ${
                    editingId === meal.idCategory
                      ? "border border-black w-full"
                      : ""
                  }`}
                >
                  <li className="flex flex-col gap-6">
                    <h4 className="text-[24px] font-semibold">
                      {meal.strCategory}
                    </h4>
                    <div className="absolute font-semibold text-[18px] right-4 top-4">
                      <button onClick={() => deleteMeal(meal.idCategory)}>
                        X
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <img
                        className="max-w-[400px]"
                        src={meal.strCategoryThumb}
                        alt={meal.strCategory}
                      />
                    </div>
                    {editingId === meal.idCategory ? (
                      <div>
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
                        <h3 className="font-semibold text-[18px]">
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

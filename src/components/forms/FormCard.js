import React from "react";
import { useState } from "react";

function FormCard({ formObj }) {
  const [editForm, setEditForm] = useState({});

  function handleDeleteRec(id) {}

  return (
    <div>
      <div className="recipe-card-container">
        {formObj && (
          <div className="recipe-card bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {formObj.recipeName}
            </h2>
            <p className="text-gray-600 mb-4">{formObj.description}</p>

            {formObj.image && (
              <img
                src={formObj.image}
                alt={formObj.recipeName}
                className="w-80 h-48 object-cover rounded-lg mb-4"
              />
            )}

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ingredients
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {formObj.ingredients.map((ing, index) => (
                <li key={index}>
                  {ing.amount} {ing.unit} {ing.ingredient}
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Steps</h3>
            <ol className="list-decimal list-inside text-gray-700">
              {formObj.stepsList.map((step, index) => (
                <li key={index} className="mb-2">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
        <div className="flex gap-4">
          <button className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-gray-400 text-white hover:bg-gray-600">
            {editForm ? "Edit" : "Save"}
          </button>
          <button
            className="rounded-md font-semibold uppercase tracking-wider px-4 py-1.5 bg-red-400 text-white hover:bg-red-600"
            onClick={() => handleDeleteRec(formObj.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormCard;

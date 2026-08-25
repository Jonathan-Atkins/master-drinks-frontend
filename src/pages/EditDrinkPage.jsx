import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_URL } from "../config/api";
import IngredientForm from "../features/ingredients/forms/IngredientForm";

function EditIngredientPage() {
  const { ingredientId } = useParams();

  const [ingredient, setIngredient] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/ingredients/${ingredientId}`,
          {
            credentials: "include",
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors?.join(", ") ||
              data.error ||
              "Ingredient could not be loaded."
          );
        }

        setIngredient(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredient();
  }, [ingredientId]);

  if (loading) {
    return (
      <main>
        <p>Loading ingredient...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p className="form-error">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">
          Edit Ingredient
        </h1>

        <p className="page-header-description">
          Update this ingredient's type and flavor profile.
        </p>
      </header>

      <IngredientForm
        ingredient={ingredient}
      />
    </main>
  );
}

export default EditIngredientPage;
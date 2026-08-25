import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IngredientRows from "../features/recipes/components/IngredientRows";
import { createEmptyIngredientRow } from "../features/ingredients/utils/ingredientUtils";
import { API_URL } from "../config/api";



function CreateRecipePage() {
  const { drinkId } = useParams();
  const navigate = useNavigate();


  const [drink, setDrink] = useState(null);
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [publiclyVisible, setPubliclyVisible] = useState(true);

  const [ingredientRows, setIngredientRows] = useState([
    createEmptyIngredientRow(),
  ]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/drinks/${drinkId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load drink.");
        }

        const data = await response.json();
        setDrink(data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrink();
  }, [drinkId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    const incompleteRow = ingredientRows.some(
      (row) =>
        !row.ingredient_id ||
        !row.amount ||
        !row.measurement_unit
    );

    if (incompleteRow) {
      setError(
        "Select an ingredient, amount, and measurement for every row."
      );
      setSubmitting(false);
      return;
    }

    try {
      const recipeResponse = await fetch(
        `${API_URL}/api/v1/drinks/${drinkId}/recipes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            instructions,
            publicly_visible: publiclyVisible,
          }),
        }
      );

      const recipeData = await recipeResponse.json();

      if (!recipeResponse.ok) {
        throw new Error(
          recipeData.errors?.join(", ") ||
            recipeData.error ||
            "Recipe could not be created."
        );
      }

      await Promise.all(
        ingredientRows.map(async (ingredientRow) => {
          const response = await fetch(
            `${API_URL}/api/v1/recipes/${recipeData.id}/recipe_ingredients`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                ingredient_id: ingredientRow.ingredient_id,
                amount: ingredientRow.amount,
                measurement_unit:
                  ingredientRow.measurement_unit,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.errors?.join(", ") ||
                data.error ||
                "An ingredient could not be added."
            );
          }

          return data;
        })
      );

      navigate(`/drinks/${drinkId}/recipes`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading recipe form...</p>;
  }

  if (error && !drink) {
    return <p role="alert">{error}</p>;
  }

  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">
          Create a Recipe for {drink.name}
        </h1>

        <p className="page-header-description">
          Add a new recipe to this drink.
        </p>
      </header>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="recipe-name">
            Recipe name
          </label>

          <input
            id="recipe-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="recipe-instructions">
            Instructions
          </label>

          <textarea
            id="recipe-instructions"
            value={instructions}
            onChange={(event) =>
              setInstructions(event.target.value)
            }
            required
          />
        </div>

        <IngredientRows
          ingredientRows={ingredientRows}
          setIngredientRows={setIngredientRows}
          setError={setError}
        />

        <div className="form-field">
          <label>
            <input
              type="checkbox"
              checked={publiclyVisible}
              onChange={(event) =>
                setPubliclyVisible(
                  event.target.checked
                )
              }
            />

            Publicly visible
          </label>
        </div>

        <div className="dashboard-actions">
          <button
            className="primary-button"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Creating recipe..."
              : "Create Recipe"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/drinks/${drinkId}/recipes`
              )
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateRecipePage;
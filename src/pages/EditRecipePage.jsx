import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import RecipeForm from "../features/recipes/forms/RecipeForm";

function EditRecipePage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [publiclyVisible, setPubliclyVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ingredientRows, setIngredientRows] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/recipes/${recipeId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load recipe");
        }

        const data = await response.json();

        setName(data.name);
        setInstructions(data.instructions);
        setPubliclyVisible(data.publicly_visible);

        setIngredientRows(
          data.ingredients.map((ingredient) => ({
            recipe_ingredient_id: ingredient.recipe_ingredient_id,
            ingredient_id: ingredient.ingredient_id,
            ingredient_name: ingredient.name,
            search_term: ingredient.name,
            matches: [],
            amount: ingredient.amount,
            measurement_unit: ingredient.measurement_unit,
            searching: false,
            creating: false,
          }))
        );

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/recipes/${recipeId}`,
        {
          method: "PATCH",
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

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.errors?.join(", ") ||
            "Unable to update recipe"
        );
        return;
      }

      navigate("/my-recipes");
    } catch {
      setError("The server could not be reached.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">Edit Recipe</h1>

        <p className="page-header-description">
          Adjust this recipe and its ingredients.
        </p>
      </header>

      {error && <p>{error}</p>}

      <RecipeForm
        name={name}
        setName={setName}
        instructions={instructions}
        setInstructions={setInstructions}
        publiclyVisible={publiclyVisible}
        setPubliclyVisible={setPubliclyVisible}
        ingredientRows={ingredientRows}
        setIngredientRows={setIngredientRows}
        setError={setError}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Save Changes"
      />
    </main>
  );
}

export default EditRecipePage;
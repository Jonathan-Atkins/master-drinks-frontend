import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

function UserRecipesCollection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/my_recipes`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load your recipes");
        }

        const data = await response.json();

        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/recipes/${recipeId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete recipe");
      }

      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRemoveSavedRecipe = async (userRecipeId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/user_recipes/${userRecipeId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to remove saved recipe");
      }

      setRecipes((currentRecipes) =>
        currentRecipes.filter(
          (recipe) => recipe.user_recipe_id !== userRecipeId
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes yet.</p>;
  }

  return (
    <section>
      {recipes.map((recipe) => (
        <article key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.instructions}</p>

          {recipe.owned_by_current_user ? (
            <>
              <button
                type="button"
                onClick={() =>
                  navigate(`/recipes/${recipe.id}/edit`)
                }
              >
                Edit Recipe
              </button>

              <button
                type="button"
                onClick={() => handleDeleteRecipe(recipe.id)}
              >
                Delete Recipe
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() =>
                handleRemoveSavedRecipe(recipe.user_recipe_id)
              }
            >
              Remove from My Recipes
            </button>
          )}
        </article>
      ))}
    </section>
  );
}

export default UserRecipesCollection;
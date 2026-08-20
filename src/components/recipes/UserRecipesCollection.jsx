import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import RecipeCard from "./RecipeCard";

function UserRecipesCollection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


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
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={handleDeleteRecipe}
          onRemoveSaved={handleRemoveSavedRecipe}
        />
      ))}
    </section>
);
}

export default UserRecipesCollection;
import { useEffect, useState } from "react";

import { API_URL } from "../../config/api";
import { groupRecipesByCategory } from "../utils/recipeUtils";

import RecipeCard from "./RecipeCard";

function RecipesCollection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleToggleSaved = (
    recipeId,
    { saved, userRecipeId }
  ) => {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              saved_by_current_user: saved,
              user_recipe_id: userRecipeId,
            }
          : recipe
      )
    );
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/recipes`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load recipes");
        }

        const data = await response.json();

        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const recipesByCategory =
    groupRecipesByCategory(recipes);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Recipes created by other bartenders</h2>

      {Object.entries(recipesByCategory).map(
        ([category, categoryRecipes]) => (
          <section key={category}>
            <h2>{category}</h2>

            <div className="recipe-grid">
              {categoryRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onToggleSaved={handleToggleSaved}
                />
              ))}
            </div>
          </section>
        )
      )}
    </section>
  );
}

export default RecipesCollection;
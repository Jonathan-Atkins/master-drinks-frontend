import { useEffect, useState } from "react";
import { groupRecipesByCategory } from "../utils/recipeUtils";
import RecipeCard from "./RecipeCard";

function RecipesCollection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/recipes",
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

    const recipesByCategory = groupRecipesByCategory(recipes);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>All Recipes</h2>

      {Object.entries(recipesByCategory).map(
        ([category, categoryRecipes]) => (
          <section key={category}>
            <h2>{category}</h2>

            <div className="recipe-grid">
              {categoryRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
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
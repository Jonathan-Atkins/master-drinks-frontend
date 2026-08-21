import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "../../config/api";

import JitterText from "../ui/JitterText";
import RecipeCard from "./RecipeCard";
import RotatingDrinkNames from "../drinks/RotatingDrinkNames";

function UserRecipesCollection() {
  const [recipes, setRecipes] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserContent = async () => {
      try {
        const [recipesResponse, drinksResponse] =
          await Promise.all([
            fetch(`${API_URL}/api/v1/my_recipes`, {
              credentials: "include",
            }),

            fetch(`${API_URL}/api/v1/my_drinks`, {
              credentials: "include",
            }),
          ]);

        if (!recipesResponse.ok) {
          throw new Error(
            "Unable to load your recipes"
          );
        }

        if (!drinksResponse.ok) {
          throw new Error(
            "Unable to load your drinks"
          );
        }

        const recipesData =
          await recipesResponse.json();

        const drinksData =
          await drinksResponse.json();

        setRecipes(recipesData);
        setDrinks(drinksData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserContent();
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
        throw new Error(
          "Unable to delete recipe"
        );
      }

      setRecipes((currentRecipes) =>
        currentRecipes.filter(
          (recipe) => recipe.id !== recipeId
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRemoveSavedRecipe = async (
    userRecipeId
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/user_recipes/${userRecipeId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to remove saved recipe"
        );
      }

      setRecipes((currentRecipes) =>
        currentRecipes.filter(
          (recipe) =>
            recipe.user_recipe_id !==
            userRecipeId
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

  if (drinks.length === 0) {
    return (
      <div className="empty-recipes-state">
        <h2 className="page-header empty-recipes-heading">
          We need to{" "}
          <Link
            to="/drink-maker"
            className="empty-recipes-link"
          >
            <JitterText>Create a Drink</JitterText>
          </Link>
        </h2>

        <p className="page-header-description empty-recipes-description">
          for our Recipes, or Add one from the{" "}
          <Link
            to="/recipes"
            className="empty-recipes-link"
          >
            <JitterText>Community!</JitterText>
          </Link>
        </p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="empty-recipes-state">
        <p className="empty-recipes-rotate-line">
          <span>Let&apos;s add a Recipe to</span>

          <RotatingDrinkNames drinks={drinks} />
        </p>
      </div>
    );
  }

  return (
    <section>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={handleDeleteRecipe}
          onRemoveSaved={
            handleRemoveSavedRecipe
          }
        />
      ))}
    </section>
  );
}

export default UserRecipesCollection;
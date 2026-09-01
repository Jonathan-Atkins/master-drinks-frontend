import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "../../../config/api";

import JitterText from "../../../components/ui/JitterText";
import RecipeCard from "./RecipeCard";

function UserRecipesCollection() {
  const [recipes, setRecipes] =
    useState([]);

  const [drinks, setDrinks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchUserContent =
      async () => {
        try {
          const [
            recipesResponse,
            drinksResponse,
          ] = await Promise.all([
            fetch(
              `${API_URL}/api/v1/my_recipes`,
              {
                credentials:
                  "include",
              }
            ),

            fetch(
              `${API_URL}/api/v1/my_drinks`,
              {
                credentials:
                  "include",
              }
            ),
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

  const handleDeleteRecipe =
    async (recipeId) => {
      try {
        const response =
          await fetch(
            `${API_URL}/api/v1/recipes/${recipeId}`,
            {
              method: "DELETE",
              credentials:
                "include",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to delete recipe"
          );
        }

        setRecipes(
          (currentRecipes) =>
            currentRecipes.filter(
              (recipe) =>
                recipe.id !==
                recipeId
            )
        );

        setDrinks(
          (currentDrinks) =>
            currentDrinks.map(
              (drink) => {
                if (
                  drink.id !==
                  recipes.find(
                    (recipe) =>
                      recipe.id ===
                      recipeId
                  )?.drink?.id
                ) {
                  return drink;
                }

                return {
                  ...drink,
                  recipe_count:
                    Math.max(
                      Number(
                        drink.recipe_count
                      ) - 1,
                      0
                    ),
                };
              }
            )
        );
      } catch (error) {
        setError(error.message);
      }
    };

  const handleRemoveSavedRecipe =
    async (userRecipeId) => {
      try {
        const response =
          await fetch(
            `${API_URL}/api/v1/user_recipes/${userRecipeId}`,
            {
              method: "DELETE",
              credentials:
                "include",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to remove saved recipe"
          );
        }

        setRecipes(
          (currentRecipes) =>
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
    return (
      <p>Loading recipes...</p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (drinks.length === 0) {
    return (
      <div className="empty-recipes-state">
        <div className="empty-recipes-message">
          <p className="empty-recipes-line">
            We Need to{" "}
            <Link
              to="/drink-maker"
              className="empty-recipes-link"
            >
              <JitterText>
                Create A Drink
              </JitterText>
            </Link>{" "}
            for our recipes
          </p>

          <p className="empty-recipes-line">
            Or Add One From the{" "}
            <Link
              to="/recipes"
              className="empty-recipes-link"
            >
              <JitterText>
                Community!
              </JitterText>
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const drinksNeedingRecipes =
    drinks.filter(
      (drink) =>
        Number(
          drink.recipe_count
        ) === 0
    );

  return (
    <div className="user-recipes-content">
      {drinksNeedingRecipes.length >
        0 && (
        <section className="drinks-needing-recipes">
          <header className="drinks-needing-recipes-header">
            <h2>
              Drinks Needing Recipes
            </h2>

            <p>
              Finish these drinks by
              adding their first recipe.
            </p>
          </header>

          <div className="drinks-needing-recipes-grid">
            {drinksNeedingRecipes.map(
              (drink) => (
                <article
                  key={drink.id}
                  className="drink-needing-recipe-card"
                >
                  <h3>
                    {drink.name}
                  </h3>

                  <div className="drink-needing-recipe-details">
                    <p>
                      <strong>
                        Category:
                      </strong>{" "}
                      {drink.categories
                        ?.map(
                          (
                            category
                          ) =>
                            category.name
                        )
                        .join(", ") ||
                        "Uncategorized"}
                    </p>

                    <p>
                      <strong>
                        Alcoholic:
                      </strong>{" "}
                      {drink.alcoholic
                        ? "Yes"
                        : "No"}
                    </p>

                    <p>
                      <strong>
                        Recipes:
                      </strong>{" "}
                      0
                    </p>
                  </div>

                  <div className="drink-needing-recipe-actions">
                    <Link
                      to={`/drinks/${drink.id}/recipes/new`}
                      className="drink-needing-recipe-primary"
                    >
                      Add Recipe
                    </Link>

                    <Link
                      to={`/drinks/${drink.id}/edit`}
                      className="drink-needing-recipe-secondary"
                    >
                      Edit Drink
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        </section>
      )}

      {recipes.length > 0 && (
        <section className="user-recipes-section">
          <h2 className="user-recipes-heading">
            Your Recipes
          </h2>

          <div className="my-recipes-grid">
            {recipes.map(
              (recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onDelete={
                    handleDeleteRecipe
                  }
                  onRemoveSaved={
                    handleRemoveSavedRecipe
                  }
                />
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default UserRecipesCollection;
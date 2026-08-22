import { useEffect, useMemo, useState } from "react";

import { API_URL } from "../../config/api";

import RecipeCard from "./RecipeCard";

function getCategoryLabel(recipe) {
  const categories =
    recipe.drink.categories || [];

  if (categories.length > 1) {
    return "Multi-Liquor";
  }

  if (categories.length === 0) {
    return "Uncategorized";
  }

  return categories[0]
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function RecipesCollection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] =
    useState("category");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("all");

  const [
    alcoholFilter,
    setAlcoholFilter,
  ] = useState("all");

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
          throw new Error(
            "Unable to load recipes"
          );
        }

        const data =
          await response.json();

        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleToggleSaved = (
    recipeId,
    { saved, userRecipeId }
  ) => {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) => {
        if (recipe.id !== recipeId) {
          return recipe;
        }

        const previousSaved =
          recipe.saved_by_current_user;

        let saveCount =
          recipe.save_count || 0;

        if (!previousSaved && saved) {
          saveCount += 1;
        }

        if (previousSaved && !saved) {
          saveCount = Math.max(
            saveCount - 1,
            0
          );
        }

        return {
          ...recipe,
          saved_by_current_user:
            saved,
          user_recipe_id:
            userRecipeId,
          save_count: saveCount,
        };
      })
    );
  };

  const handleClearFilters = () => {
    setSortBy("category");
    setCategoryFilter("all");
    setAlcoholFilter("all");
  };

  const categories = useMemo(() => {
    const categoryNames =
      recipes.map((recipe) =>
        getCategoryLabel(recipe)
      );

    return [
      ...new Set(categoryNames),
    ].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [recipes]);

  const filteredRecipes =
    useMemo(() => {
      return recipes.filter(
        (recipe) => {
          const category =
            getCategoryLabel(recipe);

          const matchesCategory =
            categoryFilter ===
              "all" ||
            category ===
              categoryFilter;

          const matchesAlcohol =
            alcoholFilter ===
              "all" ||
            (alcoholFilter ===
              "alcoholic" &&
              recipe.drink
                .alcoholic) ||
            (alcoholFilter ===
              "non-alcoholic" &&
              !recipe.drink
                .alcoholic);

          return (
            matchesCategory &&
            matchesAlcohol
          );
        }
      );
    }, [
      recipes,
      categoryFilter,
      alcoholFilter,
    ]);

  const sortedRecipes =
    useMemo(() => {
      const sorted = [
        ...filteredRecipes,
      ];

      if (sortBy === "saved") {
        return sorted.sort(
          (a, b) =>
            (b.save_count || 0) -
            (a.save_count || 0)
        );
      }

      if (sortBy === "recent") {
        return sorted.sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );
      }

      return sorted;
    }, [
      filteredRecipes,
      sortBy,
    ]);

  const groupedRecipes =
    useMemo(() => {
      if (sortBy !== "category") {
        return {};
      }

      return sortedRecipes.reduce(
        (groups, recipe) => {
          const category =
            getCategoryLabel(recipe);

          if (!groups[category]) {
            groups[category] = [];
          }

          groups[category].push(
            recipe
          );

          return groups;
        },
        {}
      );
    }, [
      sortedRecipes,
      sortBy,
    ]);

  const filtersAreActive =
    sortBy !== "category" ||
    categoryFilter !== "all" ||
    alcoholFilter !== "all";

  if (loading) {
    return (
      <p>Loading recipes...</p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>
        Recipes created by other
        bartenders
      </h2>

      <div className="community-recipe-controls">
        <div className="community-recipe-filter">
          <label htmlFor="recipe-sort">
            Sort
          </label>

          <select
            id="recipe-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value
              )
            }
          >
            <option value="recent">
              Most Recent
            </option>

            <option value="saved">
              Most Saved
            </option>

            <option value="category">
              A-Z by Category
            </option>
          </select>
        </div>

        <div className="community-recipe-filter">
          <label htmlFor="category-filter">
            Category
          </label>

          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
          >
            <option value="all">
              All Categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        <div className="community-recipe-filter">
          <label htmlFor="alcohol-filter">
            Alcohol
          </label>

          <select
            id="alcohol-filter"
            value={alcoholFilter}
            onChange={(event) =>
              setAlcoholFilter(
                event.target.value
              )
            }
          >
            <option value="all">
              All
            </option>

            <option value="alcoholic">
              Alcoholic
            </option>

            <option value="non-alcoholic">
              Non-Alcoholic
            </option>
          </select>
        </div>

        <button
          type="button"
          className="community-recipe-clear"
          onClick={handleClearFilters}
          disabled={!filtersAreActive}
        >
          Clear Filters
        </button>
      </div>

      {sortBy === "category" ? (
        Object.keys(
          groupedRecipes
        )
          .sort((a, b) =>
            a.localeCompare(b)
          )
          .map((category) => (
            <section
              className="community-category-section"
              key={category}
            >
              <h2>
                {category}
              </h2>

              <div className="community-recipes-grid">
                {groupedRecipes[
                  category
                ].map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onToggleSaved={
                      handleToggleSaved
                    }
                    showSaveCount
                  />
                ))}
              </div>
            </section>
          ))
      ) : (
        <div className="community-recipes-grid">
          {sortedRecipes.map(
            (recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleSaved={
                  handleToggleSaved
                }
                showSaveCount
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

export default RecipesCollection;
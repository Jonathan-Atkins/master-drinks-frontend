import { Link } from "react-router-dom";

import SaveRecipeButton from "../../../components/ui/SaveRecipeButton";
import AnimatedButton from "../../../components/ui/AnimatedButton";

function formatCategory(category) {
  const value =
    typeof category === "string"
      ? category
      : category?.name ||
        category?.slug ||
        "";

  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function getCategories(recipe) {
  const categories =
    recipe.drink?.categories || [];

  if (categories.length === 0) {
    return "Uncategorized";
  }

  return categories
    .map(formatCategory)
    .filter(Boolean)
    .join(", ");
}

function RecipeDetail({
  recipe,
  onToggleSaved,
  onEdit,
  onDelete,
}) {
  const username =
    recipe.drink?.username;

  const saveCount =
    recipe.save_count || 0;

  return (
    <article className="recipe-detail-card">
      <div className="recipe-detail-hero">
        <section className="recipe-detail-image-placeholder">
          <strong>
            Future Image Area
          </strong>

          <span>
            Recipe image coming soon.
          </span>
        </section>

        <header className="recipe-detail-header">
          <h1>
            {recipe.name}
          </h1>

          {username && (
            <p>
              Created by:{" "}
              <Link
                className="recipe-detail-creator"
                to={`/community/${username}`}
              >
                @{username}
              </Link>
            </p>
          )}

          <p>
            <strong>Drink:</strong>{" "}
            {recipe.drink?.name}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {getCategories(recipe)}
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {recipe.drink?.alcoholic
              ? "Alcoholic"
              : "Non-Alcoholic"}
          </p>

          <p>
            <strong>Visibility:</strong>{" "}
            {recipe.publicly_visible
              ? "Public"
              : "Private"}
          </p>

          <p>
            <strong>Saves:</strong>{" "}
            {saveCount}
          </p>
        </header>
      </div>

      <section className="recipe-detail-section">
        <h2>Ingredients</h2>

        <div className="recipe-detail-ingredients">
          {recipe.ingredients?.map(
            (ingredient, index) => (
              <p key={index}>
                {ingredient.amount}{" "}
                {ingredient.measurement_unit}{" "}
                {ingredient.name}
              </p>
            )
          )}
        </div>
      </section>

      <section className="recipe-detail-section">
        <h2>Instructions</h2>

        <p className="recipe-detail-instructions">
          {recipe.instructions}
        </p>
      </section>

      {!recipe.owned_by_current_user && (
        <div className="recipe-detail-actions">
          <SaveRecipeButton
            recipeId={recipe.id}
            saved={
              recipe.saved_by_current_user
            }
            userRecipeId={
              recipe.user_recipe_id
            }
            onToggle={
              onToggleSaved
            }
          />
        </div>
      )}

      {recipe.owned_by_current_user && (
        <div className="recipe-detail-actions">
          <AnimatedButton
            variant="edit"
            onClick={onEdit}
          >
            Edit Recipe
          </AnimatedButton>

          <AnimatedButton
            variant="delete"
            onClick={onDelete}
          >
            Delete
          </AnimatedButton>
        </div>
      )}
    </article>
  );
}

export default RecipeDetail;
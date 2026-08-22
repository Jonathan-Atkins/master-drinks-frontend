import { useNavigate } from "react-router-dom";

import SaveRecipeButton from "../ui/SaveRecipeButton";
import AnimatedButton from "../ui/AnimatedButton";

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

function RecipeCard({
  recipe,
  onDelete,
  onToggleSaved,
  showSaveCount = false,
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/recipes/${recipe.id}/edit`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${recipe.name}?`
    );

    if (!confirmed) {
      return;
    }

    onDelete?.(recipe.id);
  };

  const category =
    getCategoryLabel(recipe);

  const visibleIngredients =
    recipe.ingredients.slice(0, 3);

  const hasMoreIngredients =
    recipe.ingredients.length > 3;

  const saveCount =
    recipe.save_count || 0;

  return (
    <article className="recipe-card">
      <h2>
        {recipe.owned_by_current_user
          ? "This is Your Recipe"
          : `Created by: ${recipe.drink.username}`}
      </h2>

      <h3>{recipe.name}</h3>

      <p>
        <strong>Drink:</strong>{" "}
        <span>{recipe.drink.name}</span>
      </p>

      <p>
        <strong>Category:</strong>{" "}
        <span>{category}</span>
      </p>

      <div className="recipe-card-instructions-section">
        <strong>Instructions:</strong>

        <p className="recipe-card-instructions">
          {recipe.instructions}
        </p>
      </div>

      <div className="recipe-card-ingredients">
        <strong>Ingredients:</strong>

        <div className="recipe-card-ingredient-list">
          {visibleIngredients.map(
            (ingredient, index) => (
              <p key={index}>
                {ingredient.amount}{" "}
                {ingredient.measurement_unit}{" "}
                {ingredient.name}
              </p>
            )
          )}

          {hasMoreIngredients && (
            <p className="recipe-card-more">
              ...
            </p>
          )}
        </div>
      </div>

      {!recipe.owned_by_current_user && (
        <div className="recipe-card-save-section">
          <SaveRecipeButton
            recipeId={recipe.id}
            saved={recipe.saved_by_current_user}
            userRecipeId={recipe.user_recipe_id}
            onToggle={(savedData) =>
              onToggleSaved?.(
                recipe.id,
                savedData
              )
            }
          />

          {showSaveCount && (
            <span className="recipe-card-save-count">
              {saveCount}{" "}
              {saveCount === 1
                ? "save"
                : "saves"}
            </span>
          )}
        </div>
      )}

      {recipe.owned_by_current_user && (
        <>
          <div className="recipe-card-actions">
            <AnimatedButton
              variant="edit"
              onClick={handleEdit}
            >
              Edit Recipe
            </AnimatedButton>

            <AnimatedButton
              variant="delete"
              onClick={handleDelete}
            >
              Delete
            </AnimatedButton>
          </div>

          {showSaveCount && (
            <span className="recipe-card-owner-save-count">
              {saveCount}{" "}
              {saveCount === 1
                ? "save"
                : "saves"}
            </span>
          )}
        </>
      )}
    </article>
  );
}

export default RecipeCard;
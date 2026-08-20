import { useNavigate } from "react-router-dom";
import SaveRecipeButton from "../ui/SaveRecipeButton";

function RecipeCard({ recipe, onDelete, onToggleSaved }) {
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

  const categories =
    recipe.drink.categories?.join(", ") || "Uncategorized";

  return (
    <article className="recipe-card">
      <h2>
        {recipe.owned_by_current_user
          ? "This is Your Recipe"
          : `Created by: ${recipe.drink.username}`}
      </h2>

      <h3>{recipe.name}</h3>

      <p>
        <strong>Drink:</strong> {recipe.drink.name}
      </p>

      <p>
        <strong>Categories:</strong> {categories}
      </p>

      <p>
        <strong>Instructions:</strong> {recipe.instructions}
      </p>

      <div>
        <strong>Ingredients:</strong>

        {recipe.ingredients.map((ingredient, index) => (
          <p key={index}>
            {ingredient.amount}{" "}
            {ingredient.measurement_unit}{" "}
            {ingredient.name}
          </p>
        ))}
      </div>

      {!recipe.owned_by_current_user && (
        <>
          <p>
            Saved: {recipe.saved_by_current_user ? "True" : "False"}
          </p>

          <SaveRecipeButton
            recipeId={recipe.id}
            saved={recipe.saved_by_current_user}
            userRecipeId={recipe.user_recipe_id}
            onToggle={(savedData) =>
              onToggleSaved?.(recipe.id, savedData)
            }
          />
        </>
      )}

      {recipe.owned_by_current_user && (
        <>
          <button
            type="button"
            onClick={handleEdit}
          >
            Edit Recipe
          </button>

          <button
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </>
      )}
    </article>
  );
}

export default RecipeCard;
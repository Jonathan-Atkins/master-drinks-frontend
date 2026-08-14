import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, editing = false, onDelete }) {
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

    onDelete(recipe.id);
  };

  return (
    <article className="recipe-card">
      <h2>
        {recipe.owned_by_current_user
          ? "This is Your Recipe"
          : `Created by: ${recipe.drink.username}`}
      </h2>

      {editing ? (
        <input
          type="text"
          defaultValue={recipe.name}
        />
      ) : (
        <h3>{recipe.name}</h3>
      )}

      <p>
        <strong>Drink:</strong> {recipe.drink.name}
      </p>

      <p>
        <strong>Category:</strong> {recipe.drink.category}
      </p>

      {editing ? (
        <div>
          <label htmlFor="recipe-instructions">
            Instructions
          </label>

          <textarea
            id="recipe-instructions"
            defaultValue={recipe.instructions}
          />
        </div>
      ) : (
        <p>
          <strong>Instructions:</strong> {recipe.instructions}
        </p>
      )}

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
        <p>
          Saved: {recipe.saved_by_current_user ? "True" : "False"}
        </p>
      )}

      {recipe.owned_by_current_user && !editing && (
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
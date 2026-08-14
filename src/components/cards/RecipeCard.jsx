function RecipeCard({ recipe, editing = false }) {
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
            {ingredient.amount} {ingredient.measurement_unit} {ingredient.name}
          </p>
        ))}
      </div>

      {!recipe.owned_by_current_user && (
        <p>
          Saved: {recipe.saved_by_current_user ? "True" : "False"}
        </p>
      )}
    </article>
  );
}

export default RecipeCard;
function RecipeCard({ recipe }) {
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
        <strong>Category:</strong> {recipe.drink.category}
      </p>

      <p>
        <strong>Instructions:</strong> {recipe.instructions}
      </p>

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
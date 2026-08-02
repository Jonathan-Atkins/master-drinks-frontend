import { useNavigate, useParams } from "react-router-dom";

function DrinkRecipesPage() {
  const { drinkId } = useParams();
  const navigate = useNavigate();

  return (
    <main>
      <h1>Drink Recipes</h1>

      <button
        type="button"
        onClick={() => navigate(`/drinks/${drinkId}/recipes/new`)}
      >
        Add Recipe
      </button>

      <p>Recipes for drink ID: {drinkId}</p>
    </main>
  );
}

export default DrinkRecipesPage;
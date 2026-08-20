import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../components/recipes/RecipeCard";
import { API_URL } from "../config/api";

function DrinkRecipesPage() {
  const { drinkId } = useParams();
  const navigate = useNavigate();

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
  const fetchPageData = async () => {
    try {
      const [drinkResponse, recipesResponse] = await Promise.all([
        fetch(`${API_URL}/api/v1/drinks/${drinkId}`, {
          credentials: "include",
        }),

        fetch(`${API_URL}/api/v1/drinks/${drinkId}/recipes`, {
          credentials: "include",
        }),
      ]);

      if (!drinkResponse.ok) {
        throw new Error("Unable to load drink");
      }

      if (!recipesResponse.ok) {
        throw new Error("Unable to load recipes");
      }

      const drinkData = await drinkResponse.json();
      const recipesData = await recipesResponse.json();

      setDrink(drinkData);
      setRecipes(recipesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchPageData();
}, [drinkId]);

  if (loading) {
    return <p>Loading drink...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>

      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">{drink.name} Recipes</h1>

        <p className="page-header-description">
          Manage your recipes for this drink.
        </p>
      </header>

      <div className="dashboard-actions">
        <button
          type="button"
          onClick={() =>
            navigate(`/drinks/${drinkId}/recipes/new`)
          }
        >
          Add Recipe
        </button>
      </div>

      {recipes.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))
      )}
    </main>
  );
}

export default DrinkRecipesPage;
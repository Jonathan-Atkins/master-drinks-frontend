import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

function UserRecipesCollection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/my_recipes`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load your recipes");
        }

        const data = await response.json();

        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes yet.</p>;
  }

  return (
    <section>
      {recipes.map((recipe) => (
        <article key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.instructions}</p>
        </article>
      ))}
    </section>
  );
}

export default UserRecipesCollection;
import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";

function IngredientsCollection() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/ingredients`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load ingredients");
        }

        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (loading) {
    return <p>Loading ingredients...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (ingredients.length === 0) {
    return <p>No ingredients found.</p>;
  }

  return (
    <section>
      {ingredients.map((ingredient) => (
        <p key={ingredient.id}>Ingredient Name: {ingredient.name} | Associated Recipes: {ingredient.recipe_count}</p>
      ))}
    </section>
  );
}

export default IngredientsCollection;
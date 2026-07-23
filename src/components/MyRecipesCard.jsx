import { useEffect, useState } from "react";

function MyRecipesCard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/my_recipes", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unable to load recipes");
        }

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>My Recipes</h2>

      {recipes.length === 0 ? (
        <p>No Saved Recipes</p>
      ) : (
        recipes.map((recipe) => (
          <article key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>{recipe.instructions}</p>
            <p>
              {recipe.publicly_visible ? "Public" : "Private"}
            </p>
          </article>
        ))
      )}
    </section>
  );
}

export default MyRecipesCard;
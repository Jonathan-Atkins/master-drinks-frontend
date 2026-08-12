import { useEffect, useState } from "react";

function RecipesCollection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/recipes", {
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
      <h2>All Recipes</h2>

      {console.log("Data:", recipes)}
      
      {recipes.length === 0 ? (
        <p>No Saved Recipes</p>
      ) : (
        recipes.map((recipe) => (
          <article key={recipe.id}>
            <h2>{recipe.owned_by_current_user
              ? "This is Your Recipe"
              : `Created by: ${recipe.drink.username}`}
            </h2>
            <h3>{recipe.name}</h3>
            <p>{recipe.instructions}</p>
            {!recipe.owned_by_current_user && (
              <p>
                Saved: {recipe.saved_by_current_user ? "True" : "False"}
              </p>
            )}
          </article>
        ))
      )};
    </section>
  );
}

export default RecipesCollection;
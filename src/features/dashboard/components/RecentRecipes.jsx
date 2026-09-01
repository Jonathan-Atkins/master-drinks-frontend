import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "../../../config/api";

function RecentRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentRecipes = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/recipes`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load recent recipes"
          );
        }

        const data = await response.json();

        const recentRecipes = [...data]
          .sort(
            (a, b) =>
              new Date(b.created_at) -
              new Date(a.created_at)
          )
          .slice(0, 3);

        setRecipes(recentRecipes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentRecipes();
  }, []);

  const handleOpenRecipe = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleCardKeyDown = (
    event,
    recipeId
  ) => {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    event.preventDefault();

    handleOpenRecipe(recipeId);
  };

  return (
    <section className="dashboard-section">
      <div className="dashboard-section-header">
        <h2>
          Recently Added from Community
        </h2>

        <Link
          to="/recipes"
          className="dashboard-section-link"
        >
          Browse All
        </Link>
      </div>

      {loading && (
        <p className="dashboard-recent-status">
          Loading recent cocktails...
        </p>
      )}

      {error && (
        <p className="dashboard-recent-status">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        recipes.length === 0 && (
          <p className="dashboard-recent-status">
            No community recipes yet.
          </p>
        )}

      {!loading &&
        !error &&
        recipes.length > 0 && (
          <div className="dashboard-recent-grid">
            {recipes.map((recipe) => (
              <article
                key={recipe.id}
                className="dashboard-recent-card"
                role="link"
                tabIndex={0}
                aria-label={`View ${recipe.name} recipe`}
                onClick={() =>
                  handleOpenRecipe(recipe.id)
                }
                onKeyDown={(event) =>
                  handleCardKeyDown(
                    event,
                    recipe.id
                  )
                }
              >
                <h3>
                  {recipe.name ||
                    recipe.drink?.name ||
                    "Untitled Recipe"}
                </h3>

                {recipe.drink?.categories?.length >
                  0 && (
                  <p>
                    {recipe.drink.categories
                      .map((category) =>
                        typeof category ===
                        "string"
                          ? category
                          : category.name
                      )
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}

                <Link
                  to={`/recipes/${recipe.id}`}
                  className="dashboard-recent-link"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  View Recipe
                </Link>
              </article>
            ))}
          </div>
        )}
    </section>
  );
}

export default RecentRecipes;
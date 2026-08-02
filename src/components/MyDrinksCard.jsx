import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

function MyDrinksCard() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyDrinks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/my_drinks`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unable to load drinks");
        }

        const data = await response.json();
        setDrinks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyDrinks();
  }, []);

  if (loading) {
    return <p>Loading drinks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="dashboard-section">
      <h2>My Drinks</h2>

      {drinks.length === 0 ? (
        <p>No drinks yet.</p>
      ) : (
        <div className="drink-grid">
          {drinks.map((drink) => (
            <article
              className="drink-card"
              key={drink.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/drinks/${drink.id}/recipes`)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  navigate(`/drinks/${drink.id}/recipes`);
                }
              }}
            >
              <h3>{drink.name}</h3>

              <dl className="drink-details">
                <div>
                  <dt>Category</dt>
                  <dd>{drink.category}</dd>
                </div>

                <div>
                  <dt>Alcoholic</dt>
                  <dd>{String(drink.alcoholic)}</dd>
                </div>

                <div>
                  <dt>Associated recipes</dt>
                  <dd>{drink.recipe_count}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyDrinksCard;
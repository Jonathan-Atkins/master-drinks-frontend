import { useEffect, useState } from "react";

function MyDrinksCard() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyDrinks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/my_drinks", {
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
    <section>
      <h2>My Drinks</h2>

      {drinks.length === 0 ? (
        <p>No Saved Drinks</p>
      ) : (
        drinks.map((drink) => (
          <article key={drink.id}>
            <h3>{drink.name}</h3>
            <p>{drink.category}</p>
            <p>{drink.alcoholic ? "Alcoholic" : "Non-alcoholic"}</p>
          </article>
        ))
      )}
    </section>
  );
}

export default MyDrinksCard;
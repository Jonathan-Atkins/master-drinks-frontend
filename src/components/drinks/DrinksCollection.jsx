import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JitterText from "../ui/JitterText";

import { API_URL } from "../../config/api";
import DrinkCard from "./DrinkCard";

function DrinksCollection() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/my_drinks`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load your drinks"
          );
        }

        const data = await response.json();

        setDrinks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  const handleDelete = async (drinkId) => {
    setDeleteError("");

    try {
      const response = await fetch(
        `${API_URL}/api/v1/drinks/${drinkId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete the drink"
        );
      }

      setDrinks((currentDrinks) =>
        currentDrinks.filter(
          (drink) => drink.id !== drinkId
        )
      );
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  if (loading) {
    return <p>Loading drinks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (drinks.length === 0) {
    return (
      <div className="empty-drinks-state">
        No Drinks Yet, Let&apos;s

        <Link
          to="/drink-maker"
          className="empty-drinks-link"
        >
          <JitterText>Create A Drink!</JitterText>
        </Link>
      </div>
    );
  }

  return (
    <>
      {deleteError && (
        <p
          className="form-error"
          role="alert"
        >
          {deleteError}
        </p>
      )}

      <section className="drink-grid">
        {drinks.map((drink) => (
          <DrinkCard
            key={drink.id}
            drink={drink}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </>
  );
}

export default DrinksCollection;
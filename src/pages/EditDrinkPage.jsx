import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import DrinkForm from "../components/forms/DrinkForm";

function EditDrinkPage() {
  const { drinkId } = useParams();
  const navigate = useNavigate();

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/drinks/${drinkId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load drink.");
        }

        const data = await response.json();
          console.log(data);
          console.log("CATEGORY FROM API:", data.category);
        setDrink(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrink();
  }, [drinkId]);

  if (loading) {
    return <p>Loading drink...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">Edit Drink</h1>

        <p className="page-header-description">
          Update your drink details.
        </p>
      </header>

      <DrinkForm drink={drink} />
    </main>
  );
}

export default EditDrinkPage;
import { useNavigate } from "react-router-dom";
import MyDrinksCard from "../components/MyDrinksCard";
import MyRecipesCard from "../components/MyRecipesCard";

function PersonalPage() {
  const navigate = useNavigate();

  const handleCreateDrink = () => {
    navigate("/drink-maker");
  };

  return (
    <main>
      <h1>My Dashboard</h1>

      <button type="button" onClick={handleCreateDrink}>
        Create a Drink
      </button>

      <MyDrinksCard />
      <MyRecipesCard />
    </main>
  );
}

export default PersonalPage;
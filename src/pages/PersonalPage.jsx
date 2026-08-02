import { useNavigate } from "react-router-dom";
import MyDrinksCard from "../components/MyDrinksCard";

function PersonalPage() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>My Dashboard</h1>
          <p>Manage your drinks and recipes.</p>
        </div>

        <div className="dashboard-actions">
          <button
            className="primary-button"
            type="button"
            onClick={() => navigate("/drink-maker")}
          >
            Create a Drink
          </button>

          <button
            className="primary-button"
            type="button"
            onClick={() => navigate("/my-recipes")}
          >
            My Recipes
          </button>

          <button
            className="primary-button"
            type="button"
            onClick={() => navigate("/recipes")}
          >
            Community Recipes
          </button>
        </div>
      </header>

      <MyDrinksCard />
    </main>
  );
}

export default PersonalPage;
import IngredientsCollection from "../features/ingredients/components/IngredientsCollection";
import { useNavigate } from "react-router-dom";

function IngredientsPage() {
  const navigate = useNavigate();

  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">Ingredients</h1>

        <p className="page-header-description">
          Search and manage the ingredients you use in recipes.
        </p>
      </header>

      <button
        type="button"
        className="primary-button"
        onClick={() => navigate("/ingredients/new")}
      >
        Add Ingredient
      </button>

      <IngredientsCollection />
    </main>
  );
}

export default IngredientsPage;

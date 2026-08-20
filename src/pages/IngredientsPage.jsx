import IngredientsCollection from "../components/ingredients/IngredientsCollection";
import { useNavigate } from "react-router-dom";

function IngredientsPage() {
  const navigate = useNavigate();

  return (
    <main>
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="page-header">
        <h1>Ingredients</h1>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/ingredients/new")}
        >
          Add Ingredient
        </button>
      </div>

      <IngredientsCollection />
    </main>
  );
}

export default IngredientsPage;

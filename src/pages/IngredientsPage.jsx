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

      <h1>Ingredients</h1>

      <IngredientsCollection />
    </main>
  );
}

export default IngredientsPage;
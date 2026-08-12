import { useNavigate } from "react-router-dom";
import RecipesCollection from "../components/RecipesCollection";

function AllRecipesPage() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Recipes Page</h1>

      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <RecipesCollection />
    </main>
  );
}

export default AllRecipesPage;
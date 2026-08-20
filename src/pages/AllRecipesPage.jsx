import { useNavigate } from "react-router-dom";
import RecipesCollection from "../components/recipes/RecipesCollection";

function AllRecipesPage() {
  const navigate = useNavigate();

  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">Community Recipes</h1>

        <p className="page-header-description">
          Explore recipes shared by the community.
        </p>
      </header>

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
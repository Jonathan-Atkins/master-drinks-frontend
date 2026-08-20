import { useNavigate } from "react-router-dom";
import UserRecipesCollection from "../components/recipes/UserRecipesCollection";

function UserRecipesPage() {
  const navigate = useNavigate();

  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">My Recipes</h1>

        <p className="page-header-description">
          Browse and manage your saved recipes.
        </p>
      </header>

      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <UserRecipesCollection />
    </main>
  );
}

export default UserRecipesPage;
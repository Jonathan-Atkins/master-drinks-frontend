import { useNavigate } from "react-router-dom";
import UserRecipesCollection from "../components/UserRecipesCollection";

function UserRecipesPage() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>My Recipes</h1>

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
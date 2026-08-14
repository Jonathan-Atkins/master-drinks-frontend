import { useNavigate } from "react-router-dom";
import SignOutButton from "../ui/SignOutButton";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav>
      <button
        type="button"
        onClick={() => navigate("/personal")}
      >
        Home
      </button>

      <button
        type="button"
        onClick={() => navigate("/my-recipes")}
      >
        My Recipes
      </button>

      <button
        type="button"
        onClick={() => navigate("/recipes")}
      >
        Community Recipes
      </button>

      <button
        type="button"
        onClick={() => navigate("/drink-maker")}
      >
        Create a Drink
      </button>

      <button
        type="button"
        onClick={() => navigate("/settings")}
      >
        Settings
      </button>
      
      <SignOutButton />
    </nav>
  );
}

export default NavBar;
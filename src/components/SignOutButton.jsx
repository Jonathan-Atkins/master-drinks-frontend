import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

function SignOutButton() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/logout`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to sign out");
      }

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
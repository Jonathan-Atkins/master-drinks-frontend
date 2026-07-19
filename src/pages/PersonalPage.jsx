import { useNavigate } from "react-router-dom";

function PersonalPage() {
  const navigate = useNavigate();

  const handleCreateDrink = () => {
    navigate("/drink-maker");
  };

  return (
    <main>
      <h1>My Dashboard</h1>

      <button type="button" onClick={handleCreateDrink}>
        Create a Drink
      </button>
    </main>
  );
}

export default PersonalPage;
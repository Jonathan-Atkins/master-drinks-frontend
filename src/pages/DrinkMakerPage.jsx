import { useNavigate } from "react-router-dom";
import DrinkForm from "../components/DrinkForm";

function DrinkMakerPage() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Create a Drink</h1>

      <button
        type="button"
        onClick={() => navigate("/personal")}
      >
        Dashboard
      </button>

      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <DrinkForm />
    </main>
  );
}

export default DrinkMakerPage;
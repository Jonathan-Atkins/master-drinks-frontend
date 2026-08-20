import { useNavigate } from "react-router-dom";
import DrinkForm from "../components/forms/DrinkForm";

function DrinkMakerPage() {
  const navigate = useNavigate();

  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">Create a Drink</h1>

        <p className="page-header-description">
          Build a new drink and save it to your collection.
        </p>
      </header>

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
import SquigglyUnderline from "../components/ui/SquigglyUnderline";
import DrinkForm from "../features/drinks/forms/DrinkForm";

function DrinkMakerPage() {
  return (
    <main>
      <header className="page-header-section">
        <SquigglyUnderline as="h1" className="page-header page-heading-underline" color="green">
          Create a Drink
        </SquigglyUnderline>

        <p className="page-header-description">
          Build a new drink and save it to your collection.
        </p>
      </header>

      <DrinkForm />
    </main>
  );
}

export default DrinkMakerPage;
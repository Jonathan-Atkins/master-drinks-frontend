import AnimatedUnderline from "../components/ui/AnimatedUnderline";
import DrinkForm from "../features/drinks/forms/DrinkForm";

function DrinkMakerPage() {
  return (
    <main>
      <header className="page-header-section">
        <AnimatedUnderline as="h1" className="page-header page-heading-underline" color="green">
          Create a Drink
        </AnimatedUnderline>

        <p className="page-header-description">
          Build a new drink and save it to your collection.
        </p>
      </header>

      <DrinkForm />
    </main>
  );
}

export default DrinkMakerPage;
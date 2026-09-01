import IngredientForm from "../features/ingredients/forms/IngredientForm";
import SquigglyUnderline from "../components/ui/SquigglyUnderline";

function NewIngredientPage() {
  return (
    <main>
      <header className="page-header-section">
        <SquigglyUnderline as="h1" className="page-header page-heading-underline" color="green">
          Add Ingredient
        </SquigglyUnderline>

        <p className="page-header-description">
          Add an ingredient to the shared ingredient collection.
        </p>
      </header>

      <IngredientForm />
    </main>
  );
}

export default NewIngredientPage;
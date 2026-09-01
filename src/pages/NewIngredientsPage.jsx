import IngredientForm from "../features/ingredients/forms/IngredientForm";
import AnimatedUnderline from "../components/ui/AnimatedUnderline";

function NewIngredientPage() {
  return (
    <main>
      <header className="page-header-section">
        <AnimatedUnderline as="h1" className="page-header page-heading-underline" color="green">
          Add Ingredient
        </AnimatedUnderline>

        <p className="page-header-description">
          Add an ingredient to the shared ingredient collection.
        </p>
      </header>

      <IngredientForm />
    </main>
  );
}

export default NewIngredientPage;
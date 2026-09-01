import IngredientForm from "../features/ingredients/forms/IngredientForm";

function NewIngredientPage() {
  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header page-heading-underline">
          Add Ingredient
        </h1>

        <p className="page-header-description">
          Add an ingredient to the shared ingredient collection.
        </p>
      </header>

      <IngredientForm />
    </main>
  );
}

export default NewIngredientPage;
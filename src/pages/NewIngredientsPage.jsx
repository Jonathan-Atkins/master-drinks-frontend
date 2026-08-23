import IngredientForm from "../components/forms/IngredientForm";

function NewIngredientPage() {
  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">
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
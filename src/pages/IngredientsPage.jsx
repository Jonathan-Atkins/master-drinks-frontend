import IngredientsCollection from "../features/ingredients/components/IngredientsCollection";

function IngredientsPage() {
  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">
          Ingredients
        </h1>

        <p className="page-header-description">
          Search and manage the ingredients you use in recipes.
        </p>
      </header>

      <IngredientsCollection />
    </main>
  );
}

export default IngredientsPage;
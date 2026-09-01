import IngredientsCollection from "../features/ingredients/components/IngredientsCollection";
import SquigglyUnderline from "../components/ui/SquigglyUnderline";

function IngredientsPage() {
  return (
    <main>
      <header className="page-header-section">
        <SquigglyUnderline as="h1" className="page-header page-heading-underline" color="green">
          Ingredients
        </SquigglyUnderline>

        <p className="page-header-description">
          Search and manage the ingredients you use in recipes.
        </p>
      </header>

      <IngredientsCollection />
    </main>
  );
}

export default IngredientsPage;
import IngredientsCollection from "../features/ingredients/components/IngredientsCollection";
import AnimatedUnderline from "../components/ui/AnimatedUnderline";

function IngredientsPage() {
  return (
    <main>
      <header className="page-header-section">
        <AnimatedUnderline as="h1" className="page-header page-heading-underline" color="green">
          Ingredients
        </AnimatedUnderline>

        <p className="page-header-description">
          Search and manage the ingredients you use in recipes.
        </p>
      </header>

      <IngredientsCollection />
    </main>
  );
}

export default IngredientsPage;
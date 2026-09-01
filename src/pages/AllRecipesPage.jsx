import RecipesCollection from "../features/recipes/components/RecipesCollection";
import AnimatedUnderline from "../components/ui/AnimatedUnderline";

function AllRecipesPage() {
  return (
    <main>
      <header className="page-header-section">
        <AnimatedUnderline as="h1" className="page-header page-heading-underline" color="green">
          Community Recipes
        </AnimatedUnderline>

        <p className="page-header-description">
          Explore recipes shared by the community.
        </p>
      </header>

      <RecipesCollection />
    </main>
  );
}

export default AllRecipesPage;
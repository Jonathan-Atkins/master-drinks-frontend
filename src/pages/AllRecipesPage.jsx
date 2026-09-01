import RecipesCollection from "../features/recipes/components/RecipesCollection";
import SquigglyUnderline from "../components/ui/SquigglyUnderline";

function AllRecipesPage() {
  return (
    <main>
      <header className="page-header-section">
        <SquigglyUnderline as="h1" className="page-header page-heading-underline" color="green">
          Community Recipes
        </SquigglyUnderline>

        <p className="page-header-description">
          Explore recipes shared by the community.
        </p>
      </header>

      <RecipesCollection />
    </main>
  );
}

export default AllRecipesPage;
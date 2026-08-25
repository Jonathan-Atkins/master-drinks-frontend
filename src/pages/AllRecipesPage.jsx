import RecipesCollection from "../features/recipes/components/RecipesCollection";

function AllRecipesPage() {
  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">Community Recipes</h1>

        <p className="page-header-description">
          Explore recipes shared by the community.
        </p>
      </header>

      <RecipesCollection />
    </main>
  );
}

export default AllRecipesPage;
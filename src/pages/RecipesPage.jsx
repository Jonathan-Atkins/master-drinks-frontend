import SquigglyUnderline from "../components/ui/SquigglyUnderline";
import UserRecipesCollection from "../features/recipes/components/UserRecipesCollection";

function UserRecipesPage() {
  return (
    <main>
      <header className="page-header-section">
        <SquigglyUnderline as="h1" className="page-header page-heading-underline" color="green">
          My Recipes
        </SquigglyUnderline>

        <p className="page-header-description">
          Browse and manage your saved recipes.
        </p>
      </header>

      <UserRecipesCollection />
    </main>
  );
}

export default UserRecipesPage;
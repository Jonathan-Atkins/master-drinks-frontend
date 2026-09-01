import AnimatedUnderline from "../components/ui/AnimatedUnderline";
import UserRecipesCollection from "../features/recipes/components/UserRecipesCollection";

function UserRecipesPage() {
  return (
    <main>
      <header className="page-header-section">
        <AnimatedUnderline as="h1" className="page-header page-heading-underline" color="green">
          My Recipes
        </AnimatedUnderline>

        <p className="page-header-description">
          Browse and manage your saved recipes.
        </p>
      </header>

      <UserRecipesCollection />
    </main>
  );
}

export default UserRecipesPage;
import UserRecipesCollection from "../features/recipes/components/UserRecipesCollection";

function UserRecipesPage() {
  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header page-heading-underline">My Recipes</h1>

        <p className="page-header-description">
          Browse and manage your saved recipes.
        </p>
      </header>

      <UserRecipesCollection />
    </main>
  );
}

export default UserRecipesPage;
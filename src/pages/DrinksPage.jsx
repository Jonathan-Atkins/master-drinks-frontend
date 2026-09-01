import SquigglyUnderline from "../components/ui/SquigglyUnderline";

function DrinksPage() {
  return (
    <main>
      <header className="page-header-section">
        <SquigglyUnderline as="h1" className="page-header page-heading-underline" color="green">
          Drinks Page
        </SquigglyUnderline>

        <p className="page-header-description">
          View and manage all drinks in your collection.
        </p>
      </header>
    </main>
  );
}

export default DrinksPage;

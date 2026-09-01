import AnimatedUnderline from "../components/ui/AnimatedUnderline";

function DrinksPage() {
  return (
    <main>
      <header className="page-header-section">
        <AnimatedUnderline as="h1" className="page-header page-heading-underline" color="green">
          Drinks Page
        </AnimatedUnderline>

        <p className="page-header-description">
          View and manage all drinks in your collection.
        </p>
      </header>
    </main>
  );
}

export default DrinksPage;

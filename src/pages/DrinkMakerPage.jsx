import DrinkForm from "../components/forms/DrinkForm";

function DrinkMakerPage() {
  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">Create a Drink</h1>

        <p className="page-header-description">
          Build a new drink and save it to your collection.
        </p>
      </header>

      <DrinkForm />
    </main>
  );
}

export default DrinkMakerPage;
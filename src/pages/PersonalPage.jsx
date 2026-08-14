import DrinksCollection from "../components/drinks/DrinksCollection";

function PersonalPage() {
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>My Dashboard</h1>
          <p>Manage your drinks and recipes.</p>
        </div>
      </header>
        <section>
          <h2>My Drinks</h2>
          <DrinksCollection />
        </section>
    </main>
  );
}

export default PersonalPage;
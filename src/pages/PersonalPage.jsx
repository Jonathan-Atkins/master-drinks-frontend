import MyDrinksCard from "../components/MyDrinksCard";

function PersonalPage() {
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>My Dashboard</h1>
          <p>Manage your drinks and recipes.</p>
        </div>
      </header>

      <MyDrinksCard />
    </main>
  );
}

export default PersonalPage;
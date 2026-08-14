import DrinksCollection from "../components/drinks/DrinksCollection";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);
  
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>{ user.username}'s Dashboard</h1>
          <p>Manage your Drinks here.</p>
        </div>
      </header>
        <section>
          <DrinksCollection />
        </section>
    </main>
  );
}

export default Dashboard;
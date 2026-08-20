import DrinksCollection from "../components/drinks/DrinksCollection";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);
  
  return (
    <main className="dashboard-page">
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">
          {user.username}&apos;s Dashboard
        </h1>

        <p className="page-header-description">Manage your Drinks here</p>
      </header>

      <section>
        <DrinksCollection />
      </section>
    </main>
  );
}

export default Dashboard;
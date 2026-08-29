import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import DashboardQuickActions from "../features/dashboard/components/DashboardQuickActions";
import RecentRecipes from "../features/dashboard/components/RecentRecipes";
import DrinksCollection from "../features/drinks/components/DrinksCollection";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <main className="dashboard-page">
      <header className="page-header-section dashboard-header">
        <h1 className="page-header animated-underline auto-underline">
          {user.username}&apos;s Dashboard
        </h1>

        <p className="page-header-description">
          What are we drinking today?
        </p>
      </header>

      <DashboardQuickActions />

      <RecentRecipes />

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>Your Drinks</h2>
        </div>

        <DrinksCollection />
      </section>
    </main>
  );
}

export default Dashboard;
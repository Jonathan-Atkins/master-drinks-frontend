import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import SquigglyUnderline from "../components/ui/SquigglyUnderline";
import DashboardQuickActions from "../features/dashboard/components/DashboardQuickActions";
import FunFactTicker from "../features/dashboard/components/FunFactTicker";
import RecentRecipes from "../features/dashboard/components/RecentRecipes";
import DrinksCollection from "../features/drinks/components/DrinksCollection";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <main className="dashboard-page">
      <header className="page-header-section dashboard-header">
        <SquigglyUnderline as="h1" className="page-header page-heading-underline" color="green">
          {user.username}&apos;s Dashboard
        </SquigglyUnderline>

        <p className="page-header-description">
          What are we drinking today?
        </p>
      </header>

      <FunFactTicker />

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
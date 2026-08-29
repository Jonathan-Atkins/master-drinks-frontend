import { Link } from "react-router-dom";

function DashboardQuickActions() {
  return (
    <section
      className="dashboard-quick-actions"
      aria-label="Dashboard quick actions"
    >
      <Link
        to="/recipes"
        className="dashboard-action-card"
      >
        <span className="dashboard-action-title">
          Discover a Drink
        </span>

        <span className="dashboard-action-description">
          Explore cocktails from the community.
        </span>
      </Link>

      <Link
        to="/drink-maker"
        className="dashboard-action-card"
      >
        <span className="dashboard-action-title">
          Create a Drink
        </span>

        <span className="dashboard-action-description">
          Build something of your own.
        </span>
      </Link>

      <Link
        to="/my-recipes"
        className="dashboard-action-card"
      >
        <span className="dashboard-action-title">
          My Collection
        </span>

        <span className="dashboard-action-description">
          View your created and saved recipes.
        </span>
      </Link>
    </section>
  );
}

export default DashboardQuickActions;
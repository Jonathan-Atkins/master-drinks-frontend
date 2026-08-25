function CommunityUserCard({ user }) {
  const initial =
    user.username
      ?.charAt(0)
      .toUpperCase() || "?";

  return (
    <article className="community-user-card">
      <div
        className="community-user-avatar"
        aria-hidden="true"
      >
        {initial}
      </div>

      <h2 className="community-username">
        {user.username}
      </h2>

      <div className="community-user-stats">
        <p>
          <strong>{user.drink_count}</strong>
          <span>Drinks</span>
        </p>

        <p>
          <strong>{user.recipe_count}</strong>
          <span>Recipes</span>
        </p>
      </div>
    </article>
  );
}

export default CommunityUserCard;
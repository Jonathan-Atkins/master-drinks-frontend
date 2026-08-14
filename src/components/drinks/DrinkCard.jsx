import { useNavigate } from "react-router-dom";

function DrinkCard({ drink }) {
  const navigate = useNavigate();

  const handleEdit = (event) => {
    event.stopPropagation();

    navigate(`/drinks/${drink.id}/edit`);
  };

  return (
    <article
      className="drink-card"
      onClick={() =>
        navigate(`/drinks/${drink.id}/recipes`)
      }
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          navigate(`/drinks/${drink.id}/recipes`);
        }
      }}
    >
      <h2>{drink.name}</h2>

      <p>
        <strong>Category:</strong> {drink.category}
      </p>

      <p>
        <strong>Alcoholic:</strong>{" "}
        {drink.alcoholic ? "Yes" : "No"}
      </p>

      <p>
        <strong>Recipes:</strong> {drink.recipe_count}
      </p>

      <button
        type="button"
        onClick={handleEdit}
      >
        Edit
      </button>
    </article>
  );
}

export default DrinkCard;
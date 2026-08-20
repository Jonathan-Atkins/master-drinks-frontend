import { useNavigate } from "react-router-dom";

function DrinkCard({ drink, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = (event) => {
    event.stopPropagation();
    navigate(`/drinks/${drink.id}/edit`);
  };

  const handleAddRecipe = (event) => {
    event.stopPropagation();
    navigate(`/drinks/${drink.id}/recipes/new`);
  };

  const handleDelete = (event) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete ${drink.name}?`
    );

    if (!confirmed) {
      return;
    }

    onDelete(drink.id);
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
        <strong>Category:</strong>{" "}
        {drink.categories
          ?.map((category) => category.name)
          .join(", ")}
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
        onClick={handleAddRecipe}
      >
        Add Recipe
      </button>

      <button
        type="button"
        onClick={handleEdit}
      >
        Edit Drink
      </button>

      <button
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </article>
  );
}

export default DrinkCard;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AnimatedUnderline from "../../../components/ui/AnimatedUnderline";
import AnimatedButton from "../../../components/ui/AnimatedButton";

function DrinkCard({ drink, onDelete }) {
  const navigate = useNavigate();

  const [isActivating, setIsActivating] =
    useState(false);

  const activateCard = () => {
    const supportsHover =
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;

    if (!supportsHover) {
      navigate(
        `/drinks/${drink.id}/recipes`
      );

      return;
    }

    if (isActivating) {
      return;
    }

    setIsActivating(true);

    window.setTimeout(() => {
      navigate(
        `/drinks/${drink.id}/recipes`
      );
    }, 300);
  };

  const handleEdit = (event) => {
    event.stopPropagation();

    navigate(
      `/drinks/${drink.id}/edit`
    );
  };

  const handleAddRecipe = (event) => {
    event.stopPropagation();

    navigate(
      `/drinks/${drink.id}/recipes/new`
    );
  };

  const handleDelete = (event) => {
    event.stopPropagation();

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${drink.name}?`
      );

    if (!confirmed) {
      return;
    }

    onDelete(drink.id);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      activateCard();
    }
  };

  return (
    <article
      className={`drink-card ${
        isActivating
          ? "drink-card-activating"
          : ""
      }`}
      onClick={activateCard}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <AnimatedUnderline as="h2" className="animated-underline--red" color="red">
        {drink.name}
      </AnimatedUnderline>

      <p>
        <strong>Category:</strong>{" "}
        {drink.categories
          ?.map(
            (category) =>
              category.name
          )
          .join(", ")}
      </p>

      <p>
        <strong>Alcoholic:</strong>{" "}
        {drink.alcoholic
          ? "Yes"
          : "No"}
      </p>

      <p>
        <strong>Recipes:</strong>{" "}
        {drink.recipe_count}
      </p>

      <div className="drink-card-actions">
        <AnimatedButton
          variant="add"
          onClick={handleAddRecipe}
        >
          Add Recipe
        </AnimatedButton>

        <AnimatedButton
          variant="edit"
          onClick={handleEdit}
        >
          Edit Drink
        </AnimatedButton>

        <AnimatedButton
          variant="delete"
          onClick={handleDelete}
        >
          Delete
        </AnimatedButton>
      </div>
    </article>
  );
}

export default DrinkCard;
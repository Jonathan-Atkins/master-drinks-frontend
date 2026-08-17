import { API_URL } from "../../config/api";

function SaveRecipeButton({
  recipeId,
  saved,
  userRecipeId,
  onToggle,
}) {
  const handleClick = async () => {
    if (saved) {
      const response = await fetch(
        `${API_URL}/api/v1/user_recipes/${userRecipeId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to remove saved recipe");
      }

      onToggle?.({
        saved: false,
        userRecipeId: null,
      });

      return;
    }

    const response = await fetch(
      `${API_URL}/api/v1/user_recipes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          recipe_id: recipeId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to save recipe");
    }

    const data = await response.json();

    onToggle?.({
      saved: true,
      userRecipeId: data.user_recipe_id,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      {saved ? "Remove from My Recipes" : "Add to My Recipes"}
    </button>
  );
}

export default SaveRecipeButton;
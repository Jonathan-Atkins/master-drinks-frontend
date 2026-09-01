import { useEffect, useState } from "react";

import { API_URL } from "../../../config/api";

function useRecipeDetail(recipeId) {
  const [recipe, setRecipe] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/v1/recipes/${recipeId}`,
          {
            credentials: "include",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Recipe not found."
              : "Unable to load recipe."
          );
        }

        const data =
          await response.json();

        setRecipe(
          data.recipe || data
        );
      } catch (error) {
        if (
          error.name !== "AbortError"
        ) {
          setError(error.message);
        }
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    };

    fetchRecipe();

    return () => {
      controller.abort();
    };
  }, [recipeId]);

  const handleToggleSaved = ({
    saved,
    userRecipeId,
  }) => {
    setRecipe((currentRecipe) => {
      if (!currentRecipe) {
        return currentRecipe;
      }

      const wasSaved =
        currentRecipe
          .saved_by_current_user;

      let saveCount =
        currentRecipe.save_count || 0;

      if (!wasSaved && saved) {
        saveCount += 1;
      }

      if (wasSaved && !saved) {
        saveCount = Math.max(
          saveCount - 1,
          0
        );
      }

      return {
        ...currentRecipe,
        saved_by_current_user: saved,
        user_recipe_id: userRecipeId,
        save_count: saveCount,
      };
    });
  };

  return {
    recipe,
    loading,
    error,
    handleToggleSaved,
  };
}

export default useRecipeDetail;
import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { API_URL } from "../config/api";

import RecipeDetail from "../features/recipes/components/RecipeDetail";
import useRecipeDetail from "../features/recipes/hooks/useRecipeDetail";

import "../styles/recipe-detail.css";

function RecipeDetailPage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [
    actionError,
    setActionError,
  ] = useState("");

  const {
    recipe,
    loading,
    error,
    handleToggleSaved,
  } = useRecipeDetail(recipeId);

  const handleBack = () => {
    const canGoBack =
      window.history.state?.idx > 0;

    if (canGoBack) {
      navigate(-1);
      return;
    }

    navigate("/recipes");
  };

  const handleEdit = () => {
    navigate(
      `/recipes/${recipe.id}/edit`
    );
  };

  const handleDelete = async () => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${recipe.name}?`
      );

    if (!confirmed) {
      return;
    }

    setActionError("");

    try {
      const response = await fetch(
        `${API_URL}/api/v1/recipes/${recipe.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete recipe."
        );
      }

      handleBack();
    } catch (error) {
      setActionError(
        error.message
      );
    }
  };

  if (loading) {
    return (
      <main className="recipe-detail-page">
        <p>
          Loading recipe...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="recipe-detail-page">
        <button
          type="button"
          className="recipe-detail-back"
          onClick={handleBack}
        >
          ← Back
        </button>

        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="recipe-detail-page">
      <button
        type="button"
        className="recipe-detail-back"
        onClick={handleBack}
      >
        ← Back
      </button>

      {actionError && (
        <p
          className="recipe-detail-error"
          role="alert"
        >
          {actionError}
        </p>
      )}

      <RecipeDetail
        recipe={recipe}
        onToggleSaved={
          handleToggleSaved
        }
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default RecipeDetailPage;
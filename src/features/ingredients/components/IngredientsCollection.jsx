import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../../config/api";

function IngredientsCollection() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState(null);

  const [deleteError, setDeleteError] =
    useState("");

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/ingredients`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load ingredients"
          );
        }

        const data =
          await response.json();

        setIngredients(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleEdit = (id) => {
    navigate(
      `/ingredients/${id}/edit`
    );
  };

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Delete this ingredient? This can't be undone."
      );

    if (!confirmed) {
      return;
    }

    setDeleteError("");
    setDeletingId(id);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/ingredients/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete ingredient"
        );
      }

      setIngredients(
        (currentIngredients) =>
          currentIngredients.filter(
            (ingredient) =>
              ingredient.id !== id
          )
      );
    } catch (error) {
      setDeleteError(
        error.message
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <p>Loading ingredients...</p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (ingredients.length === 0) {
    return (
      <p>No ingredients found.</p>
    );
  }

  return (
    <section className="ingredients-table-wrapper">
      {deleteError && (
        <p className="field-error">
          {deleteError}
        </p>
      )}

      <table className="ingredients-table">
        <thead>
          <tr>
            <th>
              Ingredient Name
            </th>

            <th>
              Type
            </th>

            <th>
              Flavor Profile
            </th>

            <th aria-label="Actions">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map(
            (ingredient) => (
              <tr key={ingredient.id}>
                <td data-label="Ingredient">
                  {ingredient.name}
                </td>

                <td data-label="Type">
                  {ingredient.ingredient_type ||
                    "—"}
                </td>

                <td data-label="Flavor Profile">
                  {ingredient.flavor_profiles
                    ?.length
                    ? ingredient.flavor_profiles.join(
                        ", "
                      )
                    : "—"}
                </td>

                <td
                  data-label="Actions"
                  className="ingredients-table-actions"
                >
                  {ingredient.owned_by_current_user ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            ingredient.id
                          )
                        }
                        disabled={
                          deletingId ===
                          ingredient.id
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            ingredient.id
                          )
                        }
                        disabled={
                          deletingId ===
                          ingredient.id
                        }
                      >
                        {deletingId ===
                        ingredient.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </>
                  ) : (
                    <span className="ingredients-no-actions">
                      —
                    </span>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </section>
  );
}

export default IngredientsCollection;
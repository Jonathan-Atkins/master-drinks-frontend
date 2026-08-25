import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../../config/api";

function IngredientsCollection() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] =
    useState([]);

  const [ingredientTypes, setIngredientTypes] =
    useState([]);

  const [flavorProfiles, setFlavorProfiles] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [ingredientType, setIngredientType] =
    useState("");

  const [flavorProfile, setFlavorProfile] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState(null);

  const [deleteError, setDeleteError] =
    useState("");

  useEffect(() => {
    const fetchIngredientOptions = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/ingredient_options`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load ingredient filters"
          );
        }

        const data = await response.json();

        setIngredientTypes(
          data.ingredient_types || []
        );

        setFlavorProfiles(
          data.flavor_profiles || []
        );
      } catch (error) {
        setError(error.message);
      }
    };

    fetchIngredientOptions();
  }, []);

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      setError("");

      try {
        const params =
          new URLSearchParams();

        if (search.trim()) {
          params.set(
            "search",
            search.trim()
          );
        }

        if (ingredientType) {
          params.set(
            "ingredient_type",
            ingredientType
          );
        }

        if (flavorProfile) {
          params.set(
            "flavor_profile",
            flavorProfile
          );
        }

        const queryString =
          params.toString();

        const url = queryString
          ? `${API_URL}/api/v1/ingredients?${queryString}`
          : `${API_URL}/api/v1/ingredients`;

        const response = await fetch(
          url,
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
  }, [
    search,
    ingredientType,
    flavorProfile,
  ]);

  const handleClearFilters = () => {
    setSearch("");
    setIngredientType("");
    setFlavorProfile("");
  };

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

  return (
    <section className="ingredients-section">
      <div className="ingredients-filters">
        <div className="form-field">
          <label htmlFor="ingredient-search">
            Search
          </label>

          <input
            id="ingredient-search"
            type="search"
            placeholder="Search ingredients..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label htmlFor="ingredient-type-filter">
            Type
          </label>

          <select
            id="ingredient-type-filter"
            value={ingredientType}
            onChange={(event) =>
              setIngredientType(
                event.target.value
              )
            }
          >
            <option value="">
              All Types
            </option>

            {ingredientTypes.map(
              (type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              )
            )}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="flavor-profile-filter">
            Flavor Profile
          </label>

          <select
            id="flavor-profile-filter"
            value={flavorProfile}
            onChange={(event) =>
              setFlavorProfile(
                event.target.value
              )
            }
          >
            <option value="">
              All Flavor Profiles
            </option>

            {flavorProfiles.map(
              (profile) => (
                <option
                  key={profile}
                  value={profile}
                >
                  {profile}
                </option>
              )
            )}
          </select>
        </div>

        <button
          type="button"
          className="form-secondary-button ingredients-clear-button"
          onClick={handleClearFilters}
          disabled={
            !search &&
            !ingredientType &&
            !flavorProfile
          }
        >
          Clear
        </button>
      </div>

      {deleteError && (
        <p className="field-error">
          {deleteError}
        </p>
      )}

      {loading && (
        <p>Loading ingredients...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {!loading &&
        !error &&
        ingredients.length === 0 && (
          <p>No ingredients found.</p>
        )}

      {!loading &&
        !error &&
        ingredients.length > 0 && (
          <div className="ingredients-table-wrapper">
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
          </div>
        )}
    </section>
  );
}

export default IngredientsCollection;
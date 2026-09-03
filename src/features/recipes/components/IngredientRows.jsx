import {
  useEffect,
  useRef,
} from "react";

import { API_URL } from "../../../config/api";

import { createEmptyIngredientRow } from "../../ingredients/utils/ingredientUtils";

const measurementUnits = [
  "oz",
  "ml",
  "tsp",
  "tbsp",
  "cup",
  "dash",
  "dashes",
  "barspoon",
  "piece",
  "pieces",
];

function IngredientRows({
  ingredientRows,
  setIngredientRows,
  setError,
}) {
  const searchTimers = useRef({});

  useEffect(() => {
    const timers =
      searchTimers.current;

    return () => {
      Object.values(
        timers
      ).forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, []);

  const updateIngredientRow = (
    index,
    updates
  ) => {
    setIngredientRows(
      (currentRows) =>
        currentRows.map(
          (row, rowIndex) =>
            rowIndex === index
              ? {
                  ...row,
                  ...updates,
                }
              : row
        )
    );
  };

  const searchIngredients = async (
    index,
    searchTerm
  ) => {
    updateIngredientRow(index, {
      searching: true,
    });

    try {
      const response = await fetch(
        `${API_URL}/api/v1/ingredients?search=${encodeURIComponent(
          searchTerm
        )}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to search ingredients."
        );
      }

      const matches =
        await response.json();

      updateIngredientRow(index, {
        matches,
        searching: false,
      });
    } catch (requestError) {
      updateIngredientRow(index, {
        matches: [],
        searching: false,
      });

      setError(
        requestError.message
      );
    }
  };

  const handleIngredientSearchChange = (
    index,
    value
  ) => {
    updateIngredientRow(index, {
      search_term: value,
      ingredient_id: "",
      ingredient_name: "",
      matches: [],
    });

    clearTimeout(
      searchTimers.current[index]
    );

    const trimmedValue =
      value.trim();

    if (
      trimmedValue.length < 2
    ) {
      return;
    }

    searchTimers.current[index] =
      setTimeout(() => {
        searchIngredients(
          index,
          trimmedValue
        );
      }, 300);
  };

  const selectIngredient = (
    index,
    ingredient
  ) => {
    updateIngredientRow(index, {
      ingredient_id:
        ingredient.id,
      ingredient_name:
        ingredient.name,
      search_term:
        ingredient.name,
      matches: [],
    });
  };

  const createIngredient = async (
    index
  ) => {
    const ingredientName =
      ingredientRows[
        index
      ].search_term.trim();

    if (!ingredientName) {
      return;
    }

    updateIngredientRow(index, {
      creating: true,
    });

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/v1/ingredients`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials:
            "include",
          body: JSON.stringify({
            name: ingredientName,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(
            ", "
          ) ||
            data.error ||
            "Ingredient could not be created."
        );
      }

      updateIngredientRow(
        index,
        {
          ingredient_id:
            data.id,
          ingredient_name:
            data.name,
          search_term:
            data.name,
          matches: [],
          creating: false,
        }
      );
    } catch (requestError) {
      updateIngredientRow(
        index,
        {
          creating: false,
        }
      );

      setError(
        requestError.message
      );
    }
  };

  const addIngredientRow = () => {
    setIngredientRows(
      (currentRows) => [
        ...currentRows,
        createEmptyIngredientRow(),
      ]
    );
  };

  const removeIngredientRow = (
    index
  ) => {
    clearTimeout(
      searchTimers.current[index]
    );

    setIngredientRows(
      (currentRows) => {
        if (
          currentRows.length === 1
        ) {
          return [
            createEmptyIngredientRow(),
          ];
        }

        return currentRows.filter(
          (_, rowIndex) =>
            rowIndex !== index
        );
      }
    );
  };

  const hasExactMatch = (
    ingredientRow
  ) => {
    const normalizedSearchTerm =
      ingredientRow.search_term
        .trim()
        .toLowerCase();

    return ingredientRow.matches.some(
      (ingredient) =>
        ingredient.name
          .trim()
          .toLowerCase() ===
        normalizedSearchTerm
    );
  };

  return (
    <section className="recipe-ingredients-section">
      <h2>Ingredients</h2>

      <div className="recipe-ingredient-groups">
        {ingredientRows.map(
          (
            ingredientRow,
            index
          ) => (
            <div
              className="recipe-ingredient-group"
              key={index}
            >
              <div className="ingredient-row">
                <div className="form-field ingredient-search">
                  <label
                    htmlFor={`ingredient-${index}`}
                  >
                    Ingredient
                  </label>

                  <input
                    id={`ingredient-${index}`}
                    type="text"
                    value={
                      ingredientRow.search_term
                    }
                    placeholder="Search ingredients"
                    autoComplete="off"
                    onChange={(
                      event
                    ) =>
                      handleIngredientSearchChange(
                        index,
                        event.target
                          .value
                      )
                    }
                    required
                  />

                  {ingredientRow.searching && (
                    <p>
                      Searching...
                    </p>
                  )}

                  {ingredientRow
                    .matches.length >
                    0 && (
                    <ul className="ingredient-results">
                      {ingredientRow.matches.map(
                        (
                          ingredient
                        ) => (
                          <li
                            key={
                              ingredient.id
                            }
                          >
                            <button
                              type="button"
                              onClick={() =>
                                selectIngredient(
                                  index,
                                  ingredient
                                )
                              }
                            >
                              {
                                ingredient.name
                              }
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {ingredientRow.search_term
                    .trim().length >=
                    2 &&
                    !ingredientRow.searching &&
                    !ingredientRow.ingredient_id &&
                    !hasExactMatch(
                      ingredientRow
                    ) && (
                      <button
                        type="button"
                        onClick={() =>
                          createIngredient(
                            index
                          )
                        }
                        disabled={
                          ingredientRow.creating
                        }
                      >
                        {ingredientRow.creating
                          ? "Creating ingredient..."
                          : `Create "${ingredientRow.search_term.trim()}"`}
                      </button>
                    )}

                  {ingredientRow.ingredient_id && (
                    <p className="ingredient-selected">
                      Selected:{" "}
                      {
                        ingredientRow.ingredient_name
                      }
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label
                    htmlFor={`amount-${index}`}
                  >
                    Amount
                  </label>

                  <input
                    id={`amount-${index}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      ingredientRow.amount
                    }
                    onChange={(
                      event
                    ) =>
                      updateIngredientRow(
                        index,
                        {
                          amount:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                    required
                  />
                </div>

                <div className="form-field">
                  <label
                    htmlFor={`unit-${index}`}
                  >
                    Measurement
                  </label>

                  <select
                    id={`unit-${index}`}
                    value={
                      ingredientRow.measurement_unit
                    }
                    onChange={(
                      event
                    ) =>
                      updateIngredientRow(
                        index,
                        {
                          measurement_unit:
                            event
                              .target
                              .value,
                        }
                      )
                    }
                    required
                  >
                    <option value="">
                      Select a unit
                    </option>

                    {measurementUnits.map(
                      (unit) => (
                        <option
                          key={
                            unit
                          }
                          value={
                            unit
                          }
                        >
                          {unit}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {(ingredientRows.length >
                1 ||
                ingredientRow.ingredient_id) && (
                <button
                  className="recipe-ingredient-remove"
                  type="button"
                  onClick={() =>
                    removeIngredientRow(
                      index
                    )
                  }
                >
                  Remove
                </button>
              )}
            </div>
          )
        )}
      </div>

      <button
        className="recipe-add-ingredient"
        type="button"
        onClick={addIngredientRow}
      >
        Add Ingredient
      </button>
    </section>
  );
}

export default IngredientRows;
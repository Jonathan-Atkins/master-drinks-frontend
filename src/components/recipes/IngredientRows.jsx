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

export const createEmptyIngredientRow = () => ({
  ingredient_id: "",
  ingredient_name: "",
  search_term: "",
  matches: [],
  amount: "",
  measurement_unit: "",
  searching: false,
  creating: false,
});

function IngredientRows({
  ingredientRows,
  setIngredientRows,
}) {

  const updateIngredientRow = (index, updates) => {
    setIngredientRows((currentRows) =>
      currentRows.map((row, rowIndex) =>
        rowIndex === index
          ? {
              ...row,
              ...updates,
            }
          : row
      )
    );
  };

  return (
  <section>
    <h2>Ingredients</h2>

    {ingredientRows.map((ingredientRow, index) => (
      <div
        className="ingredient-row"
        key={index}
      >
        <div className="form-field ingredient-search">
          <label htmlFor={`ingredient-${index}`}>
            Ingredient
          </label>

          <input
            id={`ingredient-${index}`}
            type="text"
            value={ingredientRow.search_term}
            placeholder="Search ingredients"
            autoComplete="off"
            readOnly
          />
        </div>

        <div className="form-field">
          <label htmlFor={`amount-${index}`}>
            Amount
          </label>

          <input
            id={`amount-${index}`}
            type="number"
            min="0"
            step="0.01"
            value={ingredientRow.amount}
            onChange={(event) =>
              updateIngredientRow(index, {
                amount: event.target.value,
              })
            }
          />

        </div>

        <div className="form-field">
          <label htmlFor={`unit-${index}`}>
            Measurement
          </label>

          <select
            id={`unit-${index}`}
            value={ingredientRow.measurement_unit}
            onChange={(event) =>
              updateIngredientRow(index, {
                measurement_unit: event.target.value,
              })
            }
          >
            <option value="">
              Select a unit
            </option>

            {measurementUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>

        </div>
      </div>
    ))}
    </section>
  );
}

export default IngredientRows;
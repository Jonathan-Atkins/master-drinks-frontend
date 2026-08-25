// src/features/ingredients/components/IngredientsTable.jsx

function IngredientsTable({
  ingredients,
  deletingId,
  onEdit,
  onDelete,
}) {
  return (
    <div className="ingredients-table-wrapper">
      <table className="ingredients-table">
        <thead>
          <tr>
            <th>Ingredient Name</th>
            <th>Type</th>
            <th>Flavor Profile</th>
            <th aria-label="Actions">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((ingredient) => (
            <tr
              id={`ingredient-${ingredient.id}`}
              key={ingredient.id}
              className="ingredient-jump-target"
            >
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
                        onEdit(ingredient.id)
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
                        onDelete(ingredient.id)
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IngredientsTable;
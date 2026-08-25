// src/features/ingredients/components/IngredientsFilters.jsx

function IngredientsFilters({
  search,
  ingredientType,
  flavorProfile,
  ingredientTypes,
  flavorProfiles,
  onSearchChange,
  onIngredientTypeChange,
  onFlavorProfileChange,
  onClear,
}) {
  const hasFilters =
    search ||
    ingredientType ||
    flavorProfile;

  return (
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
            onSearchChange(event.target.value)
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
            onIngredientTypeChange(
              event.target.value
            )
          }
        >
          <option value="">
            All Types
          </option>

          {ingredientTypes.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
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
            onFlavorProfileChange(
              event.target.value
            )
          }
        >
          <option value="">
            All Flavor Profiles
          </option>

          {flavorProfiles.map((profile) => (
            <option
              key={profile}
              value={profile}
            >
              {profile}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="form-secondary-button ingredients-clear-button"
        onClick={onClear}
        disabled={!hasFilters}
      >
        Clear
      </button>
    </div>
  );
}

export default IngredientsFilters;
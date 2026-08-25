import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../../config/api";

function IngredientForm({
  ingredient = null,
}) {
  const navigate = useNavigate();

  const isEditing = Boolean(ingredient);

  const [name, setName] = useState(
    ingredient?.name || ""
  );

  const [
    ingredientType,
    setIngredientType,
  ] = useState(
    ingredient?.ingredient_type || ""
  );

  const [
    selectedFlavorProfiles,
    setSelectedFlavorProfiles,
  ] = useState(
    ingredient?.flavor_profiles?.length
      ? ingredient.flavor_profiles
      : [""]
  );

  const [
    ingredientTypes,
    setIngredientTypes,
  ] = useState([]);

  const [
    flavorProfiles,
    setFlavorProfiles,
  ] = useState([]);

  const [
    optionsLoading,
    setOptionsLoading,
  ] = useState(true);

  const [error, setError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    const fetchIngredientOptions =
      async () => {
        try {
          const response = await fetch(
            `${API_URL}/api/v1/ingredient_options`,
            {
              credentials: "include",
            }
          );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data.errors?.join(", ") ||
                data.error ||
                "Ingredient options could not be loaded."
            );
          }

          setIngredientTypes(
            data.ingredient_types || []
          );

          setFlavorProfiles(
            data.flavor_profiles || []
          );

          if (
            !ingredient?.ingredient_type &&
            data.ingredient_types?.length
          ) {
            setIngredientType(
              data.ingredient_types[0]
            );
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setOptionsLoading(false);
        }
      };

    fetchIngredientOptions();
  }, [ingredient]);

  const handleFlavorProfileChange = (
    index,
    profile
  ) => {
    setSelectedFlavorProfiles(
      (currentProfiles) =>
        currentProfiles.map(
          (
            currentProfile,
            profileIndex
          ) =>
            profileIndex === index
              ? profile
              : currentProfile
        )
    );
  };

  const handleAddFlavorProfile = () => {
    const hasEmptyProfile =
      selectedFlavorProfiles.includes("");

    if (hasEmptyProfile) {
      setError(
        "Select a flavor profile before adding another."
      );

      return;
    }

    if (
      selectedFlavorProfiles.length >=
      flavorProfiles.length
    ) {
      return;
    }

    setError("");

    setSelectedFlavorProfiles(
      (currentProfiles) => [
        ...currentProfiles,
        "",
      ]
    );
  };

  const handleRemoveFlavorProfile = (
    index
  ) => {
    if (
      selectedFlavorProfiles.length === 1
    ) {
      setSelectedFlavorProfiles([""]);

      return;
    }

    setSelectedFlavorProfiles(
      (currentProfiles) =>
        currentProfiles.filter(
          (_, profileIndex) =>
            profileIndex !== index
        )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const cleanedFlavorProfiles =
      selectedFlavorProfiles.filter(
        Boolean
      );

    const ingredientPayload = {
      name: name.trim(),
      ingredient_type:
        ingredientType,
      flavor_profiles:
        cleanedFlavorProfiles,
    };

    const url = isEditing
      ? `${API_URL}/api/v1/ingredients/${ingredient.id}`
      : `${API_URL}/api/v1/ingredients`;

    const method = isEditing
      ? "PATCH"
      : "POST";

    setSubmitting(true);

    try {
      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify(
            ingredientPayload
          ),
        }
      );

      const data =
        response.status === 204
          ? null
          : await response.json();

      if (!response.ok) {
        throw new Error(
          data?.errors?.join(", ") ||
            data?.error ||
            "Ingredient could not be saved."
        );
      }

      navigate("/ingredients");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="auth-form ingredient-form"
      onSubmit={handleSubmit}
    >
      {error && (
        <p
          className="form-error"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="form-field">
        <label htmlFor="ingredient-name">
          Ingredient Name
        </label>

        <input
          id="ingredient-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="ingredient-type">
          Type
        </label>

        <select
          id="ingredient-type"
          value={ingredientType}
          onChange={(event) =>
            setIngredientType(
              event.target.value
            )
          }
          required
          disabled={optionsLoading}
        >
          <option value="">
            {optionsLoading
              ? "Loading types..."
              : "Select a type"}
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
        <label>
          Flavor Profiles
        </label>

        {selectedFlavorProfiles.map(
          (
            selectedProfile,
            index
          ) => (
            <div
              className="form-select-row"
              key={index}
            >
              <select
                value={selectedProfile}
                onChange={(event) =>
                  handleFlavorProfileChange(
                    index,
                    event.target.value
                  )
                }
                disabled={optionsLoading}
              >
                <option value="">
                  {optionsLoading
                    ? "Loading flavor profiles..."
                    : "Select a flavor profile"}
                </option>

                {flavorProfiles.map(
                  (profile) => {
                    const alreadySelected =
                      selectedFlavorProfiles.includes(
                        profile
                      );

                    const selectedHere =
                      selectedProfile ===
                      profile;

                    return (
                      <option
                        key={profile}
                        value={profile}
                        disabled={
                          alreadySelected &&
                          !selectedHere
                        }
                      >
                        {profile}
                      </option>
                    );
                  }
                )}
              </select>

              {selectedProfile && (
                <button
                  className="form-secondary-button"
                  type="button"
                  onClick={() =>
                    handleRemoveFlavorProfile(
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

        <button
          className="primary-button form-primary-button"
          type="button"
          onClick={
            handleAddFlavorProfile
          }
          disabled={
            optionsLoading ||
            selectedFlavorProfiles.length >=
              flavorProfiles.length
          }
        >
          Add Flavor Profile
        </button>
      </div>

      <div className="form-actions">
        <button
          className="primary-button form-primary-button"
          type="submit"
          disabled={
            submitting ||
            optionsLoading ||
            !name.trim() ||
            !ingredientType
          }
        >
          {submitting
            ? "Submitting..."
            : isEditing
              ? "Save Changes"
              : "Create Ingredient"}
        </button>

        <button
          className="form-secondary-button"
          type="button"
          onClick={() =>
            navigate("/ingredients")
          }
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default IngredientForm;
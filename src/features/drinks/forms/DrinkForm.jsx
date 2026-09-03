import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../../config/api";
import { getDrinkRequestConfig } from "../utils/drinkRequest";

function DrinkForm({ drink = null }) {
  const [name, setName] = useState(
    drink?.name || ""
  );

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState(
    drink?.categories?.length
      ? drink.categories.map(
          (category) => category.slug
        )
      : [""]
  );

  const [categories, setCategories] =
    useState([]);

  const [
    categoriesLoading,
    setCategoriesLoading,
  ] = useState(true);

  const [alcoholic, setAlcoholic] =
    useState(drink?.alcoholic ?? true);

  const [
    publiclyVisible,
    setPubliclyVisible,
  ] = useState(
    drink?.publicly_visible ?? true
  );

  const [error, setError] = useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const { isEditing, url, method } =
    getDrinkRequestConfig(drink);

  const navigate = useNavigate();

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchCategories = async () => {
      setCategoriesLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/api/v1/categories?alcoholic=${alcoholic}`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors?.join(", ") ||
              "Categories could not be loaded."
          );
        }

        setCategories(data);

        const allowedCategorySlugs =
          new Set(
            data.map(
              (category) => category.slug
            )
          );

        setSelectedCategories(
          (currentCategories) => {
            const validCategories =
              currentCategories.filter(
                (categorySlug) =>
                  categorySlug &&
                  allowedCategorySlugs.has(
                    categorySlug
                  )
              );

            return validCategories.length
              ? validCategories
              : [""];
          }
        );
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setError(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setCategoriesLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, [alcoholic]);

  const handleCategoryChange = (
    index,
    slug
  ) => {
    setSelectedCategories(
      (currentCategories) =>
        currentCategories.map(
          (
            categorySlug,
            categoryIndex
          ) =>
            categoryIndex === index
              ? slug
              : categorySlug
        )
    );
  };

  const handleAddCategory = () => {
    const hasEmptyCategory =
      selectedCategories.includes("");

    if (hasEmptyCategory) {
      setError(
        "Select a category before adding another."
      );

      return;
    }

    if (
      selectedCategories.length >=
      categories.length
    ) {
      return;
    }

    setError("");

    setSelectedCategories(
      (currentCategories) => [
        ...currentCategories,
        "",
      ]
    );
  };

  const handleRemoveCategory = (
    index
  ) => {
    if (
      selectedCategories.length === 1
    ) {
      return;
    }

    setSelectedCategories(
      (currentCategories) =>
        currentCategories.filter(
          (_, categoryIndex) =>
            categoryIndex !== index
        )
    );
  };

  const handleAlcoholicChange = (
    event
  ) => {
    setError("");
    setAlcoholic(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const hasEmptyCategory =
      selectedCategories.some(
        (categorySlug) => !categorySlug
      );

    if (hasEmptyCategory) {
      setError(
        "Every drink requires a category."
      );

      return;
    }

    setSubmitting(true);

    const drinkPayload = {
      name,
      category_slugs:
        selectedCategories,
      alcoholic,
      publicly_visible:
        publiclyVisible,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        credentials: "include",
        body: JSON.stringify(
          drinkPayload
        ),
      });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(", ") ||
            data.error ||
            "Drink could not be created."
        );
      }

      if (isEditing) {
        navigate("/dashboard");
        return;
      }

      navigate(
        `/drinks/${data.id}/recipes/new`
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="auth-form drink-form"
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
        <label htmlFor="drink-name">
          Drink Name
        </label>

        <input
          id="drink-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />
      </div>

      <div className="form-field">
        <label>
          <input
            type="checkbox"
            checked={alcoholic}
            onChange={
              handleAlcoholicChange
            }
          />

          Alcoholic
        </label>
      </div>

      <div className="form-field">
        <label>Categories</label>

        {selectedCategories.map(
          (
            selectedCategory,
            index
          ) => (
            <div
              className="form-select-row"
              key={index}
            >
              <select
                value={selectedCategory}
                onChange={(event) =>
                  handleCategoryChange(
                    index,
                    event.target.value
                  )
                }
                required
                disabled={
                  categoriesLoading
                }
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories..."
                    : "Select a category"}
                </option>

                {categories.map(
                  (categoryOption) => {
                    const alreadySelected =
                      selectedCategories.includes(
                        categoryOption.slug
                      );

                    const selectedHere =
                      selectedCategory ===
                      categoryOption.slug;

                    return (
                      <option
                        key={
                          categoryOption.slug
                        }
                        value={
                          categoryOption.slug
                        }
                        disabled={
                          alreadySelected &&
                          !selectedHere
                        }
                      >
                        {
                          categoryOption.name
                        }
                      </option>
                    );
                  }
                )}
              </select>

              {selectedCategories.length >
                1 && (
                <button
                  className="form-secondary-button"
                  type="button"
                  onClick={() =>
                    handleRemoveCategory(
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
            handleAddCategory
          }
          disabled={
            categoriesLoading ||
            selectedCategories.length >=
              categories.length
          }
        >
          Add Category
        </button>
      </div>

      <div className="form-field">
        <label>
          <input
            type="checkbox"
            checked={publiclyVisible}
            onChange={(event) =>
              setPubliclyVisible(
                event.target.checked
              )
            }
          />

          Publicly Visible
        </label>
      </div>

      <div className="form-actions">
        <button
          className="primary-button form-primary-button"
          type="submit"
          disabled={
            submitting ||
            categoriesLoading ||
            selectedCategories.some(
              (categorySlug) =>
                !categorySlug
            )
          }
        >
          {submitting
            ? "Submitting..."
            : isEditing
              ? "Save Changes"
              : "Build Drink"}
        </button>

        <button
          className="form-secondary-button"
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default DrinkForm;
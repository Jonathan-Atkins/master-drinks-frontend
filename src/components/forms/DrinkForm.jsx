import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import { getDrinkRequestConfig } from "../utils/drinkRequest";

function DrinkForm({ drink = null }) {
  const [name, setName] = useState(drink?.name || "");
  const [category, setCategory] = useState(
    drink?.categories?.[0]?.slug || ""
  );
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [alcoholic, setAlcoholic] = useState(
    drink?.alcoholic ?? true
  );

  const [publiclyVisible, setPubliclyVisible] = useState(
    drink?.publicly_visible ?? true
  );

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { isEditing, url, method } =
    getDrinkRequestConfig(drink);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/categories`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors?.join(", ") ||
              "Categories could not be loaded."
          );
        }

        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    const drinkPayload = {
      name,
      category_slugs: [category],
      alcoholic,
      publicly_visible: publiclyVisible,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(drinkPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(", ") ||
            data.error ||
            "Drink could not be created."
        );
      }

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-field">
        <label htmlFor="drink-name">
          Drink name
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
        <label htmlFor="drink-category">
          Category
        </label>

        <select
          id="drink-category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          required
          disabled={categoriesLoading}
        >
          <option value="">
            {categoriesLoading
              ? "Loading categories..."
              : "Select a category"}
          </option>

          {categories.map((categoryOption) => (
            <option
              key={categoryOption.slug}
              value={categoryOption.slug}
            >
              {categoryOption.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>
          <input
            type="checkbox"
            checked={alcoholic}
            onChange={(event) =>
              setAlcoholic(event.target.checked)
            }
          />
          Alcoholic
        </label>
      </div>

      <div className="form-field">
        <label>
          <input
            type="checkbox"
            checked={publiclyVisible}
            onChange={(event) =>
              setPubliclyVisible(event.target.checked)
            }
          />
          Publicly visible
        </label>
      </div>

      <div className="dashboard-actions">
        <button
          className="primary-button"
          type="submit"
          disabled={submitting || categoriesLoading}
        >
          {submitting
            ? "Submitting..."
            : isEditing
              ? "Save Changes"
              : "Build Drink"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default DrinkForm;
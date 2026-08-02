import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

const categories = [
  { value: "vodka", label: "Vodka" },
  { value: "gin", label: "Gin" },
  { value: "rum", label: "Rum" },
  { value: "white rum", label: "White Rum" },
  { value: "cachaca", label: "Cachaça" },

  { value: "tequila", label: "Tequila" },
  { value: "mezcal", label: "Mezcal" },

  { value: "whiskey", label: "Whiskey" },
  { value: "bourbon", label: "Bourbon" },
  { value: "rye", label: "Rye" },
  { value: "scotch", label: "Scotch" },
  { value: "irish_whiskey", label: "Irish Whiskey" },

  { value: "brandy", label: "Brandy" },
  { value: "cognac", label: "Cognac" },
  { value: "armagnac", label: "Armagnac" },
  { value: "calvados", label: "Calvados" },
  { value: "pisco", label: "Pisco" },

  { value: "soju", label: "Soju" },
  { value: "shochu", label: "Shochu" },
  { value: "sake", label: "Sake" },
  { value: "baijiu", label: "Baijiu" },

  { value: "liqueur", label: "Liqueur" },
  { value: "amaro", label: "Amaro" },
  { value: "aperitif", label: "Aperitif" },
  { value: "vermouth", label: "Vermouth" },
  { value: "absinthe", label: "Absinthe" },

  { value: "fortified_wine", label: "Fortified Wine" },
  { value: "wine", label: "Wine" },
  { value: "champagne", label: "Champagne" },
  { value: "beer", label: "Beer" },
  { value: "cider", label: "Cider" },

  { value: "aquavit", label: "Aquavit" },
  { value: "genever", label: "Genever" },
  { value: "ouzo", label: "Ouzo" },
  { value: "raki", label: "Raki" },
  { value: "arak", label: "Arak" },

  { value: "non_spirit", label: "Non-Spirit" },
];

function DrinkForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [alcoholic, setAlcoholic] = useState(true);
  const [publiclyVisible, setPubliclyVisible] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/drinks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          category,
          alcoholic,
          publicly_visible: publiclyVisible,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(", ") ||
            data.error ||
            "Drink could not be created."
        );
      }

      navigate("/personal");
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
        <label htmlFor="drink-name">Drink name</label>
        <input
          id="drink-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="drink-category">Category</label>
        <select
          id="drink-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          <option value="">Select a category</option>

          {categories.map((categoryOption) => (
            <option
              key={categoryOption.value}
              value={categoryOption.value}
            >
              {categoryOption.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>
          <input
            type="checkbox"
            checked={alcoholic}
            onChange={(event) => setAlcoholic(event.target.checked)}
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
          disabled={submitting}
        >
          {submitting ? "Creating drink..." : "Create Drink"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/personal")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default DrinkForm;
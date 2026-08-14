import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import RecipeForm from "../components/forms/RecipeForm";

function EditRecipePage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [publiclyVisible, setPubliclyVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/recipes/${recipeId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load recipe");
        }

        const data = await response.json();

        setName(data.name);
        setInstructions(data.instructions);
        setPubliclyVisible(data.publicly_visible);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/recipes/${recipeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            instructions,
            publicly_visible: publiclyVisible,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.errors?.join(", ") ||
            "Unable to update recipe"
        );
        return;
      }

      navigate("/my-recipes");
    } catch {
      setError("The server could not be reached.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  return (
    <main>
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h1>Edit Recipe</h1>

      {error && <p>{error}</p>}

      <RecipeForm
        name={name}
        setName={setName}
        instructions={instructions}
        setInstructions={setInstructions}
        publiclyVisible={publiclyVisible}
        setPubliclyVisible={setPubliclyVisible}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Save Changes"
      />
    </main>
  );
}

export default EditRecipePage;
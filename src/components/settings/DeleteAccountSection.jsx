import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { API_URL } from "../../config/api";

function DeleteAccountSection() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/account`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            confirmation,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.errors?.join(", ") ||
            "Account could not be deleted."
        );
      }

      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="settings-card danger-zone">
      <div className="settings-card-header">
        <h2>Delete Account</h2>

        <p className="settings-description">
          This permanently deletes your account and
          all content that belongs to you.
        </p>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <form
        className="settings-form"
        onSubmit={handleDelete}
      >
        <div className="form-field">
          <label htmlFor="delete-confirmation">
            Type DELETE to confirm
          </label>

          <input
            id="delete-confirmation"
            type="text"
            value={confirmation}
            onChange={(event) =>
              setConfirmation(event.target.value)
            }
            autoComplete="off"
            required
          />
        </div>

        <button
          className="settings-button danger-button"
          type="submit"
          disabled={
            submitting ||
            confirmation !== "DELETE"
          }
        >
          {submitting
            ? "Deleting..."
            : "Delete Account"}
        </button>
      </form>
    </section>
  );
}

export default DeleteAccountSection;
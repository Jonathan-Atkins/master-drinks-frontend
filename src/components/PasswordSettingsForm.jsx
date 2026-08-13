import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config/api";

function PasswordSettingsForm() {
  const { user } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/users/${user.id}/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            current_password: currentPassword,
            password,
            password_confirmation: passwordConfirmation,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.errors?.join(", ") ||
            "Password could not be updated."
        );
        return;
      }
      
      setMessage(data.message);

      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
    } catch {
      setError("The server could not be reached.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h2>Security</h2>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {message && (
        <p className="form-success">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="current-password">
            Current Password
          </label>

          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(event) =>
              setCurrentPassword(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="new-password">
            New Password
          </label>

          <input
            id="new-password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="password-confirmation">
            Confirm New Password
          </label>

          <input
            id="password-confirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(event) =>
              setPasswordConfirmation(event.target.value)
            }
            required
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Updating..." : "Change Password"}
        </button>
      </form>
    </section>
  );
}

export default PasswordSettingsForm;
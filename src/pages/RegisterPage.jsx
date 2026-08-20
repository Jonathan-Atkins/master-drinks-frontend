import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "../config/api";

import AuthLayout from "../components/layout/AuthLayout";
import AuthBackgroundVideo from "../components/ui/AuthBackgroundVideo";
import JitterText from "../components/ui/JitterText";

function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] =
    useState("");

  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setUsernameError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            username,
            email,
            password,
            password_confirmation:
              passwordConfirmation,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
        return;
      }

      const errors = data.errors || [];

      const usernameTakenError = errors.find(
        (message) =>
          message
            .toLowerCase()
            .includes(
              "username has already been taken"
            )
      );

      if (usernameTakenError) {
        setUsernameError(usernameTakenError);
      } else {
        setError(
          errors.join(", ") ||
            "Account could not be created. Please try again."
        );
      }
    } catch {
      setError("The server could not be reached.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <main className="auth-page register-page">
        <h1 className="animated-underline auto-underline jittery">
          <JitterText>Create Account</JitterText>
        </h1>

        <section className="auth-card beer-glass-card">
          <AuthBackgroundVideo />

          <div className="auth-card-content">
            {error && (
              <p
                className="form-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="form-field">
                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="username">
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => {
                    setUsername(
                      event.target.value
                    );
                    setUsernameError("");
                  }}
                  aria-invalid={Boolean(
                    usernameError
                  )}
                  aria-describedby={
                    usernameError
                      ? "username-error"
                      : undefined
                  }
                  required
                />

                {usernameError && (
                  <p
                    id="username-error"
                    className="field-error"
                    role="alert"
                  >
                    {usernameError}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>

                <input
                  id="passwordConfirmation"
                  type="password"
                  autoComplete="new-password"
                  value={passwordConfirmation}
                  onChange={(event) =>
                    setPasswordConfirmation(
                      event.target.value
                    )
                  }
                  required
                />
              </div>

              <button
                className="primary-button"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Building!..."
                  : "Create Recipe Book"}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account?{" "}
              <Link to="/login">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </AuthLayout>
  );
}

export default RegisterPage;
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/layout/AuthLayout";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        navigate("/dashboard");
        return;
      }

      setError(
        data.errors?.join(", ") ||
          data.error ||
          "Login failed. Please try again."
      );
    } catch {
      setError("The server could not be reached.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <main className="auth-page login-page">
        <h1>Recipe Book Login</h1>
        <section className="auth-card">
           <svg
            width="0"
            height="0"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <clipPath
                id="wine-glass-shape"
                clipPathUnits="objectBoundingBox"
              >
                <path
                  d="
                    M 0.15 0.06
                    C 0.30 0.03, 0.70 0.03, 0.85 0.06
                    C 0.92 0.13, 0.95 0.34, 0.94 0.52
                    C 0.93 0.73, 0.86 0.90, 0.73 0.96
                    C 0.60 1.00, 0.40 1.00, 0.27 0.96
                    C 0.14 0.90, 0.07 0.73, 0.06 0.52
                    C 0.05 0.34, 0.08 0.13, 0.15 0.06
                    Z
                  "
                />
              </clipPath>
            </defs>
          </svg>
          <video
            className="auth-card-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/beer_background.mp4" type="video/mp4" />
          </video>

          <div className="auth-card-content">
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <button
                className="primary-button"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="auth-footer">
              Don&apos;t have an account?{" "}
              <Link to="/register">Create one</Link>
            </p>
          </div>
        </section>
      </main>
    </AuthLayout>
  );
}

export default LoginPage;

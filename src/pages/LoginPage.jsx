import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "../config/api";
import { AuthContext } from "../context/AuthContext";

import AboutMe from "../features/about/components/AboutMe";
import AuthBackgroundVideo from "../features/auth/components/AuthBackgroundVideo";
import VisualSettingsNotice from "../features/auth/components/VisualSettingsNotice";
import useVisualSettingsNotice from "../features/auth/hooks/useVisualSettingsNotice";
import AuthLayout from "../components/layout/AuthLayout";
import HandwrittenGreeting from "../components/ui/HandwrittenGreeting";
import WineGlassClipPath from "../components/ui/WineGlassClipPath";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    showNotice,
    setPlaybackBlocked,
    acknowledgeNotice,
  } = useVisualSettingsNotice();

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

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

  const scrollToAbout = () => {
    document
      .getElementById("about-me")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <>
      <VisualSettingsNotice
        open={showNotice}
        onAcknowledge={acknowledgeNotice}
      />

      {createPortal(
        <button
          className="login-about-link"
          type="button"
          onClick={scrollToAbout}
        >
          About BarBuddy
        </button>,
        document.body
      )}

      <AuthLayout showDecorations>
        <WineGlassClipPath />

        <main
          className="auth-page login-page"
          id="login-top"
        >
          <HandwrittenGreeting />

          <h1>
            Discover, Create, and Share Cocktails & Mocktails
          </h1>

          <div className="wine-glass-outline">
            <section className="auth-card wine-glass-card">
              <AuthBackgroundVideo
                onPlaybackBlockedChange={
                  setPlaybackBlocked
                }
              />

              <div className="auth-card-content">
                <h2 className="auth-card-title">
                  Log In
                </h2>

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
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
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
                      ? "Logging in..."
                      : "Log In"}
                  </button>
                </form>

                <p className="auth-footer">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">
                    Create one
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </main>

        <AboutMe showBackToTop />
      </AuthLayout>
    </>
  );
}

export default LoginPage;

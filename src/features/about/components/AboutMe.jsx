function AboutMe({
  showBackToLogin = false,
  onBackToLogin,
  showBackToTop = false,
  transparentBackground = false,
}) {
  const handleBackToTop = () => {
    document
      .getElementById("login-top")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      className={`about-me ${
        transparentBackground
          ? "about-me-transparent"
          : ""
      }`}
      id="about-me"
      aria-labelledby="about-me-title"
    >
      <div className="about-me-content">
        <div className="about-me-heading">
          <h1
            id="about-me-title"
            className="page-header animated-underline auto-underline"
          >
            About Me
          </h1>
        </div>

        <div className="about-me-sections">
          <section className="about-me-section">
            <h2>I. What Is Bar Buddy?</h2>

            <p>
              A bar recipe book built to keep cocktail recipes
              organized and accessible.
            </p>
          </section>

          <section className="about-me-section">
            <h2>II. Who Is It For?</h2>

            <p>
              Designed for professional bartenders and cocktail
              hobbyists.
            </p>
          </section>

          <section className="about-me-section">
            <h2>III. Why Bar Buddy?</h2>

            <p>
              Modern bars and restaurants create unique and intricate
              recipes that can be difficult to remember and organize.
            </p>
          </section>

          <section className="about-me-section">
            <h2>IV. The Goal</h2>

            <p>
              Build one of the most extensive bar recipe collections
              available, so the recipe you need is always only a click
              away.
            </p>
          </section>
        </div>

        {showBackToLogin && (
          <button
            className="about-back-button"
            type="button"
            onClick={onBackToLogin}
          >
            Back to Login
          </button>
        )}

        {showBackToTop && (
          <button
            className="about-top-button"
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            ↑ Back to Top
          </button>
        )}
      </div>
    </section>
  );
}

export default AboutMe;
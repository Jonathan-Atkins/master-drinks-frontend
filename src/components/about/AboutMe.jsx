function AboutMe({
  showBackToLogin = false,
  onBackToLogin,
  showBackToTop = false,
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
      className="about-me"
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
              The most comprehensive Bar Recipe Book! Add, collect and share recipes with other users around the world
            </p>
          </section>

          <section className="about-me-section">
            <h2>II. Who Is It For?</h2>

            <p>
              The professional and hobbyist bartenders alike!
            </p>
          </section>

          <section className="about-me-section">
            <h2>III. Why Bar Buddy?</h2>

            <p>
              With so many uniquly crafted cocktails its impossible to keep track of all of them. Buddy Bar is here to help you and your friends organize them all!
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
import BarSpoonDivider from "../../../components/ui/BarSpoonDivider";

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
              BarBuddy is a social drink library for
              discovering, creating, saving, and sharing
              everything from classic cocktails and
              mocktails to original signature drinks.
            </p>
          </section>

          <BarSpoonDivider />

          <section className="about-me-section">
            <h2>II. Who Is It For?</h2>

            <p>
              Home bartenders, professional bartenders,
              and drink enthusiasts alike. Whether you
              prefer cocktails or non-alcoholic creations,
              there is a place for you here.
            </p>
          </section>

          <BarSpoonDivider />

          <section className="about-me-section">
            <h2>III. Why Bar Buddy?</h2>

            <p>
              Great drinks are everywhere, but many are
              hard to find outside the places where they
              were created. BarBuddy makes discovery
              simple, interactive, and community-driven.
            </p>
          </section>

          <BarSpoonDivider />

          <section className="about-me-section">
            <h2>IV. The Goal</h2>

            <p>
              Build the world&apos;s most extensive
              community-driven drink library while
              preserving cocktail culture and encouraging
              creativity. Eventually, BarBuddy will use AI
              and flavor profiles to create new drinks
              based on what users are in the mood for.
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
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
            About BarBuddy
          </h1>
        </div>

        <div className="about-me-sections">
          <section className="about-me-section">
            <h2>I. What Is BarBuddy?</h2>

            <p>
              BarBuddy is a social cocktail and mocktail
              library for discovering, creating, saving,
              and sharing everything from timeless
              classics to original signature cocktails.
            </p>
          </section>

          <BarSpoonDivider />

          <section className="about-me-section">
            <h2>II. Who Is It For?</h2>

            <p>
              Anyone curious about what goes in the
              glass. People mixing at home, professional
              bartenders, hosts & sober-curious users alike.
              We encourage our patrons to explore and create 
              something new & fun. Cocktails
              and mocktails have an equal place here.
            </p>
          </section>

          <BarSpoonDivider />

          <section className="about-me-section">
            <h2>III. Why BarBuddy?</h2>

            <p>
              Great cocktails and mocktails are
              everywhere, but where do we track them? How do we discover & share them
              outside the places and communities
              where they were created. BarBuddy aims to bridge that gap as the World's most comprehensive community recipe book!
            </p>
          </section>

          <BarSpoonDivider />

          <section className="about-me-section">
            <h2>IV. The Goal</h2>

            <p>
              Build a community-driven library where
              cocktails and mocktails are equally easy to
              discover, create, save, and share. As
              BarBuddy grows, flavor profiles and AI can
              help users discover or create drinks based
              on their tastes, ingredients, and what they
              are in the mood for.
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
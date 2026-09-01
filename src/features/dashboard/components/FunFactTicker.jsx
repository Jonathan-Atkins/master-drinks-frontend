import useFunFactTicker from "../hooks/useFunFactTicker";

import "./FunFactTicker.css";

function FunFactTicker() {
  const {
    currentFact,
    nextFact,
    loading,
    error,
    shouldAnimate,
    isAnimating,
  } = useFunFactTicker();

  const noFacts =
    !loading &&
    !error &&
    !currentFact;

  return (
    <section className="dashboard-fun-fact">
      <strong className="fun-fact-label">
        Did You Know?
      </strong>

      <div className="fun-fact-viewport">
        {error && (
          <p className="fun-fact-message">
            Unable to load fun facts.
          </p>
        )}

        {noFacts && (
          <p className="fun-fact-message">
            No fun facts available.
          </p>
        )}

        {currentFact && (
          <p
            className={`fun-fact-text fun-fact-current ${
              shouldAnimate &&
              isAnimating
                ? "fun-fact-exit"
                : ""
            }`}
          >
            {currentFact.body}
          </p>
        )}

        {shouldAnimate && nextFact && (
          <p
            className={`fun-fact-text fun-fact-next ${
              isAnimating
                ? "fun-fact-enter"
                : ""
            }`}
          >
            {nextFact.body}
          </p>
        )}
      </div>
    </section>
  );
}

export default FunFactTicker;
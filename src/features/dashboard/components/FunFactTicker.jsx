import useFunFactTicker from "../hooks/useFunFactTicker";

function FunFactTicker() {
  const {
    currentFact,
    nextFact,
    loading,
    error,
    shouldAnimate,
    isAnimating,
    isExpanded,
    expandCurrentFact,
    collapseCurrentFact,
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

      <div className="fun-fact-content">
        <div
          className={`fun-fact-viewport ${
            isExpanded
              ? "fun-fact-viewport-expanded"
              : ""
          }`}
        >
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
                !isExpanded
                  ? "fun-fact-collapsed"
                  : "fun-fact-expanded"
              } ${
                shouldAnimate &&
                isAnimating
                  ? "fun-fact-exit"
                  : ""
              }`}
            >
              {currentFact.body}
            </p>
          )}

          {shouldAnimate &&
            nextFact &&
            !isExpanded && (
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

        {currentFact && (
          <button
            type="button"
            className="fun-fact-toggle"
            disabled={isAnimating}
            onClick={
              isExpanded
                ? collapseCurrentFact
                : expandCurrentFact
            }
          >
            {isExpanded
              ? "Show less"
              : "... Read more"}
          </button>
        )}
      </div>
    </section>
  );
}

export default FunFactTicker;
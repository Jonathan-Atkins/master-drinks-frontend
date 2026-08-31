import useFunFactTicker from "../hooks/useFunFactTicker";

function FunFactTicker() {
  const {
    currentFact,
    nextFact,
    loading,
    error,
    isInitialEntry,
    isTransitioning,
  } = useFunFactTicker();

  const noFacts = !loading && !error && !currentFact;

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
            className={[
              "fun-fact-text",
              isInitialEntry ? "fun-fact-entering" : "",
              isTransitioning ? "fun-fact-exiting" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {currentFact.body}
          </p>
        )}

        {isTransitioning && nextFact && (
          <p className="fun-fact-text fun-fact-next">
            {nextFact.body}
          </p>
        )}
      </div>
    </section>
  );
}

export default FunFactTicker;
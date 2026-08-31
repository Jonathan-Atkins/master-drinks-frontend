import { useEffect, useState } from "react";
import { API_URL } from "../../../config/api";

const DISPLAY_DURATION_MS = 4700;
const TRANSITION_DURATION_MS = 500;

function useFunFactTicker() {
  const [facts, setFacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isInitialEntry, setIsInitialEntry] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFunFacts = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/fun_facts`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load fun facts");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid fun fact response");
        }

        setFacts(data);

        if (data.length > 0) {
          setIsInitialEntry(true);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFunFacts();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!isInitialEntry) return;

    const timer = setTimeout(() => {
      setIsInitialEntry(false);
    }, TRANSITION_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isInitialEntry]);

  useEffect(() => {
    if (facts.length <= 1) return;
    if (isInitialEntry || isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(true);
    }, DISPLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [
    facts.length,
    currentIndex,
    isInitialEntry,
    isTransitioning,
  ]);

  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setCurrentIndex((previousIndex) => {
        return (previousIndex + 1) % facts.length;
      });

      setIsTransitioning(false);
    }, TRANSITION_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isTransitioning, facts.length]);

  const nextIndex =
    facts.length > 1
      ? (currentIndex + 1) % facts.length
      : currentIndex;

  return {
    currentFact: facts[currentIndex] || null,
    nextFact: facts[nextIndex] || null,
    loading,
    error,
    isInitialEntry,
    isTransitioning,
  };
}

export default useFunFactTicker;
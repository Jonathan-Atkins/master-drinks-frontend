import { useEffect, useState } from "react";

import { API_URL } from "../../../config/api";

const ROTATION_INTERVAL_MS = 8000;
const ANIMATION_DURATION_MS = 750;

function useFunFactTicker() {
  const [facts, setFacts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] =
    useState(false);

  const [isExpanded, setIsExpanded] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const shouldAnimate = facts.length > 1;

  const safeActiveIndex =
    facts.length > 0
      ? activeIndex % facts.length
      : 0;

  const nextIndex =
    facts.length > 0
      ? (safeActiveIndex + 1) % facts.length
      : 0;

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
          throw new Error(
            "Unable to load fun facts"
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid fun fact response"
          );
        }

        setFacts(data);
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
    if (!shouldAnimate || isExpanded) {
      return undefined;
    }

    let timeoutId;

    const intervalId = setInterval(() => {
      setIsAnimating(true);

      timeoutId = setTimeout(() => {
        setActiveIndex(
          (currentIndex) =>
            currentIndex + 1
        );

        setIsAnimating(false);
      }, ANIMATION_DURATION_MS);
    }, ROTATION_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [shouldAnimate, isExpanded]);

  const expandCurrentFact = () => {
    setIsAnimating(false);
    setIsExpanded(true);
  };

  const collapseCurrentFact = () => {
    setIsAnimating(false);
    setIsExpanded(false);
  };

  return {
    currentFact:
      facts[safeActiveIndex] || null,

    nextFact:
      facts[nextIndex] || null,

    loading,
    error,
    shouldAnimate,
    isAnimating,
    isExpanded,
    expandCurrentFact,
    collapseCurrentFact,
  };
}

export default useFunFactTicker;
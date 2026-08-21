import { useEffect, useState } from "react";

function RotatingDrinkNames({ drinks }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] =
    useState(false);

  const shouldAnimate = drinks.length > 1;

  const nextIndex =
    drinks.length > 0
      ? (activeIndex + 1) % drinks.length
      : 0;

  const longestDrinkName =
    drinks.reduce((longest, drink) => {
      return drink.name.length > longest.length
        ? drink.name
        : longest;
    }, "");

  useEffect(() => {
    if (!shouldAnimate) {
      setActiveIndex(0);
      setIsAnimating(false);

      return undefined;
    }

    const interval = setInterval(() => {
      setIsAnimating(true);

      const timeout = setTimeout(() => {
        setActiveIndex(
          (currentIndex) =>
            (currentIndex + 1) % drinks.length
        );

        setIsAnimating(false);
      }, 600);

      return () => clearTimeout(timeout);
    }, 2500);

    return () => clearInterval(interval);
  }, [drinks.length, shouldAnimate]);

  if (drinks.length === 0) {
    return null;
  }

  return (
    <span className="rotating-drinks">
      <span
        className="rotating-drinks-sizer"
        aria-hidden="true"
      >
        {longestDrinkName}
      </span>

      <span className="rotating-drinks-underline">
        <span
          className={`rotating-drinks-current ${
            isAnimating
              ? "rotating-drinks-exit"
              : ""
          }`}
        >
          {drinks[activeIndex].name}
        </span>

        {shouldAnimate && (
          <span
            className={`rotating-drinks-next ${
              isAnimating
                ? "rotating-drinks-enter"
                : ""
            }`}
          >
            {drinks[nextIndex].name}
          </span>
        )}
      </span>
    </span>
  );
}

export default RotatingDrinkNames;
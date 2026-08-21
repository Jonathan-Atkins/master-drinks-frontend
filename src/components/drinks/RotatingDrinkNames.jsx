import { useEffect, useState } from "react";

function RotatingDrinkNames({ drinks }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const shouldAnimate = drinks.length > 1;

  const safeActiveIndex =
    drinks.length > 0
      ? activeIndex % drinks.length
      : 0;

  const nextIndex =
    drinks.length > 0
      ? (safeActiveIndex + 1) % drinks.length
      : 0;

  const longestDrinkName = drinks.reduce(
    (longest, drink) =>
      drink.name.length > longest.length
        ? drink.name
        : longest,
    ""
  );

  useEffect(() => {
    if (!shouldAnimate) {
      return undefined;
    }

    let timeoutId;

    const intervalId = setInterval(() => {
      setIsAnimating(true);

      timeoutId = setTimeout(() => {
        setActiveIndex(
          (currentIndex) => currentIndex + 1
        );

        setIsAnimating(false);
      }, 600);
    }, 2500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [shouldAnimate]);

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
            shouldAnimate && isAnimating
              ? "rotating-drinks-exit"
              : ""
          }`}
        >
          {drinks[safeActiveIndex].name}
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
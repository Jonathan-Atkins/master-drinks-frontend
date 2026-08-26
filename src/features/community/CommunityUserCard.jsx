import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import CommunityCardParticles from "./CommunityCardParticles";

const PRIME_DURATION = 2000;
const TAP_MOVEMENT_THRESHOLD = 10;

function CommunityUserCard({ user }) {
  const navigate = useNavigate();

  const [isPrimed, setIsPrimed] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const pointerStartRef = useRef({
    x: 0,
    y: 0,
  });

  const pointerMovedRef = useRef(false);
  const primeTimeoutRef = useRef(null);

  const initial =
    user.username
      ?.charAt(0)
      .toUpperCase() || "?";

  const profilePath =
    `/community/${encodeURIComponent(user.username)}`;

  useEffect(() => {
    return () => {
      if (primeTimeoutRef.current) {
        window.clearTimeout(
          primeTimeoutRef.current
        );
      }
    };
  }, []);

  const triggerParticles = () => {
    setBurstKey(
      (currentKey) => currentKey + 1
    );
  };

  const clearPrimeTimer = () => {
    if (!primeTimeoutRef.current) {
      return;
    }

    window.clearTimeout(
      primeTimeoutRef.current
    );

    primeTimeoutRef.current = null;
  };

  const resetPrimedState = () => {
    clearPrimeTimer();
    setIsPrimed(false);
  };

  const primeCard = () => {
    clearPrimeTimer();

    setIsPrimed(true);
    triggerParticles();

    primeTimeoutRef.current =
      window.setTimeout(() => {
        setIsPrimed(false);
        primeTimeoutRef.current = null;
      }, PRIME_DURATION);
  };

  const navigateToProfile = () => {
    resetPrimedState();
    navigate(profilePath);
  };

  const handlePointerEnter = (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    triggerParticles();
  };

  const handlePointerDown = (event) => {
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    pointerMovedRef.current = false;

    setIsPressed(true);

    event.currentTarget.focus({
      preventScroll: true,
    });
  };

  const handlePointerMove = (event) => {
    const xDifference = Math.abs(
      event.clientX -
        pointerStartRef.current.x
    );

    const yDifference = Math.abs(
      event.clientY -
        pointerStartRef.current.y
    );

    if (
      xDifference > TAP_MOVEMENT_THRESHOLD ||
      yDifference > TAP_MOVEMENT_THRESHOLD
    ) {
      pointerMovedRef.current = true;
      setIsPressed(false);
    }
  };

  const handlePointerUp = (event) => {
    setIsPressed(false);

    if (pointerMovedRef.current) {
      return;
    }

    if (event.pointerType === "mouse") {
      navigateToProfile();
      return;
    }

    if (isPrimed) {
      navigateToProfile();
      return;
    }

    primeCard();
  };

  const handlePointerCancel = () => {
    pointerMovedRef.current = true;
    setIsPressed(false);
  };

  const handleBlur = () => {
    resetPrimedState();
    setIsPressed(false);
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    navigateToProfile();
  };

  return (
    <article
      className={`community-user-card ${
        isPrimed
          ? "community-user-card-primed"
          : ""
      } ${
        isPressed
          ? "community-user-card-pressed"
          : ""
      }`}
      role="link"
      tabIndex={0}
      aria-label={`View ${user.username}'s profile`}
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {burstKey > 0 && (
        <CommunityCardParticles
          key={burstKey}
        />
      )}

      <div className="community-user-card-content">
        <div
          className="community-user-avatar"
          aria-hidden="true"
        >
          {initial}
        </div>

        <h2 className="community-username">
          {user.username}
        </h2>

        <div className="community-user-stats">
          <p>
            <strong>
              {user.drink_count}
            </strong>

            <span>Drinks</span>
          </p>

          <p>
            <strong>
              {user.recipe_count}
            </strong>

            <span>Recipes</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default CommunityUserCard;
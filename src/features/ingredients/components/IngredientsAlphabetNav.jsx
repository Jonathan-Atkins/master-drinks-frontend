// src/features/ingredients/components/IngredientsAlphabetNav.jsx

import { useRef, useState } from "react";

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function IngredientsAlphabetNav({
  availableLetters,
  onLetterJump,
}) {
  const navRef = useRef(null);

  const [
    activeLetter,
    setActiveLetter,
  ] = useState("");

  const [
    isScrubbing,
    setIsScrubbing,
  ] = useState(false);

  const jumpToLetterFromPointer = (
    clientY
  ) => {
    const nav = navRef.current;

    if (!nav) {
      return;
    }

    const buttons =
      nav.querySelectorAll(
        ".ingredients-alphabet-letter"
      );

    for (const button of buttons) {
      const rect =
        button.getBoundingClientRect();

      const isWithinLetter =
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (!isWithinLetter) {
        continue;
      }

      const letter =
        button.dataset.letter;

      const available =
        availableLetters.has(letter);

      if (!available) {
        return;
      }

      if (activeLetter !== letter) {
        setActiveLetter(letter);
        onLetterJump(letter);
      }

      return;
    }
  };

  const handlePointerDown = (
    event
  ) => {
    event.preventDefault();

    setIsScrubbing(true);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    jumpToLetterFromPointer(
      event.clientY
    );
  };

  const handlePointerMove = (
    event
  ) => {
    if (!isScrubbing) {
      return;
    }

    event.preventDefault();

    jumpToLetterFromPointer(
      event.clientY
    );
  };

  const handlePointerEnd = (
    event
  ) => {
    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    setIsScrubbing(false);

    window.setTimeout(() => {
      setActiveLetter("");
    }, 250);
  };

  const handleClick = (letter) => {
    if (!availableLetters.has(letter)) {
      return;
    }

    setActiveLetter(letter);

    onLetterJump(letter);

    window.setTimeout(() => {
      setActiveLetter("");
    }, 250);
  };

  return (
    <>
      {activeLetter && (
        <div
          className="ingredients-alphabet-preview"
          aria-hidden="true"
        >
          {activeLetter}
        </div>
      )}

      <nav
        ref={navRef}
        className={`ingredients-alphabet-nav ${
          isScrubbing
            ? "ingredients-alphabet-nav-scrubbing"
            : ""
        }`}
        aria-label="Jump to ingredient by letter"
        onPointerDown={
          handlePointerDown
        }
        onPointerMove={
          handlePointerMove
        }
        onPointerUp={
          handlePointerEnd
        }
        onPointerCancel={
          handlePointerEnd
        }
      >
        {ALPHABET.map((letter) => {
          const available =
            availableLetters.has(letter);

          const active =
            activeLetter === letter;

          return (
            <button
              key={letter}
              type="button"
              data-letter={letter}
              className={`ingredients-alphabet-letter ${
                active
                  ? "ingredients-alphabet-letter-active"
                  : ""
              }`}
              disabled={!available}
              aria-label={`Jump to ingredients beginning with ${letter}`}
              onClick={() =>
                handleClick(letter)
              }
            >
              {letter}
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default IngredientsAlphabetNav;
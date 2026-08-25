import PropTypes from "prop-types";

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function IngredientsAlphabetNav({
  availableLetters,
  onLetterJump,
}) {
  return (
    <nav
      className="ingredients-alphabet-nav"
      aria-label="Jump to ingredient by letter"
    >
      {ALPHABET.map((letter) => {
        const available =
          availableLetters.has(letter);

        return (
          <button
            key={letter}
            type="button"
            className="ingredients-alphabet-letter"
            disabled={!available}
            aria-label={`Jump to ingredients beginning with ${letter}`}
            onClick={() =>
              onLetterJump(letter)
            }
          >
            {letter}
          </button>
        );
      })}
    </nav>
  );
}

IngredientsAlphabetNav.propTypes = {
  availableLetters:
    PropTypes.instanceOf(Set).isRequired,
  onLetterJump: PropTypes.func.isRequired,
};

export default IngredientsAlphabetNav;
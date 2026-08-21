function JitterText({ children, className = "" }) {
  const text = String(children);

  return (
    <span
      className={`jitter-text ${className}`.trim()}
      aria-label={text}
    >
      {text.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="jitter-text-character"
          aria-hidden="true"
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  );
}

export default JitterText;
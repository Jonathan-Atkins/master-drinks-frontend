function JitterText({ children, step = 0.08, className = "" }) {
  const text = typeof children === "string" ? children : "";

  return (
    <span className={`write-text ${className}`.trim()} aria-label={text}>
      {text.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="write-letter"
          style={{ animationDelay: `${index * step}s` }}
          aria-hidden="true"
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  );
}

export default JitterText;
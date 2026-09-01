function SquigglyUnderline({
  as: Component = "div",
  children,
  className = "",
  color = "green",
  ...props
}) {
  const squiggleColor =
    color === "red" ? "#c61f4d" : "#68a040";

  return (
    <Component
      className={`squiggle-heading ${className}`.trim()}
      {...props}
    >
      <span className="squiggle-heading__text">
        {children}
      </span>

      <svg
        className="squiggle-heading__svg"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 0 10 C 15 10, 20 6, 30 10 C 40 14, 45 6, 55 10 C 65 14, 70 6, 80 10 C 90 14, 95 10, 100 10"
          fill="none"
          stroke={squiggleColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Component>
  );
}

export default SquigglyUnderline;

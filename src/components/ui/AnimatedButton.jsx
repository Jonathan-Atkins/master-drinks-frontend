function AnimatedButton({
  children,
  variant = "default",
  type = "button",
  onClick,
  disabled = false,
}) {
  const animationTiming = {
    "--content": `"${children}"`,
    "--bubble-duration": "6s",
    "--bubble-delay": "-2.5s",
  };

  return (
    <button
      type={type}
      className={`animated-button animated-button-${variant}`}
      style={animationTiming}
      onClick={onClick}
      disabled={disabled}
    >
      <span
        className="animated-button-left"
        aria-hidden="true"
      />

      <span className="animated-button-label">
        {children}
      </span>

      <span
        className="animated-button-right"
        aria-hidden="true"
      />
    </button>
  );
}

export default AnimatedButton;
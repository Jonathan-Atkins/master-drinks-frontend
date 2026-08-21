function AnimatedButton({
  children,
  variant = "default",
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`animated-button animated-button-${variant}`}
      style={{ "--content": `"${children}"` }}
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
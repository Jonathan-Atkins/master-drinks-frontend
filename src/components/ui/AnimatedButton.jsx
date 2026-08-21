import { useMemo } from "react";

function AnimatedButton({
  children,
  variant = "default",
  type = "button",
  onClick,
  disabled = false,
}) {
  const animationTiming = useMemo(() => {
    const duration = 4.5 + Math.random() * 2.5;
    const delay = Math.random() * -5;

    return {
      "--content": `"${children}"`,
      "--bubble-duration": `${duration}s`,
      "--bubble-delay": `${delay}s`,
    };
  }, [children]);

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
function BarSpoonDivider() {
  return (
    <div
      className="bar-spoon-divider"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 240 24"
        role="presentation"
        focusable="false"
      >
        <ellipse
          cx="20"
          cy="12"
          rx="14"
          ry="8"
          fill="none"
        />

        <circle
          cx="37"
          cy="12"
          r="2.5"
          fill="currentColor"
          stroke="none"
        />

        <line
          x1="39.5"
          y1="12"
          x2="60"
          y2="12"
        />

        <path d="M60 8 L68 16" />
        <path d="M68 8 L76 16" />
        <path d="M76 8 L84 16" />
        <path d="M84 8 L92 16" />
        <path d="M92 8 L100 16" />
        <path d="M100 8 L108 16" />
        <path d="M108 8 L116 16" />
        <path d="M116 8 L124 16" />
        <path d="M124 8 L132 16" />
        <path d="M132 8 L140 16" />
        <path d="M140 8 L148 16" />
        <path d="M148 8 L156 16" />
        <path d="M156 8 L164 16" />

        <line
          x1="164"
          y1="12"
          x2="206"
          y2="12"
        />

        <rect
          x="206"
          y="9"
          width="24"
          height="6"
          rx="3"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default BarSpoonDivider;
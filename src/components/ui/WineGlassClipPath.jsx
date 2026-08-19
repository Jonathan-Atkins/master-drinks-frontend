function WineGlassClipPath() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath
          id="wine-glass-shape"
          clipPathUnits="objectBoundingBox"
        >
          <path
            d="
              M 0.08 0.03
              C 0.24 0.01, 0.76 0.01, 0.92 0.03
              C 0.98 0.10, 1.00 0.32, 0.99 0.52
              C 0.98 0.75, 0.90 0.93, 0.76 0.98
              C 0.62 1.00, 0.38 1.00, 0.24 0.98
              C 0.10 0.93, 0.02 0.75, 0.01 0.52
              C 0.00 0.32, 0.02 0.10, 0.08 0.03
              Z
            "
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default WineGlassClipPath;
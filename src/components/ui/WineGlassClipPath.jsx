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
              M 0.15 0.06
              C 0.30 0.03, 0.70 0.03, 0.85 0.06
              C 0.92 0.13, 0.95 0.34, 0.94 0.52
              C 0.93 0.73, 0.86 0.90, 0.73 0.96
              C 0.60 1.00, 0.40 1.00, 0.27 0.96
              C 0.14 0.90, 0.07 0.73, 0.06 0.52
              C 0.05 0.34, 0.08 0.13, 0.15 0.06
              Z
            "
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default WineGlassClipPath;
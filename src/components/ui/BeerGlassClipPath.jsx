function BeerGlassClipPath() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath
          id="beer-glass-shape"
          clipPathUnits="objectBoundingBox"
        >
          <path
            d="
              M 0.08 0.05
              C 0.14 0.02, 0.68 0.02, 0.74 0.05

              L 0.74 0.18

              C 0.84 0.14, 0.94 0.18, 0.97 0.28
              C 1.00 0.38, 1.00 0.58, 0.97 0.68
              C 0.94 0.78, 0.84 0.82, 0.74 0.78

              L 0.74 0.90

              C 0.70 0.97, 0.16 0.97, 0.08 0.90

              L 0.08 0.05

              Z
            "
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default BeerGlassClipPath;
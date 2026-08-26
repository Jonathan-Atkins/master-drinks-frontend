const PARTICLE_COUNT = 240;

const createParticle = (index) => {
  const side = index % 4;
  const position = (index * 37) % 100;

  const isSparkle = index % 24 === 0;

  const variationX =
    ((index * 19) % 100) - 50;

  const variationY =
    ((index * 31) % 100) - 50;

  let startTop;
  let startLeft;
  let x;
  let y;

  // Top edge → downward
  if (side === 0) {
    startTop = -2;
    startLeft = position;

    x = variationX;
    y = 180 + ((index * 17) % 180);
  }

  // Right edge → left
  if (side === 1) {
    startTop = position;
    startLeft = 102;

    x = -180 - ((index * 23) % 220);
    y = variationY;
  }

  // Bottom edge → upward
  if (side === 2) {
    startTop = 102;
    startLeft = position;

    x = variationX;
    y = -180 - ((index * 29) % 180);
  }

  // Left edge → right
  if (side === 3) {
    startTop = position;
    startLeft = -2;

    x = 180 + ((index * 27) % 220);
    y = variationY;
  }

  return {
    type: isSparkle
      ? "sparkle"
      : "dust",

    startTop,
    startLeft,

    x,
    y,

    size: isSparkle
      ? 4 + (index % 3)
      : 1 + (index % 3),

    delay:
      (index * 11) % 420,

    duration:
      900 +
      ((index * 37) % 750),

    rotate:
      (index * 53) % 360,

    opacity:
      0.4 +
      ((index * 7) % 50) / 100,
  };
};

const particles = Array.from(
  { length: PARTICLE_COUNT },
  (_, index) =>
    createParticle(index),
);

function CommunityCardParticles() {
  return (
    <div
      className="community-card-particles"
      aria-hidden="true"
    >
      {particles.map(
        (particle, index) => (
          <span
            key={`${particle.type}-${index}`}
            className={
              `community-particle ` +
              `community-particle-${particle.type}`
            }
            style={{
              top:
                `${particle.startTop}%`,

              left:
                `${particle.startLeft}%`,

              right: "auto",

              "--particle-x":
                `${particle.x}px`,

              "--particle-y":
                `${particle.y}px`,

              "--particle-size":
                `${particle.size}px`,

              "--particle-delay":
                `${particle.delay}ms`,

              "--particle-duration":
                `${particle.duration}ms`,

              "--particle-rotate":
                `${particle.rotate}deg`,

              "--particle-opacity":
                particle.opacity,
            }}
          />
        ),
      )}
    </div>
  );
}

export default CommunityCardParticles;
const PARTICLE_COUNT = 90;

const directions = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

const particles = Array.from(
  { length: PARTICLE_COUNT },
  (_, index) => {
    const direction =
      directions[index % directions.length];

    const distance =
      70 + ((index * 23) % 260);

    const spreadX =
      ((index * 17) % 80) - 40;

    const spreadY =
      ((index * 29) % 80) - 40;

    const isSparkle =
      index % 14 === 0;

    return {
      type: isSparkle
        ? "sparkle"
        : "dust",

      x:
        direction.x * distance +
        spreadX,

      y:
        direction.y * distance +
        spreadY,

      size: isSparkle
        ? 4 + (index % 2)
        : 1 + (index % 3),

      delay:
        (index * 13) % 260,

      duration:
        750 +
        ((index * 31) % 500),

      rotate:
        (index * 47) % 360,
    };
  },
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
            className={`community-particle community-particle-${particle.type}`}
            style={{
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
            }}
          />
        ),
      )}
    </div>
  );
}

export default CommunityCardParticles;
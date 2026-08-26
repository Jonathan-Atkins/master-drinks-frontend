const particles = [
  {
    type: "sparkle",
    x: -48,
    y: 42,
    size: 5,
    delay: 0,
    duration: 720,
    rotate: 80,
  },
  {
    type: "dust",
    x: -92,
    y: 68,
    size: 3,
    delay: 45,
    duration: 820,
    rotate: 20,
  },
  {
    type: "dust",
    x: -145,
    y: 94,
    size: 4,
    delay: 80,
    duration: 890,
    rotate: 45,
  },
  {
    type: "sparkle",
    x: -205,
    y: 125,
    size: 5,
    delay: 120,
    duration: 960,
    rotate: 130,
  },
  {
    type: "dust",
    x: -255,
    y: 160,
    size: 3,
    delay: 150,
    duration: 1020,
    rotate: 35,
  },
  {
    type: "dust",
    x: -110,
    y: 185,
    size: 3,
    delay: 100,
    duration: 940,
    rotate: 60,
  },
  {
    type: "sparkle",
    x: -180,
    y: 215,
    size: 4,
    delay: 185,
    duration: 1080,
    rotate: 150,
  },
  {
    type: "dust",
    x: -285,
    y: 235,
    size: 2,
    delay: 210,
    duration: 1120,
    rotate: 45,
  },
  {
    type: "dust",
    x: -70,
    y: 255,
    size: 3,
    delay: 160,
    duration: 1040,
    rotate: 90,
  },
  {
    type: "sparkle",
    x: -230,
    y: 285,
    size: 4,
    delay: 240,
    duration: 1160,
    rotate: 180,
  },
  {
    type: "dust",
    x: -320,
    y: 310,
    size: 3,
    delay: 280,
    duration: 1200,
    rotate: 75,
  },
  {
    type: "dust",
    x: -140,
    y: 325,
    size: 2,
    delay: 260,
    duration: 1150,
    rotate: 120,
  },
];

function CommunityCardParticles() {
  return (
    <div
      className="community-card-particles"
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <span
          key={`${particle.type}-${index}`}
          className={`community-particle community-particle-${particle.type}`}
          style={{
            "--particle-x": `${particle.x}px`,
            "--particle-y": `${particle.y}px`,
            "--particle-size": `${particle.size}px`,
            "--particle-delay": `${particle.delay}ms`,
            "--particle-duration": `${particle.duration}ms`,
            "--particle-rotate": `${particle.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default CommunityCardParticles;
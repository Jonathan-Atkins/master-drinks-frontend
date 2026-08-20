const decorationImages = [
  "/babyangel.jpg",
  "/flower.png",
  "/bottle_rope.jpg",
  "/bottle.jpg",
  "/panther.jpg",
  "/rose.jpg",
  "/skull.jpg",
  "/sparrow.jpg",
  "/whiskey.jpg",
  "/eagle.jpg",
  "/mr_lucky.png",
  "/water_bottle.png",
];

function AuthDecorations() {
  return (
    <div className="auth-decorations" aria-hidden="true">
      {decorationImages.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`auth-decoration auth-decoration-${index + 1}`}
          loading="eager"
          decoding="async"
        />
      ))}
    </div>
  );
}

export default AuthDecorations;
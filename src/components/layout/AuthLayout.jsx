function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <video
        className="beer-background"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/beer_background.mp4" type="video/mp4" />
      </video>

      {children}
    </div>
  );
}

export default AuthLayout;
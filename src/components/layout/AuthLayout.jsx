import AuthDecorations from "../ui/AuthDecorations";

function AuthLayout({
  children,
  showDecorations = false,
}) {
  return (
    <div className="auth-layout">
      {showDecorations && <AuthDecorations />}

      <div className="auth-layout-content">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
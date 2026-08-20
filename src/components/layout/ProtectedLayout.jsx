import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import NavBar from "./NavBar";

function ProtectedLayout() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavBar />

      <img
        className="page-flower"
        src="/flower.png"
        alt=""
        aria-hidden="true"
      />

      <img
        className="page-babyangel"
        src="/babyangel.jpg"
        alt=""
        aria-hidden="true"
      />

      <Outlet />
    </>
  );
}

export default ProtectedLayout;
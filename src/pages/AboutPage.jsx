import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import AboutMe from "../components/about/AboutMe";
import AuthLayout from "../components/layout/AuthLayout";
import NavBar from "../components/layout/NavBar";

function AboutPage() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login");

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {user && <NavBar />}

      <AuthLayout>
        <AboutMe
          showBackToLogin={!user}
          onBackToLogin={handleBackToLogin}
        />
      </AuthLayout>
    </>
  );
}

export default AboutPage;
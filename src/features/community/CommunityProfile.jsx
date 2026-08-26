import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { API_URL } from "../../config/api";

function CommunityProfile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/api/v1/profiles/${encodeURIComponent(username)}`,
          {
            credentials: "include",
          }
        );

        if (response.status === 404) {
          throw new Error(
            "Community member not found."
          );
        }

        if (!response.ok) {
          throw new Error(
            "Unable to load community profile."
          );
        }

        const data = await response.json();

        setProfile(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <p className="community-profile-status">
        Loading profile...
      </p>
    );
  }

  if (error) {
    return (
      <section className="community-profile-state">
        <p className="community-profile-error">
          {error}
        </p>

        <Link
          to="/community"
          className="community-profile-back-link"
        >
          Back to Community
        </Link>
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  const initial =
    profile.username
      ?.charAt(0)
      .toUpperCase() || "?";

  return (
    <section className="community-profile">
      <Link
        to="/community"
        className="community-profile-back-link"
      >
        Back to Community
      </Link>

      <div className="community-profile-card">
        <div
          className="community-profile-avatar"
          aria-hidden="true"
        >
          {initial}
        </div>

        <header className="community-profile-header">
          <h1 className="community-profile-username">
            {profile.username}
          </h1>
        </header>

        <div className="community-profile-stats">
          <div className="community-profile-stat">
            <strong>
              {profile.drink_count}
            </strong>

            <span>Drinks</span>
          </div>

          <div className="community-profile-stat">
            <strong>
              {profile.recipe_count}
            </strong>

            <span>Recipes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommunityProfile;
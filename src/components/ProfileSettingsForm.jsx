import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function ProfileSettingsForm() {
  const { user } = useContext(AuthContext);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  return (
    <section>
      <h2>Profile</h2>

      <form>
        <div>
          <label htmlFor="username">Username</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <button type="submit">
          Save Changes
        </button>
      </form>
    </section>
  );
}

export default ProfileSettingsForm;
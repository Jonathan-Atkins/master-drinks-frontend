import { useState } from "react";
import { API_URL } from "../config/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${API_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

     if (response.ok) {
      navigate("/personal");
    } else {
      alert(
        data.errors?.join(", ") ||
        data.error ||
        "Login Error, please try again."
      );
    }

    console.log(data);
  };

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Log In</button>
      </form>

      <p>
        Don&apos;t have an account? <Link to="/register">Create one</Link>
      </p>
    </main>
  );
}

export default LoginPage;

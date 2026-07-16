import { useState } from "react";
import { API_URL } from "../config/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return <h1>Login Page</h1>;
}

export default LoginPage;

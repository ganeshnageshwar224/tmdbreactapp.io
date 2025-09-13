import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // access token not used in TMDb login flow, but keeping as per your form
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_KEY = "5cd4c9880a1bc651fb5e2193600d6d70"; // Example: 5cd4c9880a1bc651fb5e2193600d6d70

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Create request token
      const tokenRes = await fetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${token}`
      );
      const tokenData = await tokenRes.json();
      if (!tokenData.success) throw new Error("Failed to create request token");

      // 2. Validate with login
      const validateRes = await fetch(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password,
            request_token: tokenData.request_token,
          }),
        }
      );
      const validateData = await validateRes.json();
      if (!validateData.success)
        throw new Error(validateData.status_message || "Invalid credentials");

      // 3. Create session
      const sessionRes = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ request_token: validateData.request_token }),
        }
      );
      const sessionData = await sessionRes.json();
      if (!sessionData.success) throw new Error("Failed to create session");

      // ✅ Save session_id in localStorage
      localStorage.setItem("tmdb_session_id", sessionData.session_id);

      // Redirect to home
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-4">Login</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          {/* Admin Field */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Admin *"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password *"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Token Field (optional, not needed by TMDb API) */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Token *"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

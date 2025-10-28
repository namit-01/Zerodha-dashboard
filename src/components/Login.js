import React, { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔗 Load API URL from .env
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/signin`, {
        username,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setMessage("✅ Login successful!");
      } else {
        setMessage("❌ Invalid username or password");
      }
    } catch (error) {
      console.error("Signin error:", error);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{
        backgroundImage: "linear-gradient(135deg, #e3f2fd, #bbdefb, #e3f2fd)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "400px",
          borderRadius: "14px",
          backgroundColor: "#fff",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <img
            src="/logo.png"
            alt="Zerodha Logo"
            style={{ width: "70px", marginBottom: "10px" }}
          />
          <h4 className="fw-bold text-primary mb-1">Welcome Back</h4>
          <p className="text-muted small">Login to your Zerodha account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                padding: "10px",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                padding: "10px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 fw-semibold"
            style={{
              borderRadius: "10px",
              padding: "10px 0",
              fontSize: "16px",
              transition: "0.3s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Message */}
        {message && (
          <p
            className={`mt-3 text-center fw-medium ${
              message.startsWith("✅") ? "text-success" : "text-danger"
            }`}
          >
            {message}
          </p>
        )}

        {/* Optional footer text */}
        <p className="text-center mt-3 text-muted small">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;

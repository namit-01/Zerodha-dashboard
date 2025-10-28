import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // ✅ use .env variable

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          // ✅ Clear token and redirect
          localStorage.removeItem("token");
          navigate("/signin");
        } else {
          console.error("❌ Logout failed:", await res.json());
        }
      } catch (error) {
        console.error("❌ Error logging out:", error);
      }
    };

    logout();
  }, [API_URL, navigate]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-5 text-center"
        style={{
          width: "420px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
          alt="Logging out"
          width="80"
          className="mb-3"
        />
        <h3 className="fw-bold text-primary mb-2">Logging you out...</h3>
        <p className="text-muted mb-4">
          Please wait while we safely sign you out of your account.
        </p>
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <small className="text-muted">You will be redirected shortly.</small>
      </div>
    </div>
  );
};

export default Logout;

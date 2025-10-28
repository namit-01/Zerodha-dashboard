import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3002/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
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
  }, [navigate]);

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Logging out...</h2>
      <p>Please wait while we safely sign you out.</p>
    </div>
  );
};

export default Logout;

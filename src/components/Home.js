import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // ✅ Check token in URL
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      // Save token to localStorage
      localStorage.setItem("token", urlToken);
      setToken(urlToken);

      // Remove token from URL for cleanliness
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Or get existing token from storage
      const savedToken = localStorage.getItem("token");
      if (savedToken) setToken(savedToken);
    }
  }, []);

  return (
    <>
      {token ? (
        <>
          <TopBar />
          <Dashboard />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <h2>Please sign in to continue</h2>
          <p>No valid token found.</p>
        </div>
      )}
    </>
  );
};

export default Home;

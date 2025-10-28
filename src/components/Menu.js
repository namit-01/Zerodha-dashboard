import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Load API URL from .env
  const API_URL = process.env.REACT_APP_API_URL;

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No active session found.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        alert("✅ Logged out successfully");
        navigate("/login");
      } else {
        alert("❌ Logout failed, please try again.");
      }
    } catch (error) {
      console.error("❌ Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="Logo" />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {/* Profile section */}
        <div className="profile position-relative" onClick={handleProfileClick}>
          <div
            className="avatar bg-primary text-white fw-bold rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
          >
            ZU
          </div>
          <p className="username ms-2 mb-0 fw-semibold text-dark">USERID</p>

          {/* 🌟 Stylish Dropdown */}
          {isProfileDropdownOpen && (
            <div
              className="position-absolute end-0 mt-2 p-3 shadow-lg rounded-3 border"
              style={{
                width: "200px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                animation: "fadeIn 0.3s ease-in-out",
                zIndex: 1000,
              }}
            >
              <div className="text-center mb-3">
                <i className="bi bi-person-circle fs-3 text-primary"></i>
                <p className="fw-semibold mt-2 mb-0">USERID</p>
                <small className="text-muted">Trader Account</small>
              </div>

              <hr className="my-2" />

              <button
                className="btn btn-danger w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                onClick={handleLogout}
                style={{
                  borderRadius: "12px",
                  padding: "10px 0",
                  transition: "all 0.3s ease",
                }}
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ Load API URL from .env
  const API_URL = process.env.REACT_APP_API_URL;

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // ✅ Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        { headers: { Authorization: `Bearer ${token}` } }
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

        {/* Profile Dropdown */}
        <div className="profile position-relative" ref={dropdownRef}>
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handleProfileClick}
          >
            <div
              className="avatar bg-primary text-white fw-bold rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              ZU
            </div>
            <p className="username ms-2 mb-0 fw-semibold text-dark">USERID</p>
          </div>

          {isProfileDropdownOpen && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                minWidth: "180px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "#fff",
                padding: "8px 0",
                zIndex: 2000,
              }}
            >
              <button
                onClick={handleLogout}
                className="dropdown-item text-danger fw-semibold text-center"
                style={{
                  background: "none",
                  border: "none",
                  padding: "10px",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#f8f9fa")}
                onMouseLeave={(e) => (e.target.style.background = "none")}
              >
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;

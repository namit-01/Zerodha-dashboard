import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  // ✅ Access context methods properly
  const { closeBuyWindow } = useContext(GeneralContext);

  // ✅ Use API base URL from .env
  const API_URL = process.env.REACT_APP_API_URL;

  const handleBuyClick = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("🪙 Token:", token);

      const response = await axios.post(
        `${API_URL}/addOrder`,
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: "BUY",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Order Response:", response.data);
      alert("Order placed successfully!");
      closeBuyWindow(); // ✅ close after success
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Failed to place order. Please login again.");
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow(); // ✅ use context function correctly
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;

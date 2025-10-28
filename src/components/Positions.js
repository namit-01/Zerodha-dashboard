import React, { useEffect, useState } from "react";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  // ✅ Fetch positions from backend
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found — please sign in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/positions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setPositions(data.data || []);
        } else {
          setError(data.message || "Failed to fetch positions");
        }
      } catch (err) {
        console.error("❌ Error fetching positions:", err);
        setError("Something went wrong while fetching positions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [API_URL]);

  if (loading) return <p>⏳ Loading positions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;

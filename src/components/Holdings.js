import React, { useEffect, useState } from "react";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  // ✅ Fetch holdings from backend
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found — please sign in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/holdings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setHoldings(data.data);
        } else {
          setError(data.message || "Failed to fetch holdings");
        }
      } catch (err) {
        console.error("❌ Error fetching holdings:", err);
        setError("Something went wrong while fetching holdings.");
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [API_URL]);

  if (loading) return <p>⏳ Loading holdings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // ✅ Prepare chart data
  const labels = holdings.map((stock) => stock.name);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: holdings.map((stock) => stock.price),
        backgroundColor: "rgba(99, 132, 255, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={chartData} />
    </>
  );
};

export default Holdings;

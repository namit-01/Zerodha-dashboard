import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found — please sign in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(data.data);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Something went wrong while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [API_URL]);

  if (loading) return <p>⏳ Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Placed On</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const isBuy = order.mode === "BUY";
              const modeClass = isBuy ? "profit" : "loss";

              return (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  <td className={modeClass}>{order.mode}</td>
                  <td>{order.status || "Completed"}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{orders.length}</h5>
          <p>Total Orders</p>
        </div>
        <div className="col">
          <h5>
            ₹
            {orders
              .reduce((sum, order) => sum + order.price * order.qty, 0)
              .toFixed(2)}
          </h5>
          <p>Total Value</p>
        </div>
        <div className="col">
          <h5>{orders.filter((order) => order.mode === "BUY").length}</h5>
          <p>Buy Orders</p>
        </div>
      </div>
    </>
  );
};

export default Orders;

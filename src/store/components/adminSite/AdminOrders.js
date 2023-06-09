import "./AdminOrders.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AdminOrders = () => {
  const navigate = useNavigate();
  const adminOrders = useSelector(state => state.adminOrders);
  const { orderLoaded, orders } = adminOrders;

  const handleDetails = (id) => {
    navigate(`/store/admin/oders/${id}`);
  }


  const fiveDigit = (num) => {
    return num.toString().padStart(5, "0");
  }

  return (
    <div className="admin-order-container">
      <div className="title-adminsite">
        <h2>Orders</h2>
      </div>
      <div className="admin-orders-options">
        {orderLoaded ?
          <>
            <div>
              <h3>Not Confirmed</h3>
              {orders.filter(order => order.finalStatus === "pending").map((order, index) => (
                <div className="admin-order-view" key={index}>
                  <div><p>{index + 1}</p></div>
                  <div><p>  {fiveDigit(order.orderNumber)} </p></div>
                  <div><p> ${order.total.toFixed(2)} </p></div>
                  <div className="unconfirmed-order"><p> Not Confirmed </p></div>
                  <div>
                    <button
                      onClick={() => handleDetails(order._id)}
                    >detail</button></div>
                </div>
              ))}
            </div>
            <div>
              <h3>Confirmed Orders</h3>
              {orders.filter(order => order.finalStatus !== "pending").map((order, index) => (
                <div className="admin-order-view" key={index}>
                  <div><p>{index + 1}</p></div>
                  <div><p>{fiveDigit(order.orderNumber)}</p></div>
                  <div><p>${order.total.toFixed(2)}</p></div>
                  <div className={order.finalStatus === 'confirmed' ?
                    "confirmed-order" : "cancelled-order"
                  }><p>{order.finalStatus === 'confirmed' ?
                    "confirmed" : "cancelled"
                  }</p></div>
                  <div><button
                    onClick={() => handleDetails(order._id)}
                  >see</button></div>
                </div>
              ))}
            </div>

          </>
          : <div> Loadibg...</div>}
      </div>
    </div>
  );
};

export default AdminOrders;

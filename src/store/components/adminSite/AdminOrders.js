import "./AdminOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAdminOrders } from "../../../redux/store/actions/adminOrdersAction";
const AdminOrders = () => {
  const navigate = useNavigate();
  const adminOrders = useSelector(state => state.adminOrders);
  const { orderLoaded, orders } = adminOrders;
  const dispatch = useDispatch();
  const handleDetails = (id) => {
    navigate(`/store/admin/oders/${id}`);
  }

  const fiveDigit = (num) => {
    return num.toString().padStart(5, "0");
  }

  
  const orders2 =[
    {
      _id:1,
      orderNumber: 1,
      finalStatus: 'success',
      total:100,
    },
    {
      _id:2,
      orderNumber: 2,
      finalStatus: 'pending',
      total:100,
    },
    {
      _id:3,
      orderNumber: 3,
      finalStatus: 'pending',
      total:100,
    },
    {
      _id:4,
      orderNumber: 4,
      finalStatus: 'success',
      total:100,
    },
  ]
  return (
    <div className="admin-order-container">
      <div className="title-adminsite">
        <h2>Orders</h2>
      </div>
      <div className="admin-orders-options">
        {!orderLoaded ?
          <>
            <div>
              <h3>Not Confirmed</h3>
              {orders.slice().reverse().filter(order => order.finalStatus === "pending").map((order, index) => (
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
              {orders.slice().reverse().filter(order => order.finalStatus !== "pending").map((order, index) => (
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
          : <div> Loading...</div>}
      </div>
    </div>
  );
};

export default AdminOrders;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import "./OrderScreen.css";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const Orders = useSelector((state) => state.orders);
  const { orderLoaded, orders } = Orders;

 
  const { loginSuccess, userDetails } = user;


  const fiveDigit = (num) => {
    return num.toString().padStart(5, "0");
  };

  const orderDetail = (id) => {
    navigate(`/store/order/${id}`);
  }

  const splitDate = (date) => {
    const dateArr = date.split("T");
    const dateArr2 = dateArr[0].split("-");
    return `${dateArr2[1]}/${dateArr2[2]}/${dateArr2[0]}`;
  };
  const orders2 =[{
    orderNumber:2,
    finalStatus:"wait",
    total:1200,
    createdAt: "07/07/2023",
    _id:1
  },
  {
    orderNumber:2,
    finalStatus:"wait",
    total:1200,
    createdAt: "07/07/2023",
    _id:1
  },
  {
    orderNumber:2,
    finalStatus:"wait",
    total: 1200.00,
    createdAt: "07/07/2023",
    _id:1
  },
  {
    orderNumber:2,
    finalStatus:"wait",
    total:1200,
    createdAt: "07/07/2023",
    _id:1
  },

]
  
  return (
<div className="w-full h-full text-lg">
  <div className="w-full md:ml-12 flex flex-col">
    <div className="w-full text-center py-5">
      <h2 className="text-3xl font-bold text-gray-800">Mis Órdenes</h2>
    </div>
    <div className="flex flex-col items-center md:items-stretch space-y-4">
      {orderLoaded ? (
        orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              className="md:ml-12 w-11/12 rounded-md bg-gray-100 border border-gray-300 shadow-md p-4 text-center md:text-left"
              key={index}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-2 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900"># {fiveDigit(order.orderNumber)}</h3>
                </div>
                <div className="mb-2 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">Estado: {order.finalStatus}</h3>
                </div>
                <div className="mb-2 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">{order.total.toFixed(2)}</h3>
                </div>
                <div className="mb-2 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">{splitDate(order.createdAt)}</h3>
                </div>
                <div>
                  <button
                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-500"
                    onClick={() => orderDetail(order._id)}
                  >
                    Detalles
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No tienes órdenes</p>
        )
      ) : (
        <p className="text-black font-bold text-3xl">Cargando...</p>
      )}
    </div>
  </div>
</div>



  );
};

export default OrderScreen;

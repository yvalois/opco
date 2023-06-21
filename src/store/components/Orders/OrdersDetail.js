import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./OrderDetail.css";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.orders);
  const { orderLoaded, orders } = Orders;

  const [selectedorder, setSelectedOrder] = useState({
    orderNumber: "",
    finalStatus: "",
    total: "",
    _id: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderLoaded && loading) {
      const order = orders.find((p) => p._id === id);
      setSelectedOrder(order);
      setLoading(false);
    }
  }, [id, orders, orderLoaded, selectedorder]);

  const fiveDigit = (num) => {
    return num.toString().padStart(5, "0");
  };

  const dateSplit = (date) => {
    const dateArr = date.split("T");
    const dateArr2 = dateArr[0].split("-");
    return `${dateArr2[1]}/${dateArr2[2]}/${dateArr2[0]}`;
  }
  const selectedorder2 = {
    orderNumber: "1",
    finalStatus: "entregado",
    total: 1000000,
    _id: "1",
    txHash: "0x...................",
    tokenUsed: "USDT",
    createdAt: "07/07/07",
    products: [{
      name: "cafe",
      count: 2,
      option: 3,
      price: 1200000000
    }]
  }
  return (
    <div className="w-screen sm:w-full h-full">

      <div className="w-full flex flex-col">

        <div className="w-full flex-col justify-center items-center mx-auto my-4">
          <div className="order-detail-title mb-4 text-center">
            <h2 className="text-3xl font-bold text-white">Order Details</h2>
          </div>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-full sm:w-4/5 md:w-auto bg-white rounded-lg shadow-xl overflow-hidden m-4">
                <div className="bg-gray-800 text-white p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-0">#{fiveDigit(selectedorder.orderNumber)}</h3>
                    <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-0">Status: {selectedorder.finalStatus}</h3>
                    <h3 className="text-lg sm:text-xl font-medium">{dateSplit(selectedorder.createdAt)}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="max-w-4xl mx-auto">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium mb-4">Productos:</h3>
                      {selectedorder.products.map((item, index) => (
                        <div className="order-detail-item mb-4 sm:mb-6" key={index}>
                          <h3 className="text-lg sm:text-xl font-medium mb-2">{item.name}</h3>
                          <div className="flex flex-wrap justify-between">
                            <span className="order-detail-info">Qty: {item.count}</span>
                            <span className="order-detail-info">Option: {item.option}</span>
                            <span className="order-detail-info">Price: ${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-between mt-6">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium">Total: ${selectedorder.total.toFixed(2)}</h3>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium">Token: {selectedorder.tokenUsed}</h3>
                      </div>
                    </div>
                    <div>
                      <a href={`https://bscscan.com/tx/${selectedorder.txHash}`} className="md:text-lg text-md font-medium text-blue-500 hover:underline">
                        <p>TxHash: {selectedorder.txHash}</p>
                      </a>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg sm:text-xl font-medium">Direction: {selectedorder.delivery}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          )}
        </div>



      </div>

    </div>







  );
};

export default OrderDetails;

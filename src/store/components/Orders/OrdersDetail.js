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
    const selectedorder2 ={
      orderNumber: "1",
      finalStatus: "entregado",
      total: 1000000 ,
      _id: "1",
      txHash:"0x...................",
      tokenUsed:"USDT",
      createdAt:"07/07/07",
      products:[{
        name:"cafe",
        count:2,
        option:3,
        price:1200000000
      }]
  }
  return (
<div className="w-full h-full">
  <div className="max-w-4xl mx-auto my-4">
    <div className="order-detail-title mb-4">
      <h2 className="text-3xl font-bold">Order Details</h2>
    </div>
    {!loading ? (
      <h2>Loading...</h2>
    ) : (
      <div className="rounded-lg shadow-xl bg-white overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 text-white p-6">
          <h3 className="text-xl font-medium sm:mb-0">#{fiveDigit(selectedorder2.orderNumber)}</h3>
          <h3 className="text-xl font-medium sm:mb-0">Status: {selectedorder2.finalStatus}</h3>
          <h3 className="text-xl font-medium">{dateSplit(selectedorder2.createdAt)}</h3>
        </div>
        <div className="w-full flex-col justify-center p-6">
  <div className="max-w-4xl mx-auto">
    <div>
      <h3 className="text-xl font-medium">Productos:</h3>
      {selectedorder2.products.map((item, index) => (
        <div className="order-detail-item" key={index}>
          <h3>{item.name}</h3>
          <div className="flex flex-wrap justify-between">
            <span className="order-detail-info">Qty: {item.count}</span>
            <span className="order-detail-info">Option: {item.option}</span>
            <span className="order-detail-info">Price: ${item.price.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="flex flex-wrap justify-between mt-8">
      <div>
        <h3 className="text-xl font-medium">Total: ${selectedorder2.total.toFixed(2)}</h3>
      </div>
      <div>
        <h3 className="text-xl font-medium">Token: {selectedorder2.tokenUsed}</h3>
      </div>
    </div>
    <div>
      <a href={`https://bscscan.com/tx/${selectedorder2.txHash}`} className="text-xl font-medium text-blue-500 hover:underline">
        TxHash: {selectedorder2.txHash}
      </a>
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-medium">Direction: {selectedorder2.delivery}</h3>
    </div>
  </div>
</div>

      </div>
    )}
  </div>
</div>







  );
};

export default OrderDetails;

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./AdminOrdersDetail.css";
import { confirmOrCancelOrder } from "../../../redux/store/actions/adminOrdersAction";

const AdminOrdersDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const adminOrders = useSelector((state) => state.adminOrders);

  const [selectedorder, setSelectedOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [lodedOrders, setLoadedOrders] = useState(false);

  useEffect(() => {
    setLoadedOrders(adminOrders.orderLoaded);
  }, [adminOrders.orderLoaded]);

  useEffect(() => {
    if (loading) {
      if (lodedOrders) {
        const order = adminOrders?.orders?.find((p) => p._id === id);
        setSelectedOrder(order);
        setLoadedOrders(false);
        setLoading(false);
      }
    }
  }, [lodedOrders, adminOrders.orders]);

  const fiveDigit = (num) => {
    return num.toString().padStart(5, "0");
  };

  const dateSplit = (date) => {
    const dateArr = date.split("T");
    const dateArr2 = dateArr[0].split("-");
    return `${dateArr2[1]}/${dateArr2[2]}/${dateArr2[0]}`;
  };

  const confirmOrCancelOrders = (orderId, finalStatus) => {
    dispatch(confirmOrCancelOrder(orderId, finalStatus));
    setLoadedOrders(false);
    setLoading(true);
  };

  const orders2 =
    {
      _id:1,
      orderNumber: 1,
      finalStatus: 'success',
      total:100,
      orderNumber: 100,
      createdAt:'23-4-2021',
      ownerName: 'Josefo',
      orderEmail: 'josefo@noseque.com',
      ownerPhone: 3156105428,
      products:[
        {
          name:"",
          count:12,
          option:"ground",
          price:12,
          productId:'6300f34b70a136001290979c',
        },
        {
          name:"",
          count:12,
          option:"ground",
          price:12,
          productId:'6300f34b70a136001290979c',
        },
        {
          name:"",
          count:12,
          option:"ground",
          price:12,
          productId:'6300f34b70a136001290979c',
        },
        {
          name:"",
          count:12,
          option:"ground",
          price:12,
          productId:'6300f34b70a136001290979c',
        },
      ],
      total: 1000,
      tokenUsed:"BUSD",
      txHash:"skadhiaosdo23jo12j3op1",
      delivery: "si",
      finalStatus:"cancelled"

    }
  return (
    <div className="orders-detail">
 
      <div>
        {!loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="order-detail-format">
          
            <div className="order-detail-top">
              <div className="order-detail-top-padding">
              <div>
                <h3># {fiveDigit(selectedorder.orderNumber)}</h3>
              </div>

              <div>
                <h3>status: {selectedorder.finalStatus}</h3>
              </div>

              <div>
                <h3>{dateSplit(selectedorder.createdAt)}</h3>
              </div>
              </div>
            </div>
            <div className="order-body-detail-padding">
            <div className="d-flex justify-content-between">
              <div>{selectedorder.ownerName}</div>
              <div>{selectedorder.orderEmail}</div>
            </div>
            <div>
             telefono: {selectedorder?.ownerPhone}
            </div>
            <div>
              <div>
                <h3>Products:</h3>
                {selectedorder.products.map((item, index) => (
                  <div className="orders-detail-footer" key={index}>
                    <h3>{item.name}</h3>
                    <h3>Qty:{item.count}</h3>
                    <h3>option: {item.option}</h3>
                    <h3>Price:{item.price.toFixed(2)}</h3>
                    <Link to={`/store/product/${item.productId}`}>
                    <button>ver</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
         
            <div className="order-detail-body">
              <div>
                <h3>TOTAL: {selectedorder.total.toFixed(2)}</h3>
              </div>
              <div>
                <h3>token: {selectedorder.tokenUsed}</h3>
              </div>
            </div>

            <div>
            <a href={`https://bscscan.com/tx/${selectedorder.txHash}`}>
              <h3>TxHash:{selectedorder.txHash}</h3></a>
            </div>

            <div className="order-detail-body">
              direction: {selectedorder.delivery}
            </div>

            <div className="order-detail-body">
              <div className="orders-detail-select">
                {selectedorder.finalStatus === "pending" ? (
                  <>
                    <button
                      className="confirm-order"
                      onClick={() =>
                        confirmOrCancelOrders(selectedorder._id, "confirmed")
                      }
                    >
                      Confirm Order
                    </button>
                    <button
                      className="cancel-order"
                      onClick={() =>
                        confirmOrCancelOrders(selectedorder._id, "cancelled")
                      }
                    >
                      Cancel Orders
                    </button>
                  </>
                ) : selectedorder.finalStatus === "confirmed" ? (
                  <div className="confirmed-order-details">
                    Order Confirmed
                  </div>
                ) : (
                  <div className="cancelled-order-details">Cancelled Order</div>
                )}
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersDetail;

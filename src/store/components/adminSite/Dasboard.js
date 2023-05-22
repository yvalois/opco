import "./dashboard.css";
import {MdDeleteForever} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateStores } from "../../../redux/store/actions/storeActions";
import Loader from "../../../components/Loader";
import { modifyUserRole } from "../../../redux/store/actions/adminOrdersAction";
import Swal from "sweetalert2";

const Dashboard = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.store);
  const adminOrders = useSelector(state => state.adminOrders);
  const {orders, orderLoaded, users} = adminOrders;

  const { storeName, discount, StoreLoaded, loading } = store;

  const [storeNameInput, setStoreNameInput] = useState();
  const [discountInput, setDiscountInput] = useState();

  const [newRole, setNewRole] = useState();

  const handleUpdateStoreName = () => {
    if (storeNameInput.length > 0) {
      try{
    dispatch(updateStores({name:storeNameInput}));
    setStoreNameInput();
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Store name has been updated',
    })
    }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
    } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter store name",
    });
    }
  }

  const handleUpdateDiscount = () => {
    if (discountInput.length > 0) {
      try{
        dispatch(updateStores({discount:discountInput}));
        setDiscountInput();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Store discount has been updated',
        })
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter store discount",
      });
    }

  }

  const handleUpdateRole = (id) => {
    if (newRole.length > 0) {
      try{
      dispatch(modifyUserRole(id, newRole));
      setNewRole();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User role has been updated',
      })
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter user role",
      });
    }
  }


 



  return (

    <div className="dashboard-container">
      <Loader isLoading={loading} />
      <div className="title-adminsite">
        <h2>Options</h2>
      </div>
      <div className="dasboard-option-container">
        <div className="dashboard-option">
          <div className="dashboard-table">
            <div>
            <h3>Name: {storeName}</h3>
            </div>
            <label>
              <p>Change Name</p>
              <input
                type="text" 
                value={storeNameInput}
                onChange={(e) => setStoreNameInput(e.target.value)} 
              />
              <button
                onClick={handleUpdateStoreName}
              >Save</button>
            </label>
          </div>
          <div className="dashboard-table">
            <div>
            <h3>Discounts: {discount} %</h3>
            </div>
            <label>
              <p>New Discount </p>
              <input
                type="number" 
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
              />
              <button
                onClick={handleUpdateDiscount}
              >Save</button>
            </label>
          </div>

          <div className="dashboard-table">
            <div>
            <h3>Users</h3>
            </div>
       
              {orderLoaded && users.map((user, index) => (
                <div className="dasboard-user-mail" key={index}>
                  <p>email: {user.email}</p>
                  <p>rol: {user.role}</p>
                  <select
             
                    onChange={(e) => setNewRole(e.target.value)}
                  >
                     <option value="">Select</option>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                  <button
                    onClick={() => handleUpdateRole(user._id)}
                  >save role</button>
                </div>
              ))}
       
          </div>
        </div>
      </div>
    </div>
 
  );
};

export default Dashboard;

import "./AdminSite.css";
import {useState, useEffect} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {IoMdOptions} from "react-icons/io";
import {GoListUnordered} from "react-icons/go";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {BiCategoryAlt} from "react-icons/bi";
import {useSelector, useDispatch} from "react-redux";
import { fetchAdminOrders } from "../../redux/store/actions/adminOrdersAction";
import {MdCategory} from "react-icons/md";

const AdminSite = () => {
  const dispatch = useDispatch();
  const adminOrders = useSelector(state => state.adminOrders);
  const {orders, orderLoaded, users} = adminOrders;
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [Width, setWidth] = useState(false);

  useEffect(() => {
    if(!orderLoaded) {
    dispatch(fetchAdminOrders());
    }
  }, [dispatch, orderLoaded]);

  useEffect(() => {
    if(Width === false) {
      setWidth(window.innerWidth);
    }
  }, [Width]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth
      setWidth(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions) 
    }, []);

    useEffect(() => {
      if (Width < 960) {
        setSideBarOpen(false);
      }else{
        setSideBarOpen(true);
      }
    }, [Width]);


  return (
    <div className="adminsite">
      <div className={`${sideBarOpen? "sideBar":"not-display"}`}>
        <ul>
        <NavLink to="/store/admin/dashboard">
          <li><IoMdOptions className="admin-icon"/>Option</li>
        </NavLink>
        <NavLink to="/store/admin/orders">
          <li><GoListUnordered className="admin-icon"/> Orders</li>
        </NavLink>
        <NavLink to="/store/admin/products">
          <li><AiOutlineShoppingCart className="admin-icon"/> Products</li>
        </NavLink>
        <NavLink to="/store/admin/category">
          <li><BiCategoryAlt className="admin-icon"/> Categories</li>
        </NavLink>
        <NavLink to="/store/admin/subcategories">
          <li><MdCategory className="admin-icon"/> SubCategory</li>
        </NavLink>
        </ul>
      </div>
      <div className="admin-screen">
   
        <Outlet/>

      </div>
    </div>
  );
};

export default AdminSite;

import "./AdminSite.css";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdOptions } from "react-icons/io";
import { GoListUnordered } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminOrders } from "../../redux/store/actions/adminOrdersAction";
import { MdCategory } from "react-icons/md";

const NavLinkComponent = ({ to, icon: Icon, label, ...props }) => (
  <NavLink
    to={to}
    {...props}
    className="w-full flex justify-center items-end p-3 md:mb-2 rounded  text-white hover:bg-gray-700 no-underline  hover:no-underline"
    activeClassName="w-full flex justify-center bg-gray-900 text-yellow-500 bg-yellow-300"
  >
    <Icon className=" w-6 h-6 mr-3 text-white" />
    <span className="hover:text-yellow-500">{label}</span>
  </NavLink>
);

const AdminSite = () => {
  const dispatch = useDispatch();
  const adminOrders = useSelector(state => state.adminOrders);
  const { orders, orderLoaded, users } = adminOrders;
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [Width, setWidth] = useState(false);

  useEffect(() => {
    if (!orderLoaded) {
      dispatch(fetchAdminOrders());
    }
  }, [dispatch, orderLoaded]);

  useEffect(() => {
    if (Width === false) {
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
    } else {
      setSideBarOpen(true);
    }
  }, [Width]);


  const routes = [
    <NavLinkComponent
      to="/store/admin/dashboard"
      icon={IoMdOptions}
      label="Option"
    />,
    <NavLinkComponent
      to="/store/admin/products"
      icon={AiOutlineShoppingCart}
      label="Products"
    />,
    <NavLinkComponent
      to="/store/admin/orders"
      icon={GoListUnordered}
      label="Orders"
    />, <NavLinkComponent
      to="/store/admin/subcategories"
      icon={MdCategory}
      label="SubCategory"
    />,
    <NavLinkComponent
      to="/store/admin/category"
      icon={BiCategoryAlt}
      label="Categories"
    />,
    <NavLinkComponent
      to="/store/admin/subcategories"
      icon={MdCategory}
      label="SubCategory"
    />,
  ];

  return (
    <div className="adminsite ">
      <div className={`${sideBarOpen ? "sideBar" : "not-display"} `}>
        {routes.map((route, index) => (
          <div key={index} className="w-full flex ">
            {route}
          </div>
        ))}
      </div>
      <div className="admin-screen">

        <Outlet />

      </div>
    </div>
  );
};

export default AdminSite;

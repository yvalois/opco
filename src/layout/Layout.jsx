import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import InitialLoad from "../components/InitialLoad";
import MovilNavbar from "../components/MovilNavbar";
import { Maintenance } from "../components/mantenimiento/Maintenance";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);



  return (
<div className="h-screen flex flex-col">
  <div className="bg-green-500 fixed w-full top-0 left-0 z-50">
    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
  </div>
  <div className="flex flex-grow mt-16 z-10">
    <div className={`w-full md:w-64 h-full fixed top-16 left-0 transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
    <div className="z-[-10] w-full lg:w-[calc(100%-236px)] lg:ml-[236px] "
    // eslint-disable-next-line react/style-prop-object
    style={{backgroundImage:"linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(https://culturacafeina.com/wp-content/uploads/2020/06/D%C3%B3nde-comprar-buen-caf%C3%A9.jpg)",
    backgroundRepeat:"no-repeat",
   backgroundPosition:"center",
   backgroundSize:"cover"}}>

          <Outlet />   
        </div>
  </div>
</div>

  );
}
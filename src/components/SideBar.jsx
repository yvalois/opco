import React,{useEffect} from 'react';
import { CgArrowsExchangeAlt } from 'react-icons/cg';
import { RiHandCoinLine } from 'react-icons/ri';
import { BsWallet } from 'react-icons/bs';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaBitcoin,FaRegAddressBook } from 'react-icons/fa';
import { Link, NavLink, BrowserRouter, Route } from 'react-router-dom';
import { GiCoffeeBeans } from 'react-icons/gi';
import { FaWindowRestore } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';
import { BsBank } from 'react-icons/bs';
import { RiBitCoinLine } from 'react-icons/ri';
import { BsWhatsapp } from 'react-icons/bs';
import {GoBriefcase} from 'react-icons/go'
import { GrDocumentText} from 'react-icons/gr';
import logo from '../images/logo/logo.png';
import whatsapp from "../images/logo/whatsapp-logo.png"
import { FaTwitter, FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import {PiVaultBold} from 'react-icons/pi'
// import '../style/style_sideBar.css';
import { useSelector } from 'react-redux';

const NavLinkComponent = ({ to, icon: Icon, label, ...props }) => (
  <NavLink
    to={to}
    {...props}
    className="w-full flex justify-center items-end p-3 pb-3 md:mb-2 rounded  text-white hover:bg-gray-700 no-underline  hover:no-underline"
    activeClassName="w-full flex justify-center bg-gray-900 text-yellow-500 bg-yellow-300"
  >
    <Icon className=" w-6 h-6 mr-3 text-white" />
    <span className="hover:text-yellow-500">{label}</span>
  </NavLink>
);



export default function SideBar({ setIsOpen }) {
  const { isOwner } = useSelector(state => state.blockchain);

  
  const routes = [
    <NavLinkComponent
      to="/"
      icon={CgArrowsExchangeAlt}
      label="Exchange"
    />,
    <NavLinkComponent
      to="/staking"
      icon={RiHandCoinLine}
      label="Recompensas"
    />,
    <NavLinkComponent
      as="a"
      href="https://opencoffee.io/tienda/"
      icon={AiOutlineShopping}
      label="Tienda Fiat"
    />,
    <NavLinkComponent
      to="/store"
      icon={RiBitCoinLine}
      label="Tienda Crypto"
    />,
    <NavLinkComponent
      to="/nft"
      icon={GiCoffeeBeans}
      label="Inventario Nft"
    />,
    <NavLinkComponent
      to="/market"
      icon={FaWindowRestore}
      label="Market Nft"
    />,
    <NavLinkComponent
      to="/links"
      icon={BsBook}
      label="Cursos"
    />,
    <NavLinkComponent
      to="/token-market"
      icon={BsBank}
      label="Opco Market"
    />,
    <NavLinkComponent
      to="/retire"
      icon={BsWallet}
      label="Retiros"
    />,
        (<NavLinkComponent
          as="a"
          href="https://wa.me/+573212414237?text=Me%20interesa%20preguntar%20sobre%20Oppen%20Coffee"
          icon={BsWhatsapp}
          label="Whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        />),
    

     <NavLinkComponent
       to="/venta/nn"
       icon={GoBriefcase}
       label="Inversiones"
     />,

     <NavLinkComponent
       to="/inventarioInversiones/nn"
       icon={PiVaultBold}
       label="Staking"
     />,
         isOwner && (
          <NavLinkComponent
            to="/administrador"
            icon={FaRegAddressBook}
            label="Administrador"
          />
        ),
        null
  ];


  return (

    <div className="h-full w-full  md:w-64 bg-gray-900 md:p-4 flex flex-col  md:items-start md:space-y-2 overflow-auto">

      {routes.map((route, index) => (
        <div key={index} className="w-full h-full flex overflow-y-auto ">
          {route}
        </div>
      ))}


      <div className="w-full flex justify-center items-center space-x-2">
        <a
          className="iconfont-wrapper block lg:hidden"
          href="https://www.facebook.com/OpenCoffeToken/"
          target="_blank" rel="noreferrer"
        >
          <FaFacebookF className="text-2xl text-yellow-300" />
        </a>
        <a
          className="iconfont-wrapper block lg:hidden"
          href="https://twitter.com/opencoffeetoken"
          target="_blank" rel="noreferrer"
        >
          <FaTwitter className="text-2xl text-yellow-300" />
        </a>
        <a
          className="iconfont-wrapper block lg:hidden"
          href="https://www.instagram.com/opencoffeetoken/"
          target="_blank" rel="noreferrer"
        >
          <FiInstagram className="text-2xl text-yellow-300" />
        </a>
        <a
          className="iconfont-wrapper block lg:hidden"
          href="https://youtube.com/channel/UC2plERh9CPd-AttJ_8D0cWw"
          target="_blank" rel="noreferrer"
        >
          <FaYoutube className="text-2xl text-yellow-300" />
        </a>
      </div>
    </div>

  )
}

import React, { useEffect } from 'react';
import { CgArrowsExchangeAlt } from 'react-icons/cg';
import { RiHandCoinLine } from 'react-icons/ri';
import { BsWallet } from 'react-icons/bs';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaBitcoin, FaRegAddressBook } from 'react-icons/fa';
import { Link, NavLink, BrowserRouter, Route } from 'react-router-dom';
import { GiCoffeeBeans } from 'react-icons/gi';
import { FaWindowRestore } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';
import { BsBank } from 'react-icons/bs';
import { RiBitCoinLine } from 'react-icons/ri';
import { BsWhatsapp } from 'react-icons/bs';
import { GoBriefcase } from 'react-icons/go'
import { GrDocumentText } from 'react-icons/gr';
import logo from '../images/logo/logo.png';
import whatsapp from "../images/logo/whatsapp-logo.png"
import { FaTwitter, FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { PiVaultBold } from 'react-icons/pi'
// import '../style/style_sideBar.css';
import { useSelector } from 'react-redux';

const NavLinkComponent = ({ to, icon: Icon, label, ...props }) => (
  <NavLink
    to={to}
    {...props}
    className="w-full flex justify-center xxs:my-[10px]  lg:my-[0.1px] 3xl:my-1  lg:p-3 md:pb-3 md:mb-2 rounded  text-white hover:bg-gray-700 no-underline  hover:no-underline"
    activeClassName="w-full flex justify-center bg-gray-900 text-yellow-500 bg-yellow-300"
  >
    <Icon className="w-5 h-5 first-letter: 2xl:w-6 2xl:h-6 mr-3 text-white" />
    <span className="hover:text-yellow-500">{label}</span>
  </NavLink>
);



export default function SideBar({ setIsOpen }) {
  const { isOwner } = useSelector(state => state.blockchain);

  const { inversionesBalance, accountAddress, inversionesStakingBalance } = useSelector((state) => state.blockchain)

  const routes = [
    <NavLinkComponent
      to="/"
      icon={CgArrowsExchangeAlt}
      label="Exchange"
      onClick={()=>{setIsOpen(false)}}
    />,
    <NavLinkComponent
      to="/staking"
      icon={RiHandCoinLine}
      label="Recompensas"
      onClick={()=>{setIsOpen(false)}}
    />,
    <NavLinkComponent
      as="a"
      href="https://opencoffee.io/tienda/"
      icon={AiOutlineShopping}
      label="Tienda Fiat"
      onClick={()=>{setIsOpen(false)}}
    />,
    <NavLinkComponent
      to="/store"
      icon={RiBitCoinLine}
      label="Tienda Crypto"
      onClick={()=>{setIsOpen(false)}}
    />,
    <NavLinkComponent
      to="/nft"
      icon={GiCoffeeBeans}
      label="Inventario Nft"
      onClick={()=>{setIsOpen(false)}}
    />,
    <NavLinkComponent
      to="/market"
      icon={FaWindowRestore}
      label="Market Nft"
      onClick={()=>{setIsOpen(false)}}
    />,
    <NavLinkComponent
      to="/links"
      icon={BsBook}
      label="Cursos"
      onClick={()=>{setIsOpen(false)}}
    />,
    <NavLinkComponent
      to="/token-market"
      icon={BsBank}
      label="Opco Market"
      onClick={()=>{setIsOpen(false)}}
    />,
    <NavLinkComponent
      to="/retire"
      icon={BsWallet}
      label="Retiros"
      onClick={()=>{setIsOpen(false)}}
    />,

  (<NavLinkComponent
    as="a"
    href="https://wa.me/+573212414237?text=Me%20interesa%20preguntar%20sobre%20Oppen%20Coffee"
    icon={BsWhatsapp}
    label="Whatsapp"
    target="_blank"
    rel="noopener noreferrer"
    onClick={()=>{setIsOpen(false)}}
  />),
    <NavLinkComponent
      to="/venta/nn"
      icon={GoBriefcase}
      label="Inversiones"
      onClick={()=>{setIsOpen(false)}}
    />,
    (inversionesBalance.length > 0 || inversionesStakingBalance.length > 0 || isOwner) && 
    (<NavLinkComponent
      to="/inventarioInversiones/nn"
      icon={PiVaultBold}
      label="Staking"
      onClick={()=>{setIsOpen(false)}}
    />)
    ,
    isOwner && (
      <NavLinkComponent
        to="/administrador"
        icon={FaRegAddressBook}
        label="Administrador"
        onClick={()=>{setIsOpen(false)}}
      />
    )
    
  ];

  


  return (

    <div className="h-full w-full  md:w-64 bg-gray-900 md:p-4 flex flex-col  md:items-start  overflow-hidden">
    <div className='w-full h-full'>
    {routes.map((route, index) => (
        <div key={index} className="w-full h-auto flex overflow-y-hidden">
          {
          route
          }
        </div>
      ))}
    </div>


      <div className="w-full flex justify-center items-center space-x-2 mb-[90px]">
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

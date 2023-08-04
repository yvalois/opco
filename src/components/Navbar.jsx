import { useDispatch, useSelector } from "react-redux";
import "../style/style_navbar.css";
import { disconnectBlockchainAction, fetchBlockchain } from "../redux/blockchain/blockchainAction";
import cafe from "../images/logo/logo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiStoreAlt } from "react-icons/bi";
import { GrDocumentStore } from "react-icons/gr";
import { RiExchangeBoxLine } from "react-icons/ri";
import { FaTwitter, FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { logOutAction } from "../redux/blockchain/dataActions";
import whatsapp from "../images/logo/whatsapp-logo.png";
import { disconnectMinterAction, fetchMinter } from "../redux/blockchain/minterAction";
import Dropdown from 'react-bootstrap/Dropdown';
import { getMarket } from "../redux/market/marketAction";
import { getBanned } from "../redux/bannedAccounts/bannedActions";
import NavbarAcordion from "./navbar/NavbarAcordion";
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useConnect, useDisconnect, useSignMessage, useNetwork, useSwitchNetwork } from 'wagmi'
import { getEthersProvider, getEthersSigner } from '../utils/ethers.js'
import { getPublicClient, getWalletClient } from '@wagmi/core'

export default function Navbar({ isOpen2, setIsOpen2 }) {

  const blockchain = useSelector(state => state.blockchain);
  const { accountAddress } = useSelector(state => state.blockchain);

  const { market, marketloaded } = useSelector(state => state.market);


  const dispatch = useDispatch();
  const [account, setAccountAddress] = useState("");
  const [is, setIs] = useState(false)
  useEffect(() => {
    if (blockchain.accountAddress) {
      const accountAddress = blockchain.accountAddress.slice(0, 4) + "..." + blockchain.accountAddress.slice(blockchain.accountAddress.length - 4);
      setAccountAddress(accountAddress);
      dispatch(getBanned());
      dispatch(fetchMinter());

    }
  }, [blockchain.accountAddress]);

  useEffect(() => {
    if (!marketloaded) {
      dispatch(getMarket());
    }
  }, [marketloaded]);

  const disconnectBlockchain = () => {
    dispatch(disconnectBlockchainAction())
    dispatch(logOutAction());
    dispatch(disconnectMinterAction());
    disconnect()
  }


  const { isOpen, open, close, setDefaultChain } = useWeb3Modal()
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  const getSign = async () => {
    const signer = await getEthersSigner(chain?.id)
    const provider = getEthersProvider(chain?.id)
    dispatch(fetchBlockchain(address, signer, provider))
    window.localStorage.removeItem("wc@2:core:0.3//keychain")
  }



  const switchChain = async () => {
    const walletClient = await getWalletClient(chain?.id)
    await walletClient?.switchChain({ id: 56 })

  }
  useEffect(() => {
    if (isConnected && accountAddress === null && is === false && chain?.unsupported !== undefined && chain.unsupported === false) {
      setTimeout(() => {
      getSign();
      }, 2000);
      setIs(true)
    } else if (isConnected && accountAddress === null && chain?.unsupported !== undefined && chain.unsupported === true) {
      setTimeout(() => {
        switchChain()
        }, 2000);
      setIs(false)
    } else if (!isConnected) {
      setIs(false)
    }
  }, [isConnected, accountAddress, account, chain, is])

  const abrir = () => {
    if (!isConnected) {
      open()
    }
  }





  return (

    <section className="bg-gray-200 p-0 m-0 fixed top-0 w-screen z-10">
      <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg bg-black" >
        <div className="container-fluid" >
          <div className="w-auto flex flex-row items-center ml-5 space-x-2 no-underline">
            <span>
              <a href="https://opencoffee.io">
                <img src={cafe} alt="" className="w-12" />
              </a>
            </span>
            <span className="hidden sm:block">
              <div
                className="navbar-caption text-white font-semibold text-lg"
                href="https://opencoffee.io"
              >
                OPEN COFFEE
              </div>
            </span>
          </div>

          <div className="flex w-auto space-x-2">
            <div className="flex items-center justify-center space-x-2 ">
              <a
                className="iconfont-wrapper hidden xl:block"
                href="https://www.facebook.com/OpenCoffeToken/"
                target="_blank" rel="noreferrer"
              >
                <FaFacebookF className="text-xl text-yellow-300" />
              </a>
              <a
                className="iconfont-wrapper hidden xl:block"
                href="https://twitter.com/opencoffeetoken"
                target="_blank" rel="noreferrer"
              >
                <FaTwitter className="text-xl text-yellow-300" />
              </a>
              <a
                className="iconfont-wrapper hidden xl:block"
                href="https://www.instagram.com/opencoffeetoken/"
                target="_blank" rel="noreferrer"
              >
                <FiInstagram className="text-xl text-yellow-300" />
              </a>
              <a
                className="iconfont-wrapper hidden xl:block"
                href="https://youtube.com/channel/UC2plERh9CPd-AttJ_8D0cWw"
                target="_blank" rel="noreferrer"
              >
                <FaYoutube className="text-xl text-yellow-300" />
              </a>
            </div>






            <div className="flex space-x-4">
              <div className="flex items-center ml-2">
                {accountAddress === null ? (
                  <button
                    className="text-black text-sm flex items-center justify-center rounded-lg py-1 px-3 cursor-pointer  border-black bg-yellow-300 min-w-60  shadow-text"
                    onClick={() => {
                      abrir()
                    }}>
                    {(isConnected && accountAddress === null) ? 'conectando...' : 'Conectar'}
                  </button>
                ) : (
                  <>
                    <div className="connection flex items-center space-x-2">+
                      <div>
                        <p
                          className="text-white text-sm pb-0 mb-0"
                        >
                          {account}
                        </p>
                        <p
                          className="text-white text-sm pb-0 mb-0"
                        >
                          OPCO:{blockchain?.tokenBalance?.toFixed(2)}
                        </p>
                      </div>
                      <div className="logOut bg-red-500 text-white text-sm font-semibold flex items-center justify-center cursor-pointer h-7 py-0 px-2 rounded-md"
                        onClick={disconnectBlockchain}
                      >
                        logout
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                className="navbar-toggler ms-auto lg:hidden"
                type="button"
                onClick={() => {
                  setIsOpen2(!isOpen2);
                }}
              >
                <AiOutlineMenu className="text-white" />
              </button>
            </div>
          </div>

        </div>
      </nav>
    </section>


  );
}
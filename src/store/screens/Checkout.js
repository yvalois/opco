import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Api } from "../utils/Api";
import { ethers } from "ethers";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Swal from "sweetalert2";

import Loader from "../../components/Loader";

import { addOrder, createOrder } from "../../redux/store/actions/orderActions";

import "./Checkout.css";
import { clearCart } from "../../redux/store/actions/cartActions";
import ErrorMsg from "../../components/ErrorMsg";
import ExchangeLoading from "../../components/ExchangeLoading";
import LoaderFullScreen from "../../components/loaderFullScreen";
import OrderConfirmation from "../components/Orders/OrderConfirmation";

const Checkout = () => {
  const userInfo = useSelector((State) => State.user.userDetails);
  const { tokenPrice } = useSelector((State) => State.tokenPrice);
  const blockchain = useSelector((State) => State.blockchain);
  const { discount } = useSelector((State) => State.store);
  const { accountAddress, tokenContract, busdContract, opcoStoreContract, usdtContract } =
    blockchain;
  const { infoLoaded } = useSelector((State) => State.user);

  const { fullName, address, country, city, zipCode, state, phone, email, verificationCode } = userInfo;

  const [checkApprovedToken, setCheckApprovedToken] = useState(false);
  const [checkApprovedBusd, setCheckApprovedBusd] = useState(0);
  const [approvedUnits, setApprovedUnits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState({});

  const [Phone, setPhone] = useState("");

  const checkApprove = async () => {
    try {
      const approvedToken = await tokenContract.allowance(accountAddress, opcoStoreContract.address);
      const approvedBusd = await busdContract.allowance(accountAddress, opcoStoreContract.address);
      const approveToNumber = parseFloat(approvedToken) / 10 ** 8;
      const approveToNumberBusd = ethers.utils.formatEther(approvedBusd);
      setApprovedUnits(approveToNumber);
      setCheckApprovedBusd(approveToNumberBusd);
    } catch (err) {
      console.log(err);
    }
  }

  const approveToken = async () => {
    try{
      setLoading(true);
      const approve = await tokenContract.approve(opcoStoreContract.address, ethers.utils.parseEther("999999999999"));
      await approve.wait();
      console.log(approve.message)
      // Suscribirse al evento 'Approval'
        setLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Approved successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
    }catch(err){
        setLoading(false);
        Swal.fire({
          title: 'failed',
          text: err.reason,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.log(error.message)
    }

  };
  

  const approveBusd = async () => {
    try {
      setLoading(true);
      const approve = await busdContract.approve(opcoStoreContract.address, ethers.utils.parseEther("999999999999"));
      await approve.wait();
      setLoading(false);

        setCheckApprovedToken(false); 
        Swal.fire({
          title: 'Success',
          text: 'Approved successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        })


    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: 'failed',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (accountAddress) {
      if (!checkApprovedToken) {
        checkApprove();
        setCheckApprovedToken(true);
      }
    }
  }, [checkApprovedToken, accountAddress]);

  const [Address, setAddress] = useState({
    fullName: fullName,
    address: address,
    country: country,
    city: city,
    zipCode: zipCode,
    state: state,
    phone: phone
  });

  const [token, setToken] = useState(Api.TOKEN_NAME);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((State) => State.cart);
  const { products, cartTotal } = cart;
  const cartItems = products;



  const [checkoutFull, setCheckoutFull] = useState(false);


  const handleOrden = async () => {
    if (verificationCode === false) {
      Swal.fire({
        title: 'Please Verify Your email',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          navigate(`/code`)
        }
      })

    }
    if (
      accountAddress === null ||
      accountAddress === undefined ||
      accountAddress === ""
    ) {
      Swal.fire({
        title: "Error",
        text: "You need to login to make an order",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    } else {
      if (checkoutFull) {
        try {
          setLoading(true);
          const total = token === "BUSD" ? getCartSubTotal() : getCartTotalToken();
          let amountToPay = 0
          if (token === "BUSD") {
            amountToPay = ethers.utils.parseEther(total);
            if (checkApprovedBusd < getCartSubTotal()) {
              approveBusd();
              return;
            }
          }
          if (token === Api.TOKEN_NAME) {
            amountToPay = (total * 10 ** 8).toFixed(0);
            if (approvedUnits < getCartTotalToken()) {
              approveToken();
              return;
            }
          }
          const tokenAddress = token === "BUSD" ? busdContract.address : tokenContract.address;
          try{
            const buy = await opcoStoreContract.buyProduct(
              tokenAddress,
              amountToPay.toString()
            )
            await buy.wait()
            const Order = {
              Address,
              cartItems,
              total: token === "BUSD" ? getCartSubTotal() : getCartTotalToken(),
              tokenUsed: token,
              wallet: accountAddress,
              orderType: 'entrega',
              payed: true,
              txHash: buy.hash
            };
            dispatch(createOrder(Order));
            setCreatedOrder(Order);

            dispatch(clearCart());
            setLoading(false);
            setSuccess(true);


          }catch(err){
            setLoading(false);
            Swal.fire({
              title: 'failed',
              text: err.reason,
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.log(error.message)
          }


        } catch (err) {
          if (err.reason) {
            setError(true);
            setErrorMessage(err.reason);
          }
          console.log(err);
          setLoading(false);
        }

      } else {
        Swal.fire({
          title: "Error",
          text: "You need to fill all the fields",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  useEffect(() => {
    if (infoLoaded) {
      setAddress({
        fullName: fullName,
        address: address,
        country: country,
        city: city,
        zipCode: zipCode,
        state: state,
        phone: phone,
      })
      setPhone(phone);
    }
  }, [infoLoaded]);

  useEffect(() => {
    setAddress({
      ...Address,
      phone: Phone,
    })
  }, [Phone]);


  useEffect(() => {
    if (
      Address.fullName === "" ||
      Address.address === "" ||
      Address.country === "" ||
      Address.city === "" ||
      Address.zipCode === "" ||
      Address.state === "" ||
      Address.fullName === undefined ||
      Address.address === undefined ||
      Address.country === undefined ||
      Address.city === undefined ||
      Address.zipCode === undefined ||
      Address.state === undefined ||
      Address.phone === undefined
    ) {
      setCheckoutFull(false);
    } else {
      setCheckoutFull(true);
    }
  }, [fullName, address, country, city, zipCode, state, Address, Phone]);

  const resetAddress = () => {
    setAddress({
      fullName: "",
      address: "",
      country: "",
      city: "",
      zipCode: "",
      state: "",
      phone: "",
    });
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const getCartSubTotalToken = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty / tokenPrice, 0)
      .toFixed(2)
  }


  const getCartTotalToken = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty / tokenPrice*(1-item.discount/100), 0)
  }



  return (
<>
   <LoaderFullScreen isLoading={loading} /> 
   {/* <ErrorMsg error={error} errorMsg={errorMessage} setError={setError} />   */}
  <div className="w-full">
    <div className="w-full h-full">
      {success ? (
        <div className="max-w-xl px-8 py-0 mx-auto my-2.5">
          <OrderConfirmation order={createdOrder} email={email} />
        </div>
      ) : (
        <div className="max-w-xl px-8 py-0 mx-auto my-2.5">
          <div className="flex flex-col items-center justify-between mb-4">
            <h1 className="text-3xl text-white font-bold">Checkout</h1>
            <button className=" bg-black text-white uppercase text-xs font-semibold py-4 px-6  focus:outline-none rounded-lg" onClick={resetAddress}>
              Clear Checkout
            </button>
          </div>
          <p className="text-white">Please fill in the shipping details.</p>
          <hr />
          <div className="grid gap-4">
            <div className="grid gap-4">
              <label className="w-full flex flex-col border-2 border-black bg-gray-500 p-2 rounded-3xl">
                <span className="text-white text-md uppercase">Name</span>
                <input
                  className="font-semibold text-md w-full focus:outline-none rounded-lg pl-2 "
                  type="text"
                  value={Address.fullName}
                  onChange={(e) => setAddress({ ...Address, fullName: e.target.value })}
                />
              </label>
            </div>
            <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
              <span className="text-white text-md uppercase">Direction</span>
              <input
                className="font-semibold text-md w-full focus:outline-none rounded-lg pl-2"
                type="text"
                value={Address.address}
                onChange={(e) => setAddress({ ...Address, address: e.target.value })}
              />
            </label>
            <div className="grid gap-4">
              <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                <span className="text-white text-md uppercase">Country</span>
                <input
                  className="font-semibold text-md w-full focus:outline-none rounded-lg pl-2"
                  type="text"
                  value={Address.country}
                  onChange={(e) => setAddress({ ...Address, country: e.target.value })}
                />
              </label>
              <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                <span className="text-white text-md uppercase">Phone</span>
                <PhoneInput
                  className="font-semibold text-md w-full focus:outline-none rounded-lg pl-2"
                  value={Phone}
                  onChange={setPhone}
                />
              </label>
              <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                <span className="text-white text-md uppercase">Zip code</span>
                <input
                  className="font-semibold text-md w-full focus:outline-none rounded-lg pl-2"
                  type="text"
                  value={Address.zipCode}
                  onChange={(e) => setAddress({ ...Address, zipCode: e.target.value })}
                />
              </label>
              <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                <span className="text-white text-md uppercase">City</span>
                <input
                  className="font-semibold text-md w-full focus:outline-none rounded-lg pl-2"
                  type="text"
                  value={Address.city}
                  onChange={(e) => setAddress({  ...Address, city: e.target.value })}
                />
              </label>
              <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                <span className="text-white text-md uppercase">Estate</span>
                <input
                  className="font-semibold text-md w-full focus:outline-none rounded-lg pl-2"
                  type="text"
                  value={Address.state}
                  onChange={(e) => setAddress({ ...Address, state: e.target.value })}
                />
              </label>
              <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                <span className="text-white text-md uppercase">Token</span>
                <select
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value);
                  }}
                  className="font-semibold text-md w-full focus:outline-none rounded-lg pl-2"
                >
                  <option value={Api.TOKEN_NAME}>{Api.TOKEN_NAME}</option>
                  <option value="BUSD">BUSD</option>
                </select>
              </label>
              <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                <span className="text-white text-md uppercase">SubTotal</span>
                <div className="font-semibold text-white text-white">
                  <div style={{ fontWeight: "600" }}>
                    {token === Api.TOKEN_NAME ? `OPCO: ${getCartSubTotalToken()}` : `BUSD: ${getCartSubTotal()}`}
                  </div>
                </div>
              </label>
            </div>
            <br />
            <h1 className="text-3xl font-bold text-white">Cart</h1>
            {cartItems.map((item, index) => (
              <div className="grid gap-4" key={index}>
                <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                  <span className="text-white text-md uppercase">Product</span>
                  <div className="font-semibold text-white">{item.name}</div>
                </label>
                <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                  <span className="text-white text-md uppercase">Option</span>
                  <div className="font-semibold text-white">{item.option}</div>
                </label>
                <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                  <span className="text-white text-md uppercase">Discount</span>
                  <div className="font-semibold text-white">{token === Api.TOKEN_NAME ? item.discount : 0}%</div>
                </label>
                <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                  <span className="text-white text-md uppercase">Price</span>
                  <div className="font-semibold text-white">
                    {token === Api.TOKEN_NAME
                      ? `${Api.TOKEN_NAME}: ${((item.price / tokenPrice) * (1 - item.discount / 100)).toFixed(0)}`
                      : `BUSD: ${item.price}`}
                  </div>
                </label>
                <label className="w-full flex flex-col border-2 border-black bg-gray-500   p-2 rounded-3xl">
                  <span className="text-white text-md uppercase">Amount</span>
                  <div className="font-semibold text-white">{item.qty}</div>
                </label>
              </div>
            ))}
          </div>
          <hr />
          <div className="flex justify-center">
            <button
              onClick={handleOrden}
              className="bg-black text-white uppercase text-xs font-semibold  py-4 px-6 rounded-xl   focus:outline-none "
            >
              {accountAddress?
              token === Api.TOKEN_NAME ? 
              getCartTotalToken() >= approvedUnits ?
              'Approve '
              :'Buy '
              :getCartSubTotal() >= approvedUnits ?
              'Approve '
              : 'Buy '
              : 'Connect '
                }

              {token === Api.TOKEN_NAME ? `${Api.TOKEN_NAME}: ${getCartTotalToken().toFixed(2)}`: `BUSD: ${getCartSubTotal()}`}
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</>




  );
};

export default Checkout;

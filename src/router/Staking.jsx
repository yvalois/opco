import { useState } from "react";
import "../style/style_staking.css";
import logo from '../images/logo/logo.png';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { useEffect } from "react";
import Timer from "../components/Timer";
import RewarderPerMinute from "../components/RewardedPerMinute";
import { fetchBalance } from "../redux/blockchain/blockchainAction";
import { useDispatch } from "react-redux";
import ErrorMsg from "../components/ErrorMsg";
import Loader from "../components/Loader";
import { fetchData } from "../redux/blockchain/dataActions";

export default function Staking() {
  const dispatch = useDispatch();
  const stakin = useSelector(state => state.blockchain.stakingContract);
  const blockchain = useSelector(state => state.blockchain);

  const data = useSelector(state => state.data);


  const [pools, setPools] = useState([]);
  const [stakedOn, setStakedOn] = useState(false);
  const [tokensPerPool, setTokensPerPool] = useState(0);
  const [myStaked, setMyStaked] = useState([]);
  const [filteredStaked, setFilteredStaked] = useState([]);
  const [stakeValue, setStakeValue] = useState(0);
  const [allowances, setAllowance] = useState(0);
  const [owner, setOwner] = useState(false);
  const [tokenPrice, setTokenPrice] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const changeLoadingCard = (is)=>{
      setCartLoading(is);
  }

  const stake = async (poolId, amount) => {
    setIsLoading(true);
    if (allowances > amount) {
      try {
        await stakin.setUserStake(poolId, amount * 10 ** 8);
        stakin.on("Stake", (poolId, amount) => {

          setStakeValue(0);
          dispatch(fetchBalance());
          dispatch(fetchData());
          setIsLoading(false);
        });
      } catch (err) {
        console.log(err);
        if (err.reason) {
          setErrorMsg(err.reason);
          setError(true);
        }
        setIsLoading(false);
      }
    } else {
      try {
        const tx = await blockchain.tokenContract.approve(blockchain.stakingContract.address, ethers.utils.parseEther('999999999999'));
        blockchain.tokenContract.on('Approval', (owner, spender, value) => {

          setAllowance(ethers.utils.formatEther(value));
          setIsLoading(false);
        })

      }
      catch (err) {
        if (error.reason) {
          setErrorMsg(error.reason);
          setError(true);

        }
        setIsLoading(false);
      }
    }
  }


  const getAPr = (poolId) => {
    const apr = pools.filter(pool => pool.poolId === poolId)[0].stakeApr;
    return apr;
  }

  const getTokensLimit = (poolId) => {
    const tokensLimit = pools.filter(pool => pool.poolId === poolId)[0].stakeTokensLimit;
    return tokensLimit;
  }

  const contractOwnerEqualToAddress = async () => {
    if (blockchain.accountAddress) {
      const owner = await stakin.owner();

      if (owner.toLowerCase() === blockchain.accountAddress.toLowerCase()) {
        setOwner(true);
      }
    }


  }



  const claimReward = async (poolId, index) => {
    setIsLoading(true);
    try {
      await stakin.userClaimReward(poolId, index, 0);
      stakin.on("Claim", (addr, ammount, apr, mtime) => {
        console.log(addr, ammount, apr, mtime);
        dispatch(fetchBalance());
        dispatch(fetchData());
        setIsLoading(false);
      }
      );
    } catch (err) {
      if (err.reason) {
        setErrorMsg(err.reason);
        setError(true);

        console.log("errortrigered", err.reason);
      }
      setIsLoading(false);
    }
  }


  const unstake = async (poolId, index) => {
    setIsLoading(true);
    try {
      await stakin.userUnstake(poolId, index);
      stakin.on("Unstake", (addr, ammount, apr, mtime) => {

        dispatch(fetchBalance());
        dispatch(fetchData());

        setIsLoading(false);
      }
      );
    } catch (err) {
      if (err.reason) {
        setErrorMsg(err.reason);
        setError(true);

      }
      setIsLoading(false);
    }
  }




  useEffect(() => {
    if (blockchain.accountAddress) {
      setIsLoading(true);
      dispatch(fetchData());
      contractOwnerEqualToAddress();
    }
  }, [blockchain]);

  useEffect(() => {

    if (stakin) {
      setPools(data.pools);
      setMyStaked(data.accountPools);
      setTokenPrice(data.tokenPrice);

    }
  }, [stakin, data]);

  useEffect(() => {
    if (data.Data) {
      const Data = data.Data;
      const sum = Data.reduce((acc, curr) => {
        acc[curr.poolId] = (acc[curr.poolId] || 0) + curr.stakedTokens;
        return acc;
      }, {});

      setTokensPerPool(sum);
      setAllowance(data.allowance)
    }

  }, [data]);



  useEffect(() => {
    if (myStaked && pools) {

      let filtered = [];
      pools.filter(pool => {
        let found = false;
        myStaked.map(myStake => {
          if (myStake.poolId === pool.poolId) {
            found = true;
          }
        })
        if (!found) {
          filtered.push(pool);
        }
      })

      setFilteredStaked(filtered);
    }
    setIsLoading(false);
  }, [myStaked, pools]);





  const onOfStakedFilter = () => {
    setStakedOn(!stakedOn);
  }

  console.log("data", data);


  return (
    <div className="w-full h-full overflow-hidden ">


      <div className="w-full h-full  flex justify-center items-center ">
        <div className="w-full h-full flex justify-center items-center ">

          <div className="w-full h-full flex flex-col justify-start items-start mt-8 ">
            <ErrorMsg error={error} setError={setError} errorMsg={errorMsg} />
            <Loader isLoading={isLoading} />
            {owner ?
              <Link to="/stakin-admin">
                <div className="ml-8 text-black font-bold">
                  {"Admin Site: "}{" "}
                </div>
              </Link>
              : null}

            <div className="flex justify-start items-center w-9/10 mb-2 ml-8">

              {/* <span
            style={{ cursor: "pointer" }}
            onClick={onOfAprFilter}
          >apr: {aprFilter ? <BsFillArrowDownSquareFill /> : <BsFillArrowUpSquareFill />}  </span> */}
              <span className="font-bold text-lg mr-2"> Staked: </span>
              <div
                onClick={onOfStakedFilter}
                className="border border-gray-600 h-6 w-10 rounded-full flex items-center cursor-pointer bg-gray-400"
                style={{ justifyContent: stakedOn ? "flex-end" : "flex-start" }}
              >
                <div className="rounded-full shadow-md h-5 w-5 bg-white"
                ></div>
              </div>
            </div>




            <div className="w-full h-auto flex justify-center" >

               {pools?.length > 0 ?
                <>
                  { stakedOn ? <div className=" grid  gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {myStaked.map((pool, index) => (

                      <div className="flex items-center justify-around w-[400px] h-[250px] rounded-3xl text-[15px] bg-[##EEEEEE] shadow-2xl border m-2 bg-white" >
                        <div className="w-auto h-auto">
                          <div className="w-auto h-auto flex flex-col justify-center items-center">
                            <img src={logo} alt="logo" className="w-20 h-20" />

                            <div className="font-bold">
                              {getAPr(pool.poolId)}%
                              <p>APR</p>
                            </div>
                          </div>

                          <div className="w-auto flex flex-col items-center">bloqueados: <Timer eventTime={pool.stakeTime} interval={1000} />
                          </div>
                        </div>

                        <div className="w-auto h-[90%] flex flex-col justify-between items-center mt-2">
                          <div className="w-[200px] flex justify-around items center">
                            <div className="w-auto flex flex-col items-center font-bold">
                              {pool.stakedTokens}
                              <p>tokens</p>
                            </div>

                            <div className="w-auto flex flex-col items-center font-bold">
                              <RewarderPerMinute
                                claimingDate={pool.dateClaimed}
                                tokenAmount={pool.stakedTokens}
                                apr={getAPr(pool.poolId)}
                                interval={1000}
                                tokenPrice={tokenPrice}
                              />

                              <p>acumulado</p>
                            </div>
                          </div>

                          <div className="w-[200px] flex justify-around items-center">
                            <div className="w-auto flex flex-col items-center font-bold">
                              tiempo restante
                              <Timer eventTime={pool.stakeTime} interval={1000} />
                            </div>

                            <div className="w-auto flex flex-col items-center font-bold" >
                              {parseInt(tokensPerPool[pool.poolId])}/{getTokensLimit(pool.poolId)}
                              Cap
                            </div>

                          </div>

                          <div className="w-[200px] flex justify-around items-center">
                            {pool.active ?
                              <>
                                <button
                                  className="w-[130px] my-[1px] mx-[5px] border-none rounded-lg bg-[#000AE5] text-white cursor-pointer"
                                  onClick={() => claimReward(pool.poolId, pool.index)}
                                >reclamar</button>
                                <button className="w-[130px] my-[1px] mx-[5px] border-none rounded-lg bg-[#5A0004] text-white cursor-pointer"
                                  onClick={() => unstake(pool.poolId, pool.index)}
                                > devolver </button>
                              </>
                              :
                              <>
                                <button
                                  onClick={() => claimReward(pool.poolId, pool.index)}
                                  className="w-[130px] my-[1px] mx-[5px] border-none rounded-lg bg-[##DDDDDD] text-black cursor-pointer"
                                >reclamar</button>

                                {1 > 0 ?
                                  <button className="w-[130px] my-[1px] mx-[5px] border-none rounded-lg bg-[#5A0004] text-white cursor-pointer"
                                    onClick={() => unstake(pool.poolId, pool.index)}
                                  > devolver</button>
                                  :
                                  <button className="w-[130px] my-[1px] mx-[5px] border-none rounded-lg bg-[##DDDDDD] text-black cursor-pointer"
                                  > devolver </button>
                                }
                              </>
                            }
                          </div>



                        </div>

                      </div>
                    ))}
                    </div> : null}



                  {stakedOn === false ?
                    <div className=" grid  gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                      {pools.map((pool, index) => (
                        <div className="flex flex-row items-center justify-around w-80 h-80 rounded-lg text-sm bg-white bg-opacity-70 shadow-lg m-2" >

                          {pool.active ?
                            <div className="flex h-full flex-col justify-around items-center">

                              <div className="w-auto h-auto ">
                                <div className="w-auto h-auto flex flex-col justify-center items-center">
                                  <img src={logo} alt="logo" className="w-20 h-20" />

                                  <div className="font-bold">
                                    {pool?.stakeApr}%
                                  </div>
                                </div>
                              </div>
                              <div className="w-auto h-auto flex flex-col justify-center items-center">
                                <div>
                                  <input
                                    className="rounded-lg border-none w-36 shadow-md"
                                    type="number"
                                    onChange={(e) => setStakeValue(e.target.value)}
                                  /> / 100
                                </div>

                                <div>
                                  {parseInt(tokensPerPool[pool.poolId]) >= getTokensLimit(pool.poolId) ?
                                    <button
                                      className="bg-yellow-300 rounded-lg border-none w-36 shadow-md "
                                    >Pool llena
                                    </button>
                                    :
                                    <button
                                      className="bg-yellow-300 text-black cursor-pointer w-36 shadow-md rounded-lg"
                                      onClick={() => stake(pool.poolId, stakeValue)}
                                    >
                                      {

                                        allowances > stakeValue ?

                                          "Bloquear"
                                          :
                                          "Aprobar"
                                      }
                                    </button>
                                  }


                                </div>
                              </div>
                              <div className="w-[100px] rounded-lg h-20 flex flex-col justify-center items-center bg-yellow-300  text-black font-semibold">
                                {tokensPerPool[pool.poolId] ?
                                  parseInt(tokensPerPool[pool.poolId])
                                  : "0"
                                }/{getTokensLimit(pool.poolId)}
                              </div>
                            </div>

                            :
                            <button className="button-color-stake-disabled">
                              pool inactiva
                            </button>
                          }

                        </div>))}
                    </div>
                    : null}





                </>
                :
                <div className=" bg-white flex items-center justify-around w-[400px] h-[250px] rounded-3xl text-[15px] bg-[##EEEEEE] shadow-2xl border">
                  no hay pools activos
                </div>
              } 


            </div>


          </div>

        </div>
      </div>
    </div>

  )
}

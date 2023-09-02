import React, { useState } from "react";
import "../style/style_admin.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ethers } from "ethers";
import moment from "moment";
import Loader from "../components/Loader";
import { BanSistem } from "../components/StakingAdmin/BanSistem";
import RewarderPerMinute from "../components/RewardedPerMinute";

// maximo de wallet por pool



export default function StakingAdmin() {
    const stakin = useSelector(state => state.blockchain.stakingContract);


    const [pools, setPools] = useState([]);
    const [poolUserCounter, setPoolUserCounter] = useState(0);
    const [tokensPerPool, setTokensPerPool] = useState(0);
    const [rewarded, setRewarded] = useState(0);

    const [newPoolAPr, setNewPoolAPr] = useState("");
    const [newTimeLocked, setNewTimeLocked] = useState("");
    const [newPoolTokenLimit, setNewPoolTokenLimit] = useState("");
    const [newMaxPerWallet, setNewMaxPerWallet] = useState("");
    const [tokenPrice, setTokenPrice] = useState("");

    const [newApr, setNewApr] = useState("");
    const [newTokenLimit, setNewTokenLimit] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [AllData, setAllData] = useState([]);


    const getAllPools = async () => {
        setIsLoading(true);
        let Pools = [];
        try {
            await stakin.getAllPools().then(res => {
                res.map(pool => {
                    Pools.push({
                        stakeTokensLimit: ethers.utils.formatEther(pool.stakeTokensLimit),
                        stakingStartTime: moment(pool.stakingStartTime).format("DD MMM YYYY"),
                        stakeApr: ethers.utils.formatEther(pool.stakeApr),
                        tokenLockedTime: timestampToDays(pool.tokenLockedTime),
                        poolId: pool.poolId,
                        active: pool.active,
                        staketTokens: getPoolTokensLimit(pool.poolId),
                        tokenLimitPerWallet: ethers.utils.formatEther(pool.tokenLimitPerWallet),
                    })
                })
            })
            setPools(Pools);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }


    const getAllData = async () => {
        setIsLoading(true);
        let poolIds = [];
        const AllData = [];
        try {
            const data = await stakin.getAllData();
            //console.log(data);
            const Data = data.map(data => {
                AllData.push({
                    owner: data.owner,
                    stakedTokens: ethers.utils.formatEther(data.stakedTokens),
                    rewardedAmount: ethers.utils.formatEther(data.rewardedAmount),
                    index: parseInt(data.index),
                    poolId: data.poolId,
                    stakeTime: timestampToDate(data.stakeTime),
                    startTime: timestampToDate(data.startTime),
                    dateClaimed: timestampToDate(data.dateClaimed),
                    clearStartTime: data.startTime,
                    clearDateClaimed: data.dateClaimed,
                    tokenLockedTime: moment.unix(data.tokenLockedTime).format("DD MMM YYYY"),
                    active: data.active,

                })
            })

            setAllData(AllData);


            const addressPerId = data.filter(pool => pool.active === true);
            const addresPerIDS = addressPerId.map(pool => {
                poolIds.push({
                    poolId: pool.poolId,
                    address: pool.address,
                    stakedTokens: pool.stakedTokens / 10 ** 18,
                    rewardedAmount: pool.rewardedAmount / 10 ** 18,
                })
            })
            //count same poolIds
            const count = poolIds.reduce((acc, curr) => {
                acc[curr.poolId] = (acc[curr.poolId] || 0) + 1;
                return acc;
            }, {});
            //console.log(count);
            setPoolUserCounter(count);

            //sum stakedTokens per poolId
            const sum = poolIds.reduce((acc, curr) => {
                acc[curr.poolId] = (acc[curr.poolId] || 0) + curr.stakedTokens;
                return acc;
            }
                , {});
            //console.log(sum);
            setTokensPerPool(sum);

            //getRewardedAmount per poolId
            const reward = poolIds.reduce((acc, curr) => {
                acc[curr.poolId] = (acc[curr.poolId] || 0) + curr.rewardedAmount;
                return acc;
            }
                , {});
            //console.log("tokenPrice", tokenPrice);
            //console.log("reward", reward);
            setRewarded(reward);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const createNewPool = async () => {
        setIsLoading(true);
        try {
            const tokenLimit = ethers.utils.parseEther(newPoolTokenLimit);
            const timelocked = newTimeLocked * 24 * 60 * 60;
            const stakeApr = ethers.utils.parseEther(newPoolAPr);
            const Max = ethers.utils.parseEther(newMaxPerWallet);

            await stakin.setStakePool(tokenLimit, timelocked, stakeApr, Max);
            stakin.on("setNewPool", (apr, limit, locked) => {

                getAllData();
                getAllPools();
                setIsLoading(false);
            }
            )
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }

    }

    const fixApr = async (poolId) => {
        setIsLoading(true);
        try {
            const apr = ethers.utils.parseEther(newApr);
            const tx = await stakin.setPoolApr(poolId, apr);
            setTimeout(() => {
                getAllData();
                getAllPools();
                setIsLoading(false);
            }, 4100);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const fixTokenLimit = async (poolId) => {
        setIsLoading(true);
        try {
            const tokenLimit = ethers.utils.parseEther(newTokenLimit);
            const tx = await stakin.setPoolTokenLimit(poolId, tokenLimit);
            tx.wait();
            setTimeout(() => {
                getAllData();
                getAllPools();
                setIsLoading(false);
            }, 4100);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }

    }

    const udesactivatePool = async (poolId) => {
        setIsLoading(true);
        try {
            const desactivate = await stakin.setPoolFalse(poolId);

        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const activatePool = async (poolId) => {
        setIsLoading(true);
        try {
            const activate = await stakin.setPoolTrue(poolId);
            //console.log(activate);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const getAprWithPoolId = (poolId) => {
        let apr = 0;
        pools.map(pool => {
            if (pool.poolId === poolId) {
                //console.log("stakeapr",parseInt(pool.stakeApr));
                apr = parseInt(pool.stakeApr);
            }
        })
        return apr;
    }

    const filterCounter = (poolId) => {
        const count = poolUserCounter[poolId];
        return count;
    }



    const getPoolTokensLimit = async (poolId) => {

        try {

            const get = await stakin.getPoolTokenLimit(poolId);
            return ethers.utils.formatEther(get);
        } catch (e) {
            return "0";
        }

    }

    const timestampToDays = (timestamp) => {
        if (timestamp < 60) {
            return `${timestamp} seconds`;
        }
        else if (timestamp < 3600) {
            return `${Math.floor(timestamp / 60)} minutes`;
        }
        else if (timestamp < 86400) {
            return `${Math.floor(timestamp / 3600)} hours`;
        }
        else if (timestamp < 2592000) {
            return `${Math.floor(timestamp / 86400)} days`;
        }
        else if (timestamp < 31536000) {
            return `${Math.floor(timestamp / 2592000)} months`;
        }
        else {
            return `${Math.floor(timestamp / 31536000)} years`;
        }
    }

    const timestampToDate = (timestamp) => {
        return moment.unix(timestamp).format("DD MMM, YYYY");
    }


    const tokenPricefetch = async () => {
        const tokenPrice = await stakin.tokenPrice();
        setTokenPrice(parseFloat(ethers.utils.formatEther(tokenPrice)));
    }

    const sliceAddress = (address) => {
        const Address = address.slice(0, 6) + "..." + address.slice(-4);
        return Address;
    }



    useEffect(() => {
        if (stakin) {
            getAllData();
            getAllPools();
            tokenPricefetch();
        }
    }, [stakin]);



    const [allDataFilter, setAllDataFilter] = useState(AllData);
    const [filterWord, setFilterWord] = useState("");

    const filterData = () => {
        if (filterWord === "") {
            setAllDataFilter(AllData);
        } else {
            const filter = AllData.filter((data) => data.owner.toLowerCase().includes(filterWord.toLowerCase()));
            setAllDataFilter(filter);
        }
    }

    useEffect(() => {
        filterData();
    }, [filterWord, AllData]);

    console.log(AllData)

    const calculateAcumulatedReward = (apr, dateClaimed, amuntStaked) => {
        const aprPerDay = apr / 365;
        const timePass = moment().unix() - dateClaimed;
        const daysPass = timePass / 86400;
        const reward = (aprPerDay * daysPass * amuntStaked) / 100;
        const calcWithTokenPrice = reward * tokenPrice;
        return calcWithTokenPrice.toFixed(6);
    
    }





    return (
        <div className="banner2 burger  align-item-center parallax">
            <div className="staking">
                <Loader isLoading={isLoading} />
                <div className="exchange-title">
                    Administration Panel
                </div>

                <div className="pools-admin">
                    <div className="poolMap-admin">

                        <div>
                            New Pool
                        </div>
                        <br />
                        <div>
                            <p>APR</p>
                            <input type="number"
                                placeholder="10"
                                value={newPoolAPr}
                                onChange={(e) => setNewPoolAPr(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <p>Token Limit</p>
                            <input type="number"
                                placeholder="100"
                                value={newPoolTokenLimit}
                                onChange={(e) => setNewPoolTokenLimit(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <p>Locked Time</p>
                            <input type="number"
                                placeholder="days"
                                value={newTimeLocked}
                                onChange={(e) => setNewTimeLocked(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <p>Max Per Wallet</p>
                            <input type="number"
                                placeholder="100"
                                value={newMaxPerWallet}
                                onChange={(e) => setNewMaxPerWallet(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <button
                                onClick={createNewPool}
                                className="button-color-stake">
                                Create
                            </button>
                        </div>
                        <br />
                    </div>
                    {pools.length > 0 ?
                        <>
                            {pools.map((pool, index) => (
                                <div className="poolMap-admin" key={index}>

                                    <div className="APR">

                                        {parseInt(pool.stakeApr)}%
                                    </div>
                                    <>
                                        <input
                                            type="number"
                                            placeholder="10"

                                            onChange={(e) => setNewApr(e.target.value)}

                                        />
                                        <button
                                            onClick={() => fixApr(pool.poolId)}
                                            className="button-color-stake">
                                            change apr
                                        </button>
                                    </>

                                    <div className="reward-to-claim">
                                        <br />
                                        <p>{tokensPerPool[pool.poolId] ?
                                            tokensPerPool[pool.poolId] : 0
                                        }/{pool.stakeTokensLimit}</p>
                                        <input
                                            type="number"
                                            placeholder="10"
                                            onChange={(e) => setNewTokenLimit(e.target.value)}
                                        />
                                        <button
                                            onClick={() => fixTokenLimit(pool.poolId)}
                                            className="button-claim ">change Token Limit</button>
                                    </div>
                                    <div className="days-to-claim">
                                        <br />
                                        <p>Loked Time: {pool.tokenLockedTime} </p>
                                    </div>
                                    <div className="days-to-claim">

                                        <p>Users in Pool: {filterCounter(pool.poolId) ?
                                            filterCounter(pool.poolId) : 0
                                        } </p>
                                    </div>
                                    <div className="days-to-claim">

                                            <p>token rewarded: BUSD {rewarded[pool.poolId] ?
                                                (rewarded[pool.poolId] * tokenPrice).toFixed(4) : 0
                                            }</p>
                                    </div>
                                    <div className="days-to-claim">

                                        <p>start in: {pool.stakingStartTime}</p>
                                    </div>
                                    <div>
                                        max wallet: {pool.tokenLimitPerWallet}
                                    </div>
                                    <div className="days-to-claim">

                                        <p>poolId: {pool.poolId}</p>
                                    </div>
                                    <div className="stake-cap ">
                                        {pool.active ?
                                            <button
                                                onClick={() => udesactivatePool(pool.poolId)}
                                                className="button-unstake">desactivate pool</button>
                                            :
                                            <button
                                                onClick={() => activatePool(pool.poolId)}
                                                className="button-stake">activate pool</button>
                                        }

                                    </div>

                                </div>


                            ))}
                        </>
                        :
                        <div>
                            No pools found
                        </div>
                    }
                </div>
                <div className="footer">
                    <div className="footer-text">
                        Data
                    </div>
                    <div className="data-filter-input">
                        owner:
                        <input 
                        className="p-0 d-0"
                        type={'text'} 
                        onChange= {(e) => setFilterWord(e.target.value)}
                        value={filterWord}
                        />
                    </div>

                    <div className="grid">
                        {/* <span className="movilNone">
                            <strong>index</strong>
                        </span> */}
                        <span>
                            <strong>owner</strong>
                        </span>
                        <span>
                            <strong>staked tokens</strong>
                        </span>

                        <span>
                            <strong>pool Id</strong>
                        </span>
                        <span>
                            <strong>APR</strong>
                        </span>
                        <span className="movilNone">
                            <strong>created at</strong>
                        </span>
                        <span>
                            <strong>date claimed</strong>
                        </span>
                        <span>
                            <strong>locked time</strong>
                        </span>
                        <span>
                            <strong> active </strong>
                        </span>
                        <span>
                            <strong> rewarded amount</strong>
                        </span>
                        <span>
                            <strong> next reward</strong>
                        </span>
                        {allDataFilter.map((data, index) => (
                            <React.Fragment key={index}>
                                {/* <span className="movilNone" style={{ backgroundColor: "#fff" }}>
                                    {data.index}
                                </span> */}
                                <span style={{ backgroundColor: "#fff" }}>
                                    {sliceAddress(data.owner)}
                                </span>
                                <span style={{ backgroundColor: "#fff" }}>
                                    {data.stakedTokens}
                                </span>

                                <span style={{ backgroundColor: "#fff" }}>
                                    {data.poolId}
                                </span>
                                <span style={{ backgroundColor: "#fff" }}>
                                    {getAprWithPoolId(data.poolId)}
                                </span>
                                <span className="movilNone" style={{ backgroundColor: "#fff" }}>
                                    {data.startTime}
                                </span>
                                <span style={{ backgroundColor: "#fff" }}>
                                    {data.active ? data.dateClaimed : "inactive"}
                                </span>
                                <span style={{ backgroundColor: "#fff" }}>
                                    {data.tokenLockedTime}
                                </span>
                                <span style={{ backgroundColor: "#fff" }}>
                                    {data.active ? "active" : "inactive"}
                                </span>
                                <span style={{ backgroundColor: "#fff" }}>
                                    {data.rewardedAmount === 0 ? 0 : (data.rewardedAmount * tokenPrice).toFixed(6)}
                                </span>

                                <span style={{ backgroundColor: "#fff" }}>
                                   {calculateAcumulatedReward(getAprWithPoolId(data.poolId), data.clearDateClaimed, data.stakedTokens)}

                                </span>
                            </React.Fragment>
                        ))}
                    </div>

                </div>
                <div className="footer">
                    <div className="footer-text">
                        BAN SISTEM
                    </div>
                    <BanSistem />
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}

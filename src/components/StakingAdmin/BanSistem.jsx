import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBanned, removeBanned } from '../../redux/bannedAccounts/bannedActions';
import LoaderFullScreen from '../loaderFullScreen';


export const BanSistem = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState("");
    const [pool, setPool] = useState("");

    const {accountAddress} = useSelector(state => state.blockchain);

    const { bannedAccounts, bannedLoaded, loading} = useSelector(state => state.banned)

    const ban = () => {
        if(address !== "" && pool !== ""){
        dispatch(addBanned(address, pool, accountAddress))
        }
        else{
            alert("Please fill all fields")
        }
    }

    const freeBan = (id) => {
        dispatch(removeBanned(id, accountAddress))
    }



 
    return (
        <>
        <LoaderFullScreen isLoading={loading} />
            <div className="banSistem">
                <div>
                    address:
                    <input type="text" placeholder="0x..." onChange={(e) => setAddress(e.target.value)} value={address} />
                </div>
                <div>
                    Pool:
                    <input type="number" placeholder="Pool Id" value={pool} onChange={(e) => setPool(e.target.value)} />
                </div>
                <div>
                    <button className="button-ban" onClick={ban}
                    >Ban</button>
                </div>
            </div>
            <div className="banSistemAddress">
                {bannedLoaded ?
                    bannedAccounts.banneds.map(item => (
                        <div className='banned-wallet-map' key={item.address}>
                            <div>
                                address: {item.addressBanned}
                               <span> Pool: {item.poolsBanned.map(item => item)}</span>
                            </div>
              
                            <div>
                                <button className="btn btn-danger"
                                    onClick={() => freeBan(item._id)}
                                >Free ban</button>
                            </div>
                        </div>
                    ))
                    :
                    <div>Loading...</div>
                }
            </div>

        </>

    )
}

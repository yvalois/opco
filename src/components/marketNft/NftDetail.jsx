import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../style/style_nft_detail.css";
import busd from '../../images/logo/busd.png';
import opco from '../../images/logo/logo.png';
import { AiFillStar } from 'react-icons/ai';
import { getMarket } from "../../redux/market/marketAction";
import { fetchMinter } from "../../redux/blockchain/minterAction";
import { contract } from '../../redux/blockchain/blockchainRouter';
import LoaderFullScreen from "../loaderFullScreen";



export default function NftDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { market, marketloaded, tokenPrice, discount } = useSelector(state => state.market);
    const { marketContract, accountAddress } = useSelector(state => state.blockchain);

    const router = contract();

    const { id } = useParams();

    const [detailLoaded, setDetailLoaded] = useState(false);
    const [nftDetail, setNftDetail] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (marketloaded) {
            //filter by id

            const nft = market.find(nft => nft.token_id === parseInt(id));
            setNftDetail(nft);
            setDetailLoaded(true);
        }
    }, [marketloaded, id, market]);

    useEffect(() => {
        if (accountAddress && marketloaded && detailLoaded) {
            if (accountAddress.toLowerCase() === nftDetail.owner.toLowerCase()) {
                setIsOwner(true);
            }
        }
    }, [accountAddress, nftDetail, marketloaded, detailLoaded]);

    const repeatStar = (number) => {
        let stars = [];
        for (let i = 0; i < number; i++) {
            stars.push(<AiFillStar className="star" key={i} />);
        }
        return stars;
    }

    const priceDivTokenXdiscount = (nftDetail.dollarPrice / tokenPrice) * (1 - discount);

    const buyHandler = async (listId, token) => {
        if (accountAddress) {
            try {
                setLoading(true);
                const buy = await marketContract.buy(listId, token);
                marketContract.on('buyed', (address, token, dollarPrice) => {

                    dispatch(getMarket());
                    dispatch(fetchMinter());
                    setLoading(false);
                    setTimeout(() => {
                        navigate('/market');
                    }, 1000);
                });
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            alert('Please connect to your wallet');
        }
    }

    const cancelHandler = async (listId) => {
        if (accountAddress) {
            try {
                setLoading(true);
                const cancel = await marketContract.removeListing(listId);
                marketContract.on('ListingRemoved', (id) => {

                    dispatch(getMarket());
                    dispatch(fetchMinter());
                    setLoading(false);
                    setTimeout(() => {
                        navigate('/market');
                    }, 1000);
                });
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            alert('Please connect to your wallet');
        }
    }


    return (
        <>
<LoaderFullScreen isLoading={loading} />
<div className="flex justify-center items-center h-full w-full">
  {detailLoaded ? (
    <div className='flex flex-col lg:flex-row bg-gray-900 text-white rounded-xl shadow-xl overflow-hidden'>
      <div className="w-full lg:w-1/2 flex flex-col p-8 justify-center items-center">
        <img
          className="rounded-lg w-full h-full object-cover max-h-96 lg:max-h-full"
          src={nftDetail.image}
          alt={nftDetail.name}
        />
        <h2 className="mt-5 text-4xl font-bold">{nftDetail.name}</h2>
        <h3 className="w-auto flex items-center ml-2 mt-3 text-2xl">Rareza: {repeatStar(parseInt(nftDetail.rarity))}</h3>
        <h6 className="mt-2 text-lg">Dueño: {nftDetail.owner}</h6>
        <h6 className="mt-2 text-sm bg-white text-black p-2 rounded">Adn: {nftDetail.dna}</h6>
      </div>

      <div className="w-full lg:w-1/2 bg-white text-black p-8 flex flex-col space-y-6">
        {nftDetail.attributes.map(attribute => (
          <div key={attribute.trait_type} className="flex justify-between border-b border-gray-200 pb-3">
            <p className="text-lg">{attribute.trait_type}:</p>
            <p className="text-lg font-semibold">{attribute.value}</p>
          </div>
        ))}

        {isOwner ?
          <button className="mt-3 bg-red-500 text-white p-3 rounded" onClick={() => cancelHandler(nftDetail.listId)}>
            Cancel
          </button>

          :

          <div className="w-full flex flex-col sm:flex-row justify-around mt-3">
            <button
              onClick={() => buyHandler(nftDetail.listId, router.BUSD_ADDRESS)}
              className= 'w-full sm:w-auto bg-yellow-300 p-3 rounded my-1 sm:my-0'>
              <img src={busd} alt="busd" className="h-6 w-6 mr-2 inline"/>
              ${(parseFloat(nftDetail.dollarPrice)).toFixed(2)}
            </button>
            <button
              onClick={() => buyHandler(nftDetail.listId, router.OPCO_ADDRESS)}
              className='w-full sm:w-auto bg-black text-white p-3 rounded my-1 sm:my-0'>
              <img src={opco} alt="opco" className="h-6 w-6 mr-2 inline"/>
              ${(parseFloat(priceDivTokenXdiscount)).toFixed(2)}
            </button>
          </div>
        }
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )}
</div>

        </>
    )
}

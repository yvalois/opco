import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import NftCard from '../components/marketNft/NftCard';
import Pagination from '../components/marketNft/Pagination';
import { getMarket } from '../redux/market/marketAction';
import { ethers } from 'ethers';
import "../style/style_market.css";
import { fetchMinter } from '../redux/blockchain/minterAction';
import Loader from '../components/Loader';
import logo from '../images/logo/logo.png';




export default function Nftmarket() {
  const dispatch = useDispatch();
  const { marketContract, accountAddress, tokenContract, busdContract } = useSelector(state => state.blockchain);
  const Market = useSelector(state => state.market);
  const { market, marketloaded, tokenPrice, discount } = Market;
  const [searchFilter, setSearchFilter] = useState('');
  const [minToMax, setMinToMax] = useState(true);
  const [minIdTomaxId, setMinIdTomaxId] = useState(true);

  ;
  const { page } = useParams();

  const [tokenPrices, setTokenPrices] = useState(0);
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [nftList, setNftList] = useState([]);
  const [nftListFiltered, setNftListFiltered] = useState([]);
  const [nftListFilteredPaginated, setNftListFilteredPaginated] = useState([]);
  const [loading, setLoading] = useState(false);

  const check1 = useRef();
  const check2 = useRef();
  const check3 = useRef();
  const check4 = useRef();
  const check5 = useRef();

  useEffect(() => {
    if (!marketloaded) {
      dispatch(getMarket());
    }
  }, [marketloaded]);

  useEffect(() => {
    if (market.length > 0) {
      setNftList(market);
      setNftListFiltered(market);
    }
  }, [market]);

  useEffect(() => {
    if (searchFilter !== '') {
      setNftListFiltered(nftList.filter(nft => nft.name.toLowerCase().includes(searchFilter.toLowerCase())));
    }
    else {
      setNftListFiltered(nftList);
    }
  }, [searchFilter, nftList]);

  useEffect(() => {
    if (nftListFiltered.length > 0) {
      setTotalPages(Math.ceil(nftListFiltered.length / limit));
      setTotalItems(nftListFiltered.length);
      setNftListFilteredPaginated(nftListFiltered.slice((currentPage - 1) * limit, currentPage * limit));
    }
  }, [nftListFiltered, currentPage, limit]);

  useEffect(() => {
    if (minToMax === true) {
      setNftListFilteredPaginated(nftListFiltered.sort((a, b) => parseFloat(a.dollarPrice) - parseFloat(b.dollarPrice)));
    }
    if (minToMax === false) {
      setNftListFilteredPaginated(nftListFiltered.sort((a, b) => parseFloat(b.dollarPrice) - parseFloat(a.dollarPrice)));
    }
    setNftListFilteredPaginated(nftListFiltered.slice((currentPage - 1) * limit, currentPage * limit));
  }
    , [minToMax, nftListFiltered]);

  useEffect(() => {
    if (minIdTomaxId === true) {
      setNftListFilteredPaginated(nftListFiltered.sort((a, b) => parseFloat(a.token_id) - parseFloat(b.token_id)));
    }
    if (minIdTomaxId === false) {
      setNftListFilteredPaginated(nftListFiltered.sort((a, b) => parseFloat(b.token_id) - parseFloat(a.token_id)));
    }
    setNftListFilteredPaginated(nftListFiltered.slice((currentPage - 1) * limit, currentPage * limit));
  }
    , [minIdTomaxId, nftListFiltered]);


  const prevHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const nextHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const rarityHandler = (num) => {
    let rarityFilter = [];

      rarityFilter.push(num);

    if (rarityFilter.length > 0) {
      setNftListFiltered(nftList.filter(nft => rarityFilter.includes(parseInt(nft.rarity))));
    }
    else {
      setNftListFiltered(nftList);
    }
  }


  const filterPage = (nftListFilteredPaginated, currentPage, limit) => {
    const indexOfLastItem = currentPage * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    const currentItems = nftListFilteredPaginated.slice(indexOfFirstItem, indexOfLastItem);
    return currentItems;
  }

  useEffect(() => {

    setNftListFilteredPaginated(filterPage(nftListFiltered, currentPage, limit));
  }
    , [currentPage, limit]);

  const verifyApprovend = async (token) => {
    if (token === tokenContract.address) {
      try {
        const amountApproved = await tokenContract.allowance(accountAddress, marketContract.address);
        const amountWeiToEther = ethers.utils.formatUnits(amountApproved, 'wei');
        return parseFloat(amountWeiToEther);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const amountApproved = await busdContract.allowance(accountAddress, marketContract.address);
        const amountWeiToEther = ethers.utils.formatUnits(amountApproved, 'wei');
        return parseFloat(amountWeiToEther);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const approve = async (token) => {
    setLoading(true);
    if (token === tokenContract.address) {
      try {
        await tokenContract.approve(marketContract.address, ethers.utils.parseEther('9999999999999999999'));
        tokenContract.on('Approval', (address, amount) => {

          setLoading(false);
        })
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      try {
        await busdContract.approve(marketContract.address, ethers.utils.parseEther('9999999999999999999'));
        busdContract.on('Approval', (address, amount) => {

          setLoading(false);
        })
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }



  const buyHandler = async (listId, token, price) => {
    setLoading(true);
    if (accountAddress) {
      const verify = await verifyApprovend(token);
      try {
        if (verify > parseFloat(price)) {
          const buy = await marketContract.buy(listId, token);
          marketContract.on('buyed', (address, token, dollarPrice) => {

            dispatch(getMarket());
            dispatch(fetchMinter());
            setLoading(false);
          })
        } else {
          approve(token);
        }
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
    <div className='w-full h-full overflow-x-hidden  overflow-y-auto'>
      <Loader loading={true} />
      <nav className='flex items-center lg:ml-4 w-full lg:w-[99%] bg-yellow-300 justify-start md:justify-between   z-50'>
        <div className='w-full h-auto flex justify-center md:justify-between'>
          <div className="cursor-pointer md:ml-4">
            <div className='lg:flex hidden justify-center items-center'>
              <img className='w-[60px] h-[60px]' src={logo} alt="OPCO"></img>
              <h2>   <p className=' text-[25px] flex justify-center mt-[20px]  text-black' >OPEN COFFEE</p></h2>
            </div>
          </div>
          <div className='w-auto flex justify-center'>
            <div className="flex items-center text-md m-2">
              <div className="relative inline-block">
                <select className='appearance-none outline-none border-none rounded-lg  bg-gray-200 cursor-pointer transition-colors duration-200 hover:bg-[#e0e0e0]' id="price-sort" onChange={(e) => setMinToMax(e.target.value === "menor")}>
                  <option value="">Precio</option>
                  <option value="menor">Menor precio</option>
                  <option value="mayor">Mayor precio</option>
                </select>
              </div>
            </div>
            <div className="flex items-center text-md m-2">
              <div className="relative inline-block">
                <select className='appearance-none outline-none border-none rounded-lg  bg-gray-200 cursor-pointer transition-colors duration-200 hover:bg-[#e0e0e0]'
                  onChange={(e) => setMinIdTomaxId(e.target.value === 'menor')}
                >
                  <option value="">ID</option>
                  <option
                    value='menor'
                  >menor precio
                  </option>
                  <option
                    value='mayor'
                  >mayor precio
                  </option>
                </select>
              </div>
            </div>
            <div className="flex items-center text-md m-2">
              <div className="relative inline-block">
                <select className='appearance-none outline-none border-none rounded-lg  bg-gray-200 cursor-pointer transition-colors duration-200 hover:bg-[#e0e0e0]' id="rarity-sort" onChange={rarityHandler}>
                  <option  value="">Rareza</option>
                  <option onChange={()=> {rarityHandler(1)}}  value="1">1 </option>
                  <option onChange={()=> {rarityHandler(2)}}  value="2">2 </option>
                  <option onChange={()=> {rarityHandler(3)}} value="3">3 </option>
                  <option onChange={()=> {rarityHandler(4)}} value="4">4 </option>
                  <option onChange={()=> {rarityHandler(5)}} value="5">5 </option>
                </select>
              </div>
            </div>

          </div>

        </div>



      </nav>

      <div className='mt-[30px] mb-[30px] flex justify-center'>
          <input
            className=' w-4/12 rounded-xl text-md px-2 py-1 bg-gray-200 '
            placeholder='nft-id'
            type='text'
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>

      <div className="xxs:ml-2 lg:ml-8 w-full h-full flex flex-col justify-center items-center   ">

        {/* Que no se repitan los .map */}
        <div className='grid grid-cols-2 xs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-start h-full  w-full mt-4'>
          {marketloaded &&
            nftListFiltered.map((nft, index) => (
              <NftCard
                url={nft.image}
                price={nft.dollarPrice}
                id={nft.token_id}
                listId={nft.listId}
                name={nft.name}
                rarity={parseInt(nft.rarity)}
                tokenPrice={tokenPrice}
                owner={nft.owner}
                accountAddress={accountAddress}
                buyHandler={buyHandler}
                cancelHandler={cancelHandler}
                key={index}
                discount={discount}
              />
            ))}
        </div>

      </div>

      <div className='w-full flex justify-center items-center'>
        <Pagination
          currentPage={currentPage}
          nextHandler={nextHandler}
          prevHandler={prevHandler}
        />
      </div>





    </div>





  )
}


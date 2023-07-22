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
import Swal from 'sweetalert2';
import { ethers } from 'ethers';


const Inversiones = [
    {
        nombre: "Inversion #1",
        tipo: 1,
        price: 0,
        image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
        nombre: "Inversion #2",
        tipo: 2,
        price: 0,
        image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
        nombre: "Inversion #3",
        tipo: 3,
        price: 0,
        image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
        nombre: "Inversion #4",
        tipo: 4,
        price: 0,
        image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
        nombre: "Inversion #5",
        tipo: 5,
        price: 0,
        image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
        nombre: "Inversion #6",
        tipo: 6,
        price: 0,
        image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },

]

export default function StakingDetail() {
    const { inversionesContract, usdtContract, opcoContract, accountAddress,busdContract } = useSelector((state) => state.blockchain)
    const [opcoP, setOpco] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [allowance, setAllowance] = useState(0);
    const [allowanceO, setAllowanceO] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isRefer, setIsRefer] = useState(false);
    const [refer, setRefer] = useState(accountAddress);

    const UsdtToOpco = async () => {
        setLoading(true)
        const valor = ethers.utils.parseUnits(precio.toString(), 18)
        const opco = await inversionesContract.usdtToOpco(valor)
        const precioO = parseFloat(ethers.utils.formatUnits(opco, 18)).toFixed(2);
        setOpco(precioO)
        setLoading(false)
    }

    const returnPrice = async (tipo) => {
        
        const precio = await inversionesContract.prices_Per_Type(tipo);
        const parsePrice = parseFloat(ethers.utils.formatUnits(precio, 8)).toFixed(2);
        setPrecio(parsePrice)
        
    
      }
    
      const getAllowance = async () => {
        
        const allowance = await busdContract.allowance(accountAddress, inversionesContract.address);
        const parseAllowance = parseFloat(ethers.utils.formatUnits(allowance, 8)).toFixed(2);
        setAllowance(parseAllowance)
        
    
      }
      const getAllowanceU = async () => {
        
        const allowance = await usdtContract.allowance(accountAddress, inversionesContract.address);
        const parseAllowance = parseFloat(ethers.utils.formatUnits(allowance, 8)).toFixed(2);
        setAllowance(parseAllowance)
        
      }
    
      const getAllowanceO = async () => {

        const allowance = await opcoContract.allowance(accountAddress, inversionesContract.address);
        const parseAllowance = parseFloat(ethers.utils.formatUnits(allowance, 8)).toFixed(2);
        setAllowanceO(parseAllowance)

    
      }
    

    const Approve = async () => {
        try {
            setLoading(true);
            const cant = precio.toString()
            const tx = await usdtContract.approve(inversionesContract.address, ethers.utils.parseUnits(cant, 18));
            //const tx = await opcoContract.mint(accountAddress, ethers.utils.parseUnits("10000", 18));
            await tx.wait();
            getAllowance();
            setLoading(false);
            Swal.fire({
                title: 'Success',
                text: 'Aprovado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            setLoading(false);
            Swal.fire({
                title: 'tokens no fueron aprovados correctamente',
                text: err.reason,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }


    }

    const ApproveO = async () => {
        try {
            setLoading(true);
            const cant = opcoP.toString();
            const tx = await opcoContract.approve(inversionesContract.address, ethers.utils.parseUnits(cant, 18));
            await tx.wait();
            getAllowanceO();
            setLoading(false);
            Swal.fire({
                title: 'Success',
                text: 'Aprovado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            setLoading(false);
            Swal.fire({
                title: 'tokens no fueron aprovados correctamente',
                text: err.reason,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const buy = async () => {
        try {
            setLoading(true);
            const tx = await inversionesContract.buyToken(id, usdtContract.address, "HOlaUwu", isRefer, refer);
            await tx.wait();
            setLoading(false);
            Swal.fire({
                title: 'Success',
                text: 'Comprado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            setLoading(false);
            Swal.fire({
                title: 'Hubo un error en la transacion',
                text: err.reason,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const buyOpco = async () => {
        try {
            setLoading(true);
            const tx = await inversionesContract.buyToken(id, opcoContract.address, "HOlaUwu", isRefer, refer);
            await tx.wait();
            setLoading(false);
            Swal.fire({
                title: 'Success',
                text: 'Comprado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            setLoading(false);
            Swal.fire({
                title: 'Hubo un error en la transacion',
                text: err.reason,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }


    useEffect(() => {
        returnPrice(id)
        getAllowance()
        getAllowanceO()
    }, [])

    useEffect(() => {
        UsdtToOpco()
    }, [precio])

    const dispatch = useDispatch();

    const { id } = useParams();

    const [nftDetail, setNftDetail] = useState({
        nombre: "Inversion #1",
        tipo: 1,
        price: 100,
        image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    });



    const repeatStar = (number) => {
        let stars = [];
        for (let i = 0; i < number; i++) {
            stars.push(<AiFillStar className="star" key={i} />);
        }
        return stars;
    }

    useEffect(() => {
        setNftDetail(Inversiones[id - 1])
    }, [id])



    return (
        <>
            {/* <LoaderFullScreen isLoading={loading} /> */}
            <div className="flex justify-center items-center h-full w-full">
                {true /*detailLoaded*/ ? (
                    <div className='flex flex-col lg:flex-row bg-gray-900 text-white rounded-xl shadow-xl overflow-hidden xxs:m-2 lg:m-0 lg:mx-20'>
                        <div className="w-full lg:w-1/2 flex flex-col p-8 justify-center items-center">
                            <img
                                className="rounded-lg w-full h-full object-cover max-h-96 lg:max-h-full"
                                src={nftDetail.image}
                                alt={nftDetail.nombre}
                            />
                            <h2 className="mt-5 text-4xl font-bold">{nftDetail.nombre}</h2>
                            <h3 className="w-auto flex items-center ml-2 mt-3 text-2xl">Rareza: <div className="ml-[4px] flex">{repeatStar(parseInt(nftDetail.tipo))}</div></h3>
                            <h6 className="mt-2 text-lg">Dueño: {inversionesContract.address.slice(0, 6) + "......" + inversionesContract.address.slice(inversionesContract.address.length - 6)}</h6>
                            {/* <h6 className="mt-2 text-sm bg-white text-black p-2 rounded">Adn: {nftDetail.dna}</h6> */}
                        </div>

                        <div className="w-full lg:w-1/2 bg-white text-black p-8 flex flex-col space-y-6">
                            {/* {nftDetail.attributes.map(attribute => (
                            <div key={attribute.trait_type} className="flex justify-between border-b border-gray-200 pb-3">
                            <p className="text-lg">{attribute.trait_type}:</p>
                            <p className="text-lg font-semibold">{attribute.value}</p>
                            </div>
                             ))} */}

                            <div>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>

                            <div className="w-full flex flex-col  justify-around mt-3">



                                {allowance < parseInt(precio) && !loading ?
                                    (<button
                                        onClick={Approve}
                                        className='w-full sm:w-auto bg-yellow-300 p-3 rounded my-1 sm:my-0'>
                                        <img src={busd} alt="busd" className="h-6 w-6 mr-2 inline" />
                                        Aprobar
                                    </button>)
                                    : !loading ?
                                        (<button
                                            onClick={buy}
                                            className='w-full sm:w-auto bg-yellow-300 p-3 rounded my-1 sm:my-0'>
                                            <img src={busd} alt="busd" className="h-6 w-6 mr-2 inline" />
                                            {precio}
                                        </button>) :

                                        <button
                                            className='w-full sm:w-auto bg-yellow-300 p-3 rounded my-1 sm:my-0'>
                                            <img src={busd} alt="busd" className="h-6 w-6 mr-2 inline" />
                                            Loading...
                                        </button>
                                }

                                {allowanceO < parseInt(opcoP) && !loading ?
                                    (<button
                                        onClick={ApproveO}
                                        className='w-full sm:w-auto bg-black text-white p-3 rounded my-1 sm:my-0'>
                                        <img src={opco} alt="opco" className="h-6 w-6 mr-2 inline" />
                                        {opcoP}
                                    </button>)
                                    : !loading ?
                                        (<button
                                            onClick={buyOpco}
                                            className='w-full sm:w-auto bg-black text-white p-3 rounded my-1 sm:my-0'>
                                            <img src={opco} alt="opco" className="h-6 w-6 mr-2 inline" />
                                            {opcoP}
                                        </button>) :

                                        (<button
                                            className='w-full sm:w-auto bg-black text-white p-3 rounded my-1 sm:my-0'>
                                            <img src={opco} alt="opco" className="h-6 w-6 mr-2 inline" />
                                            Loading...
                                        </button>)
                                }



                            </div>

                            {/* {isOwner ?
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
        } */}
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>

        </>
    )
}

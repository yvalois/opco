import React, { useState } from 'react';
import "../style/style_links.css";
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { AiFillDelete } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useEffect } from 'react';
import { addLink, deleteLink, getLinks, addCategory, deleteCategory, editCategory } from '../redux/api/apiActions';
import LoaderFullScreen from '../components/loaderFullScreen';
import logo from '../images/logo/logo.png';

export default function LinkAccess() {
    const dispatch = useDispatch();
    const blockchain = useSelector(state => state.blockchain);
    const api = useSelector(state => state.api);
    const minter = useSelector(state => state.minter);
    const { accountAddress } = blockchain;
    const { links, categories, linksLoaded, vipAccess } = api;
    const { mintContract, ifOwner, loading } = minter;

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editCategorytext, setEditCategorytext] = useState('');
    const [categorySelected, setCategorySelected] = useState('');
    const [linksFromCategory, setLinksFromCategory] = useState([]);

    useEffect(() => {
        if (accountAddress) {
            dispatch(getLinks(accountAddress));
        }
    }, [accountAddress, dispatch]);

    const DeleteLink = (link) => {
        if (ifOwner) {
            dispatch(deleteLink(link, accountAddress));
        }
        else {
            alert('error delete link');
        }
    }

    const addNewLink = () => {
        if (ifOwner) {
            if (url.includes('http://') || url.includes('https://')) {
                dispatch(addLink(name, url, description, accountAddress, categoryId));
            }
        } else {
            alert('error add link');
        }
    }

    const handleAddCategory = () => {
        if (ifOwner) {
            dispatch(addCategory(category, accountAddress));
        } else {
            alert('error add category');
        }
    }

    const handledeleteCategory = (category) => {
        //if category in use, don't delete
        if (links.some(link => link.category === category)) {
            alert('category in use');
        }
        else {
            if (ifOwner) {
                dispatch(deleteCategory(category, accountAddress));
            } else {
                alert('error delete category');
            }
        }
    }

    const handleEditCategory = (category) => {
        if (ifOwner) {
            dispatch(editCategory(category, editCategorytext, accountAddress));
            setEditMode(false);

        } else {
            alert('error edit category');
        }
    }

    useEffect(() => {
        if (categorySelected !== '') {
            setLinksFromCategory(links.filter(link => link.category === categorySelected));
        } else {
            setLinksFromCategory(links);
        }
    }, [categorySelected, links]);

    const handleCategorySelect = (category) => {
        setCategorySelected(category);
    }

    const resetCategorySelect = () => {
        setCategorySelected('');
    }



    console.log("api", api);

    return (
        <>

            <LoaderFullScreen isLoading={loading} />


            <div className="w-full h-full overflow-auto">

                {<div className='md:ml-4 bg-white w-auto h-full flex justify-center p-4 rounded-lg'>

                    {
                        linksLoaded ?
                            vipAccess ?
                                <>
                                    <div className='w-full h-full flex flex-col justify-center md:flex-row md:justify-center'>

                                        {categories.length > 0 ?
                                            <div className='bg-yellow-300 p-4 md:p-0 rounded-2xl overflow-hidden relative w-[300px] h-[65vh] shadow-lg border-b-4 mr-8'>

                                                <div className='w-full h-full'>

                                                    <ul className='w-full h-full flex flex-col justify-between items-center p-8'>

                                                        {categories.map((category, index) => (
                                                            <li
                                                                onClick={() => handleCategorySelect(category._id)}
                                                                key={index}
                                                                className='flex flex-col justify-center items-center bg-white p-2 rounded-lg m-2 shadow-md w-[200px]'>
                                                                <h5>
                                                                    {editMode ?
                                                                        <input type='text' className='w-full border-2 border-yellow-300 rounded p-10' value={editCategorytext} onChange={(e) => setEditCategorytext(e.target.value)} />
                                                                        :
                                                                        category.name}
                                                                </h5>
                                                                <div className='w-full flex justify-center  text-md space-x-1 '>
                                                                    {ifOwner & editMode === false ?
                                                                        <BiEditAlt className='text-[#238e17] cursor-pointer text-xl'
                                                                            onClick={() => { setEditMode(true); setEditCategorytext(category.name) }} />
                                                                        : null}
                                                                    {ifOwner & editMode === false ? <ImCancelCircle className='text-red-600 cursor-pointer text-xl'
                                                                        onClick={() => { setEditMode(false); setEditCategorytext('') }}
                                                                    /> : null}

                                                                    {ifOwner & editMode === false ?
                                                                        <AiFillDelete className='text-red-600 cursor-pointer text-xl'
                                                                            onClick={() => handledeleteCategory(category._id)}
                                                                        /> : null}
                                                                    {ifOwner & editMode === true ?
                                                                        <AiFillCheckCircle
                                                                            className='text-[#238e17] cursor-pointer text-xl'
                                                                            onClick={() => handleEditCategory(category._id)}
                                                                        /> : null}

                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>



                                            :
                                            <div className='w-full h-full flex-col justify-center items-center'>
                                                <div className='self-center w-[300px] h-[200px] bg-yellow-300 flex flex-col justify-center items-center rounded-2xl text-black font-extrabold p-4'>
                                                    <h5>No hay categorias</h5>
                                                </div>
                                            </div>

                                        }


                                        {
                                            links.length > 0 ?
                                                <div className='rounded-lg overflow-hidden h-[65vh] w-[300px] shadow-xl p-4  bg-white '>
                                                    <h2 className='text-2xl font-semibold text-gray-900  mb-4'>Enlaces de la categoría</h2>
                                                    {linksFromCategory.map((link, index) => (
                                                        <div className='flex justify-between items-start border-b-2 border-gray-200 py-4' key={index}>
                                                            <div>
                                                                <a href={link.link} target="_blank" rel="noopener noreferrer" className='text-black dark:text-gray-200 hover:text-gray-400 dark:hover:text-white transition-colors duration-200 ease-in-out no-underline'>
                                                                    <h4 className='font-bold mb-1'>{link.name}</h4>
                                                                    <p className='text-sm text-gray-500 dark:text-gray-300'>{link.description}</p>
                                                                </a>
                                                            </div>
                                                            {ifOwner &&
                                                                <button className='text-red-600 hover:text-red-800 transition-colors duration-200 ease-in-out' onClick={() => DeleteLink(link._id)}>
                                                                    <AiFillDelete className='text-2xl' />
                                                                </button>}
                                                        </div>
                                                    ))}
                                                </div>



                                                :
                                                <div className='w-full h-full flex justify-center items-center'>
                                                    <div className='w-[300px] h-[200px] bg-yellow-300 flex flex-col justify-center items-center rounded-2xl text-black font-extrabold p-4'>
                                                        <p>No tienes acceso VIP</p>
                                                        <p>Solo puedes acceder si tienes tu NFT Open Coffee</p>
                                                    </div>
                                                </div>
                                        }

                                    </div>

                                </>
                                :
                                <div className='w-full h-full flex justify-center items-center'>
                                    <div className='w-[300px] h-[200px] bg-yellow-300 flex flex-col justify-center items-center rounded-2xl text-black font-extrabold p-4'>
                                        <p>No tienes acceso VIP</p>
                                        <p>Solo puedes acceder si tienes tu NFT Open Coffee</p>
                                    </div>
                                </div>
                            :

                            <div className='w-full h-full flex justify-center items-center '>
                                <button className=" w-[200px] h-auto text-lg px-4 py-2 text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-orange-500 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2">Conectar wallet</button>
                            </div>
                    }

                    {ifOwner &&
                    <div className='bg-gray-400 w-full h-full p-8 rounded-lg flex flex-col justify-center'>

                        <div className='w-full flex flex-col justify-center items-center text-center'>
                            <h2 >Crear categorias</h2>
                            <div className="font-md">

                                <input
                                    type="text"
                                    placeholder="Nombre de la categoria"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className='w-auto sm:w-[200px] h-[40px] border-none rounded-md mr-[8px] p-2'
                                />
                                <button className='border-none bg-black text-white p-2 rounded-lg h-[40px] w-[70px]  cursor-pointer' onClick={() => handleAddCategory()}>Crear</button>
                            </div>
                        </div>

                        <div className='w-full flex justify-center mt-2'>
                            <h2>Crear enlaces</h2>
                        </div>
                        <div className='w-full flex  flex-col justify-center items-center mt-2'>
                            <div>

                                <input
                                    type="text"
                                    placeholder="nombre: mi curso"

                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='sm:w-[400px] h-[40px] border-none rounded-md mr-[8px] p-2'

                                />
                            </div>
                            <div>
                                <select
                                    className='sm:w-[400px] h-[40px] border-none rounded-md mr-[8px] p-2 mt-2'
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">Selecciona una categoria</option>
                                    {categories.length > 0 ?
                                        categories.map((category, index) => {
                                            return <option key={index} value={category._id}>{category.name}</option>
                                        }
                                        )
                                        :
                                        <option value="">No hay categorias</option>
                                    }
                                </select>
                            </div>
                            <div>

                                <input
                                    type="text"
                                    placeholder="https://www.opencoffee.org/mi-curso"
                                    className="sm:w-[400px] h-[40px] border-none rounded-md mr-[8px] p-2 mt-2"
                                    id="link"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text-area"
                                    placeholder="descripcion este enlace es un curso de open coffee"
                                    className="sm:w-[400px] h-[40px] border-none rounded-md mr-[8px] p-2 mt-2"
                                    id="descripcion"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='w-full flex justify-center mt-2'>
                            <button
                                onClick={addNewLink}
                                className='border-none bg-black text-white p-2 rounded-lg h-[40px] w-[70px]  cursor-pointer'
                            >Crear</button>
                        </div>
                    </div>
                }
                </div>}






            </div>


        </>




    )
}

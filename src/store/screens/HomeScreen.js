import './HomeScreen.css';
import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';


// Components
import Product from '../components/Product';


const HomeScreen = () => {


  const getProducts = useSelector(state => state.product)
  const state = useSelector(state => state)
  const { tokenPrice } = useSelector(state => state.tokenPrice)





  const { products, loading, error, initialLoad } = getProducts
  {/*Borrar*/ }
  const pruebita = [
    {
      name: "Cafe",
      description: "Cafecito molido",
      price: 1000,
      tokenPrice: 300,
      imageUrl: {
        url: "https://previews.123rf.com/images/likstudio/likstudio1402/likstudio140200038/26576545-los-granos-de-caf%C3%A9-derramado-de-la-bolsa-caf%C3%A9-molido-en-un-plato-cuchara-corazoncito-y-molinillo.jpg"
      },
      productId: 1
    },
    {
      name: "Cafe",
      description: "Cafecito molido",
      price: 1000,
      tokenPrice: 300,
      imageUrl: {
        url: "https://previews.123rf.com/images/likstudio/likstudio1402/likstudio140200038/26576545-los-granos-de-caf%C3%A9-derramado-de-la-bolsa-caf%C3%A9-molido-en-un-plato-cuchara-corazoncito-y-molinillo.jpg"
      },
      productId: 1
    },
    {
      name: "Cafe",
      description: "Cafecito molido",
      price: 1000,
      tokenPrice: 300,
      imageUrl: {
        url: "https://previews.123rf.com/images/likstudio/likstudio1402/likstudio140200038/26576545-los-granos-de-caf%C3%A9-derramado-de-la-bolsa-caf%C3%A9-molido-en-un-plato-cuchara-corazoncito-y-molinillo.jpg"
      },
      productId: 1
    },
    {
      name: "Cafe",
      description: "Cafecito molido",
      price: 1000,
      tokenPrice: 300,
      imageUrl: {
        url: "https://previews.123rf.com/images/likstudio/likstudio1402/likstudio140200038/26576545-los-granos-de-caf%C3%A9-derramado-de-la-bolsa-caf%C3%A9-molido-en-un-plato-cuchara-corazoncito-y-molinillo.jpg"
      },
      productId: 1
    },
    {
      name: "Cafe",
      description: "Cafecito molido",
      price: 1000,
      tokenPrice: 300,
      imageUrl: {
        url: "https://previews.123rf.com/images/likstudio/likstudio1402/likstudio140200038/26576545-los-granos-de-caf%C3%A9-derramado-de-la-bolsa-caf%C3%A9-molido-en-un-plato-cuchara-corazoncito-y-molinillo.jpg"
      },
      productId: 1
    },
    {
      name: "Cafe",
      description: "Cafecito molido",
      price: 1000,
      tokenPrice: 300,
      imageUrl: {
        url: "https://previews.123rf.com/images/likstudio/likstudio1402/likstudio140200038/26576545-los-granos-de-caf%C3%A9-derramado-de-la-bolsa-caf%C3%A9-molido-en-un-plato-cuchara-corazoncito-y-molinillo.jpg"
      },
      productId: 1
    }, {
      name: "Cafe",
      description: "Cafecito molido",
      price: 1000,
      tokenPrice: 300,
      imageUrl: {
        url: "https://previews.123rf.com/images/likstudio/likstudio1402/likstudio140200038/26576545-los-granos-de-caf%C3%A9-derramado-de-la-bolsa-caf%C3%A9-molido-en-un-plato-cuchara-corazoncito-y-molinillo.jpg"
      },
      productId: 1
    },
    {
      name: "Cafe",
      description: "Cafecito molido",
      price: 1000,
      tokenPrice: 300,
      imageUrl: {
        url: "https://previews.123rf.com/images/likstudio/likstudio1402/likstudio140200038/26576545-los-granos-de-caf%C3%A9-derramado-de-la-bolsa-caf%C3%A9-molido-en-un-plato-cuchara-corazoncito-y-molinillo.jpg"
      },
      productId: 1
    },
    {
      name: "Cafe",
      description: "Cafecito molido",
      price: 1000,
      tokenPrice: 300,
      imageUrl: {
        url: "https://previews.123rf.com/images/likstudio/likstudio1402/likstudio140200038/26576545-los-granos-de-caf%C3%A9-derramado-de-la-bolsa-caf%C3%A9-molido-en-un-plato-cuchara-corazoncito-y-molinillo.jpg"
      },
      productId: 1
    },


  ]

  const [filterSearch, setFilterSearch] = useState('')
  const [loadedProducts, setLoadedProducts] = useState(products)

  const filter = () => {
    const filteredProducts = products.filter(product => {
      return product.name.toLowerCase().includes(filterSearch.toLowerCase())
    })
    if (filterSearch === '' || filterSearch === null || filterSearch === undefined || filterSearch === ' ') {
      setLoadedProducts(products)
    } else {
      setLoadedProducts(filteredProducts)
    }
  }

  useEffect(() => {
    filter()
  }, [filterSearch, initialLoad])

  const tokenPriceInDolar = (price) => {
    return (price / tokenPrice).toFixed(2)
  }


  return (

    <div className="w-full h-full m-auto">

      <div className='mt-[30px] mb-[30px] flex justify-center'>
        <input
          type="text"
          className=' w-4/12 rounded-xl text-md px-2 py-1 bg-gray-200 '
          placeholder="Buscar"
          value={filterSearch}
          onChange={(e) => {
            setFilterSearch(e.target.value)
          }}
        />
      </div>
      {/*Pasar a true error*/}
      {/* Descomentar */}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="w-full grid gap-3 xxs:grid-cols-1  sm:grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 3xl:grid-cols-5">

          {loadedProducts.map((product, index) => (
            <Product
              key={index}
              name={product.name}
              description={product.description}
              price={product.price}
              tokenPrice={tokenPriceInDolar(product.price)}
              imageUrl={product.imageUrl.url}
              productId={product._id}

            />
          ))}
        </div>
      )}
      {/*Acomodar*/}


    </div>

  )
}

export default HomeScreen

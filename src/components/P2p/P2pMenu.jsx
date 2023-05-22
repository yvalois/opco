import React from 'react'

export const P2pMenu = ({priceFilter, setPriceFilter, minFilter, setMinFilter, order, setOrder}) => {
    return (
<div className='flex flex-col md:flex-row sm:h-auto md:h-[70px] border-b-2 shadow-md bg-white p-4 gap-4'>
  <div className="flex flex-col md:flex-row items-start justify-center md:items-center gap-4 w-full">
    <div className='flex items-center gap-2 w-full md:w-auto'>
      <span>Precio:</span>
      <input className='w-full md:w-[120px] h-10 md:h-[40px] rounded-md border-2 border-gray-200 p-2 text-lg' type='number' value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
    </div>
    <div className='flex items-center gap-2 w-full md:w-auto'>
      <span>Minimo:</span>
      <input className='w-full md:w-[120px] h-10 md:h-[40px] rounded-md border-2 border-gray-200 p-2 text-lg' type='number' value={minFilter} onChange={(e) => setMinFilter(e.target.value)} />
    </div>
    <div className='flex items-center gap-2 w-full md:w-auto'>
      <span>Orden:</span>
      <select className='w-full md:w-[180px] h-10 md:h-[40px] rounded-md border-2 border-gray-200 p-2 text-lg' value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="">Select...</option>
        <option value="minPrice">Menor Precio</option>
        <option value="maxPrice">Mayor Precio</option>
        <option value="minAmount">Menor Minimo</option>
        <option value="maxAmount">Mayor Minimo</option>
      </select>
    </div>
    <button className='mt-4 md:mt-0 md:ml-auto bg-black px-4 py-2 text-white rounded-lg flex self-center md:mb-6'>Historial</button>
  </div>
</div>



    )
}

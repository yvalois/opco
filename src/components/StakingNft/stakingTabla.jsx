import React, {useState} from 'react';

const Table = ({ data, modalManage }) => {

    const callFunction =(id)=>{
        modalManage(id)
    }
    
    return (<>
<div className="w-4/5 h-full overflow-hidden">
  <div className="overflow-y-auto h-[800px] ">
    <table className="w-full h-1/2 divide-y divide-gray-200 ">
      <thead className="bg-gray-50 sticky top-0  ">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TokenId</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiempo restante</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acumulado</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Botón Claim rewards</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Botón Withdraw</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.TokenId}>
            <td className="px-6 py-4 whitespace-normal">{item.TokenId}</td>
            <td className="px-6 py-4 whitespace-normal">{item.TiempoRestante}</td>
            <td className="px-6 py-4 whitespace-normal">{item.Acumulado}</td>
            <td className="px-6 py-4 whitespace-normal">
              <button className="px-4 py-2 text-sm font-bold text-black  bg-yellow-300 rounded-md">
                Claim rewards
              </button>
            </td>
            <td className="px-6 py-4 whitespace-normal">
              <button className="px-4 py-2 text-sm font-bold text-white bg-gray-700 rounded-md" onClick={() => callFunction(item.TokenId)} >
                Withdraw
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


</>


    );
};

export default Table;

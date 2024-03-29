import { NavLink } from "react-router-dom"


export default function AdminSidebar() {
    const items = [
        <NavLink to='admin-exchange'><button>EXCHANGE</button></NavLink>,
        <NavLink to='admin-rewards'><button>RECOMPENSA</button></NavLink>,  
        <NavLink to='admin-store'><button>TIENDA</button></NavLink>,  
      
    ]
    return (
        <div className="mt-8">
            <div className="sideBar-admin-tittle">
                Contratos
            </div>
            <div className="w-full h-auto ">
                {items.map((item, index)=>(
                    <div className="admin-sidebar-option" key={index}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}
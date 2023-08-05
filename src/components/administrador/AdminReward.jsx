import { Row, Col } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

export default function AdminReward() {
    return (
        <div>
            <div className="Admin-exchange-tittle">
                Adminstrador Staking
            </div>
            <div className="admin-menu-options d-flex justify-content-between gap-1 mb-3">
                <NavLink to='/administrador/admin-rewards/newpool'>
                <div className=" w-100 text-center addmin-staking-access py-2">
                    Nueva Pool
                </div>
                </NavLink>
                <NavLink to='/administrador/admin-rewards/existingpool'>
                <div className=" w-100 text-center py-2 addmin-staking-access">
                    Editar Pools
                </div>
                </NavLink>
                <NavLink to='/administrador/admin-rewards/data'>
                <div className=" w-100 text-center py-2 addmin-staking-access">
                    Data
                </div>
                </NavLink>
            </div>
            <div>
                <Outlet />
            </div>

        </div>
    )
}
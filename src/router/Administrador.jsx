import { Row, Col, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/administrador/AdminSidebar";
import "../style/style_administrador.css";
export default function Administrador (){
    return (
        <div className="retire-container">
            <Row className="h-100">
                <Col  sm={2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col>
                <Col  sm={10} className='border'>
                    <Outlet/>
                </Col>
            </Row>
        </div>
    )
}
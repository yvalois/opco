import React from "react";
import { Col, Row } from "react-bootstrap";
import "./OrderConfirmation.css";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmation({ order, email }) {
    const navigate = useNavigate();

     const {Address, cartItems, total, tokenUsed, wallet, orderType, txHash} = order;
     const {fullName, address, country, city, zipCode, state, phone} = Address;

    return (
        <div className="order-confirmation">
            <div>
                <h3>Order Confirmation</h3>
            </div>
            <div>
                <Row className="confirmation-color1">
                    <Col>Name:</Col><Col>{fullName}</Col>
                </Row>
                <Row>
                    <Col>orderEmail:</Col><Col>{email}</Col>
                </Row>
                <Row
                    className="confirmation-color1">
                    <Col>Address:</Col><Col>{wallet}</Col>
                </Row>
                <Row>
                    <Col>Direction:</Col><Col>{
                        `${address}, ${city}, ${state}, ${zipCode}, ${country}`
                    }</Col>
                </Row>
                <Row
                    className="confirmation-color1">
                    <Col>tokenUsed:</Col><Col>{tokenUsed}</Col>
                </Row>
                <Row>
                    <Col>telefono:</Col><Col>{phone}</Col>
                </Row>
            </div>
            <div>
                <br />
                <div>productos</div>
                <div>
                    <Row
                    className="confirmation-color2">
                        <Col>#</Col><Col>Product</Col><Col>Price</Col><Col>Qty</Col>
                    </Row>
                     {cartItems.map((item, index) => (
                            <Row key={index}>
                                <Col>{index + 1}</Col>
                                <Col>{item.name}</Col>
                                <Col>{item.price}</Col>
                                <Col>{item.qty}</Col>
                            </Row>
                        ))} 
                    <Row>
                        <Col>total:</Col><Col>{total}</Col>
                    </Row>
                </div>
            </div>
            <div
                className="order-confirmation-footer"
            >
                <button
                    className="btn btn-success"
                    onClick={() => {
                        navigate("/store/orders");
                    }}
                >my orders</button>
                <button
                    className="btn btn-dark"
                    onClick={() => {
                        navigate("/store");
                    }}
                > Store  </button>
            </div>
        </div>
    )
}

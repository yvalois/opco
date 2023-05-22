import React from 'react'
import { Row, Col } from 'react-bootstrap'

const NewPool = () => {
    return (
        <>
            <Row>
                <Col className='border my-2'>
                    <p>APR</p>
                    <input type='number ' />
                </Col>
                <Col className='border my-2'>
                    <p>Maximo por Wallet</p>
                    <input type='number' />
                </Col>
                <Col className='border my-2'>
                    <p> Maximo por Pool</p>
                    <input type='number' />
                </Col>
            </Row>
            <Row>
                <Col className='border my-2'>
                    <p> Tiempo de bloqueo</p>
                    <input type='number' />
                </Col>
                <Col className='border my-2'>
                    <p>Tipo de Recompensa</p>
                    <select>
                        <option> Seleccionar</option>
                        <option> BUSD</option>
                        <option> OPCO</option>

                    </select>
                </Col>
                <Col className='border my-2'>
                    calculo de recompensa 
                </Col>
            </Row>
            <div>
                <button className='btn btn-dark'>Crear</button>
            </div>
        </>
    )
}

export default NewPool
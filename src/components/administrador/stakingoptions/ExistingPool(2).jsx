import React from 'react'
import {Row, Col} from 'react-bootstrap'
const ExistingPool = () => {
  return (
    <div className='container admin-staking-map'>
      <Row>
        <Col className='border-staking my-2'> 
        <div>Id:0</div>
        </Col>
        <Col className='border-staking my-2'>
          <div>APR: 30%</div>
          <input/><button>editar</button>
          </Col>
        <Col className='border-staking my-2'> 
        <div>max por wallet: 500/0</div>
        <input/><button>editar</button>
        </Col>
      </Row>
      <Row>
        <Col className='border-staking my-2'> 
        <div>max por pool: 500/0</div>
        <input/><button>editar</button>
        </Col>
        <Col className='border-staking my-2'>
           <div>Bloqueo: 30 dias</div>
           <input/><button>editar</button>
           </Col>
        <Col className='border-staking my-2'>
           <div>recompensa: BUSD</div>
           <input/><button>editar</button>
           </Col>
      </Row>
     
    </div>
  )
}

export default ExistingPool
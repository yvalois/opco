import "../style/style_maintenance.css"
import opco from "../images/logo/coffee.png"


const Maintenance = () => {
  return (
    <div className="banner2 burger  align-item-center parallax">
    <div className="staking d-flex justify-content-center align-items-center">
        <div className="maintenance text-center">
            <div>
           <h3>Plataforma en matenimiento</h3> 
            <p>
                Debido a interrupciones en la red, la plataforma se encuentra en mantenimiento. 
                </p>
            </div>
            <div className="maintenance-img-div">
                <img src={opco} alt='coffee'/>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Maintenance


import { useState } from "react"


const App = () => {
  const [value, setValue]= useState;

  const handleSubmit =(event) =>{
    event.preventDefault();
    //......
  }

  return (
    <div>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <label>
          pais:
          <input value={value} onChange={setValue(e.target.value)}/>
        </label>
        <input type="submit" value="Sunmit"/>
      </form>
    </div>
  )
}

export default App
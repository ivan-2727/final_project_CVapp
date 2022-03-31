import React, { useState } from 'react'
import CV from '../CV/CV'
import {Gallery} from '../Gallery/Gallery'
import './main.css'
const Main = () => {
  const[CVid, setCVid] = useState <string> ('');
  

  return (
    <div className='main'>
      <Gallery set={setCVid}/>
      {CVid.length > 0 ? <CV id={CVid} /> : null}
    </div>
)
}

export default Main
import React, { useState } from 'react'
import CV from '../CV/CV'
import {Gallery} from '../Gallery/Gallery'
const Main = () => {
  const[CVid, setCVid] = useState <string> ('');
  

  return (
    <div>
      <Gallery set={setCVid}/>
      {CVid.length > 0 ? <CV id={CVid} /> : null}
    </div>
)
}

export default Main
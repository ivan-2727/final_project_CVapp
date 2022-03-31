import React, { useState } from 'react'
import CV from '../CV/CV'
import {Gallery} from '../Gallery/Gallery'
import './main.css'

interface cvInterface {
  id: string,
  html: string
}

const Main = () => {

  const[cv, setCv] = useState <cvInterface> ({
    id: '',
    html: ''
  });
  

  return (
    <div className='main'>
      <Gallery set={setCv}/>
      {cv.id.length > 0 ? <CV html={cv.html} id={cv.id} /> : null}
    </div>
)
}

export default Main
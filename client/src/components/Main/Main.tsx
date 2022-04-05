import React, { useState } from 'react'
import CV from '../CV/CV'
import {Gallery} from '../Gallery/Gallery'
import './main.css'

interface cvInterface {
  id: string,
  html: string
}

interface templateInterface {
  tid: string,
}


const Main = () => {

  const[cv, setCv] = useState <cvInterface> ({
    id: '',
    html: ''
  });

  const[templateId, setTemplateId] = useState<templateInterface>({tid:''})
  

  return (
    <div className='main'>
      <Gallery set={setCv}/>
      {cv.id.length > 0 ? <CV html={cv.html} id={cv.id} set={setCv} templateId={templateId.tid} setTemplateId={setTemplateId}/> : null}
    </div>
)
}

export default Main
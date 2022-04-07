import React, { useEffect, useState } from 'react'
import CV from '../CV/CV'
import {Gallery} from '../Gallery/Gallery'
import UploadImage from '../UploadImage/UploadImage'
import './main.css'

interface cvInterface {
    id: string;
    html: string;
}

interface templateInterface {
  tid: string,
}


const Main = () => {

  const[cv, setCv] = useState <cvInterface> ({
    id: '',
    html: ''
  });


//   const[cv, setCv] = useState <cvInterface>(():any => {
//     const local = localStorage.getItem('cv_historyState')
//     if(local){
//         return local
//     }
//     return {
//       id: '',    
//       html: ''
//     }
// })

  const[templateId, setTemplateId] = useState<templateInterface>({tid:''})

  return (
    <div className='main'>
      <Gallery set={setCv}/>
      <UploadImage upload={setCv} cv={cv}/>
      {cv.id.length > 0 ? <CV html={cv.html} id={cv.id} set={setCv} templateId={templateId.tid} setTemplateId={setTemplateId}/> : null}
    </div>
)
}

export default Main
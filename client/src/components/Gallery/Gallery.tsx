import React, {useState, useEffect} from 'react'

interface imgInterface {
    img: string
}

const Gallery = () => {

    const [state, setState] = useState <imgInterface[]> ([]); 

    
    const fecter = async () => { 
    const data = await fetch(`http://localhost:8000/images`, {
    method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log("RES", res);
        setState(res);
    });
     // const json =s await data.json()
        // await setState(json)
        // console.log('state', state[0].img)
    }

    useEffect(() => {
        fecter();
    }, []); 


  return (
    <nav>
     <ul>
        <li>Templates</li>
        <li>Saved</li>
        <li>Favorites</li>
    </ul>
    
    <section>
        {state[0]? 
            state.map((e,i) => <img key={i} src={e.img} alt='no'></img>)
        : null}
    </section>
    </nav>
      )
}

export default Gallery

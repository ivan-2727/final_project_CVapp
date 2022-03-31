import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {favorite} from '../../slice/slice'
import { RootState } from '../../store/store';
import './gallery.css';

interface propsInterface {
    set: (id: string) => void,
}

interface imageInterface {
    id: string,
    img: string
}
interface stateInterface {
    images: imageInterface[]
    section: string,
    editor: boolean
}

const contains = (array : string[], item : imageInterface) => {

    for (let i = 0; i < array.length; i++) {
        console.log(array, 'array');
        console.log(item.id, 'item');
        if (array[i] === item.id ) return true;
    }
    return false;
}

export const Gallery = (props: propsInterface) => {

    const dispatch = useDispatch();

    const [state, setState] = useState <stateInterface> ({
        images: [],
        section: 'templates',
        editor: false
    }); 
        
    
    const fecter = async () => {
    fetch(`http://localhost:8000/images`, {
    method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log("RES", res);
        setState({
            images: res,
            section: state.section,
            editor: state.editor
        });
    })}

    useEffect(() => {
        fecter();
    }, []); 

    const addFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = (e.target as HTMLButtonElement).id; 
        dispatch(favorite(id));
    }


    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const favorites = useAppSelector((s) => s.state.favorites)
    console.log("FAVS", favorites)

  return (
    <nav>
     <ul>
        <li onClick={(e) => {
            setState({
                images: state.images,
                section: 'templates',
                editor: state.editor
            })
        }}>Templates</li>
        <li>Saved</li>
        <li onClick={(e) => {
            setState({
                images: state.images,
                section: 'favorites',
                editor: state.editor
            })
        }}>Favorites</li>
    </ul>
    
    <section className={state.editor? 'template--list__editor' : 'template--list'}>
        {
           state.section==='templates' && state.images.map((e) => {console.log(e.id); return <div className='template' key={e.id}><img className='template--images' src={e.img} alt='no' onClick={(event) => {
               props.set(e.id); 
               setState({images: state.images, section: state.section, editor: true});
               }}></img> <button className='template--button--fav' id={(e.id).toString()} onClick={addFavorites}>Fav</button></div>})
        }
        {
            state.section==='favorites' && state.images.map((image) => contains(favorites, image)? <img className='template--images' src={image.img} alt='no'></img> : null)
        }
    </section>
        
    </nav>
      )
}




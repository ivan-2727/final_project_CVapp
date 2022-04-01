import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {favorite, removeFavorite} from '../../slice/slice'
import { RootState } from '../../store/store';
import './gallery.css';

interface cvInterface {
    id: string,
    html: string
}

interface propsInterface {
    set: (cv: cvInterface) => void,
}

interface imageInterface {
    id: string,
    img: string,
    html: string
}
interface stateInterface {
    images: imageInterface[]
    section: string,
    editor: boolean,
    mouseover?: string
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

    const removeFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = (e.target as HTMLButtonElement).id; 

        dispatch(removeFavorite(id));
    }


    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const favorites = useAppSelector((s) => s.state.favorites)

  return (
    <nav>
     <ul className='menu'>
        <li onClick={(e) => {
            setState({
                images: state.images,
                section: 'templates',
                editor: state.editor
            })
        }} className='menu--element'>Templates</li>
        <li className='menu--element'>Saved</li>
        <li onClick={(e) => {
            setState({
                images: state.images,
                section: 'favorites',
                editor: state.editor
            })
        }} className='menu--element'>Favorites</li>
    </ul>
    
    <section className={state.editor? 'template--list__editor' : 'template--list'}>
        {
           state.section==='templates' && 
           state.images.map((e) => {
               return <div className='template' key={e.id}>
                   <img className='template--images' 
                   src={e.img} 
                   id={"img"+e.id}
                   alt='no' 
                   onClick={(event) => {
                   props.set({
                        id: e.id,
                        html: e.html
                    }); 
                    setState({images: state.images, section: state.section, editor: true});
                    }}
                    onMouseEnter={(event) => {
                        setState({...state, mouseover: (event.target as HTMLElement).id});
                    }}
                    onMouseLeave={(event) => {
                        setState({...state, mouseover: ''});
                        }}
                    ></img> 
                {state.mouseover === 'img'+e.id ? <span title="Add favorite" className='template--button--fav' 
                id={(e.id).toString()}
                onMouseEnter={(event) => {
                    
                    setState({...state, mouseover: 'img'+(event.target as HTMLElement).id});
                }} 
                onMouseLeave={(event) => {
                    setState({...state, mouseover: ''});
                    }}
                onClick={addFavorites}>
                   &#11088;
                </span> : null}
                </div>})
        }
        {
            state.section==='favorites' && state.images.map((image) => contains(favorites, image)? 
            <div className='template'>
            <img className='template--images' 
            id={"img"+image.id.toString()}
            src={image.img} 
            alt='no'
            onClick={(event) => {
                props.set({
                     id: image.id,
                     html: image.html
                 });
            setState({images: state.images, section: state.section, editor: true});
                }}
            onMouseEnter={(event) => {
                setState({...state, mouseover: (event.target as HTMLElement).id});
            }}
            onMouseLeave={(event) => {
                setState({...state, mouseover: ''});
                }}>
                
            </img>
            {state.mouseover === 'img'+image.id ? <span title="Remove from favorites" className='template--button__remove' 
                id={(image.id).toString()}
                onMouseEnter={(event) => {
                    
                    setState({...state, mouseover: 'img'+(event.target as HTMLElement).id});
                }} 
                onMouseLeave={(event) => {
                    setState({...state, mouseover: ''});
                    }}
                onClick={removeFavorites}>
                   &#10006;
                </span> : null} 
            </div>
            : null)
        }
    </section>
        
    </nav>
      )
}




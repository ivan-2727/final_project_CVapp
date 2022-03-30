import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {favorite} from '../../slice/slice'
import { RootState } from '../../store/store';

interface propsInterface {
    id: string
}

const CV = (props : propsInterface) => {


    const[save, setSave] = useState<string | null>(() => {
        const local = localStorage.getItem('historyState')
        if(local){
            return local
        }
        return ''
    })

    const fecter = async () => {
//        console.log('props', props)
        fetch(`http://localhost:8000/template/${props.id}`, {
       // fetch(`http://localhost:8000/template/0`, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            setSave(res)
        })}


    const addSection = (e : any) => {
        setSave(save+'<h1 contenteditable="true">Hello world</h1>');
    }

    const handleSave = (e:React.FocusEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.innerHTML)
        setSave(e.currentTarget.innerHTML);
    }
     
    useEffect(() => {
        fecter();
     }, [])

    useEffect(() => {
        localStorage.setItem("historyState", save ? save : '')
     }, [save])
     
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: save? save : '' }} onBlur={handleSave}></div>
            <button onClick={addSection}>add</button>
        </div>
    )
}

export default CV;
import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {favorite} from '../../slice/slice'
import { RootState } from '../../store/store';

import { Button } from '@progress/kendo-react-buttons'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf'

import './cv.css'

interface propsInterface {
    id: string
}

const CV = (props : propsInterface) => {
    const pdfExportComponent = useRef<any>(null)
    const contentArea = useRef<any>(null)

    const handleExportWithComponent = (e:any) => {
        pdfExportComponent.current.save();
    }

    const handleExportWithMethod = (e:any) => {
        savePDF(contentArea.current, { paperSize: 'A4' })
    }


    const[save, setSave] = useState<string>(() => {
        const local = localStorage.getItem('historyState_' + props.id)
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
        setSave(save+save);
    }

    const handleSave = (e:React.FocusEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.innerHTML)
        setSave(e.currentTarget.innerHTML);
    }
     
    useEffect(() => {
        fecter();
     }, [])

    useEffect(() => {
        localStorage.setItem("historyState_" + props.id, save ? save : '')
     }, [save])
     
    return (
        <div className='editor'>
            <PDFExport ref={pdfExportComponent} paperSize='A4'>
            <div ref={contentArea}>
            <article id={"id"+(props.id).toString()} contentEditable="true" className="template--wrapper" dangerouslySetInnerHTML={{ __html: save? save : '' }} onBlur={handleSave}></article>
            </div>
            <Button onClick={handleExportWithMethod}>Export as PDF</Button>
            </PDFExport>
            <button onClick={addSection}>add</button>
        </div>
    )
}

export default CV;
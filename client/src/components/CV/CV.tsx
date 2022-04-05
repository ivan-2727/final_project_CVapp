import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
// import {favorite} from '../../slice/slice'
import { RootState } from '../../store/store';

import { Button } from '@progress/kendo-react-buttons'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf'

import './cv.css'

interface setInterface { 
    html: string
    id: string
}

interface propsInterface { 
    html: string
    id: string
    set: (cv: setInterface) => void,
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
        const local = localStorage.getItem('historyState_'+props.id)
        if(local){
            return local
        }
        return props.html
    })

    const addSection = (e : any) => {
        props.set({
            id: props.id,
            html: props.html+props.html
        });
    }

    const handleSave = (e:React.FocusEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.innerHTML)
        setSave(e.currentTarget.innerHTML);
    }
     
    useEffect(() => {
        localStorage.setItem("historyState_"+props.id, save ? save : '')
     }, [save])
     
    return (
        <div className='editor'>
            <PDFExport ref={pdfExportComponent} paperSize='A4'>
            <div ref={contentArea}>
            <article id={"id"+(props.id).toString()} contentEditable="true" className="template--wrapper" dangerouslySetInnerHTML={{ __html: props.html ? props.html : '' }} onBlur={handleSave}></article>
            </div>
            <Button onClick={handleExportWithMethod} className='editor--button'>Export as PDF</Button>
            </PDFExport>
            {/* <button onClick={addSection}>add</button> */}
        </div>
    )
}

export default CV;
import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
// import {favorite} from '../../slice/slice'
import { RootState } from '../../store/store';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@progress/kendo-react-buttons'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf'

import './cv.css'
import { saveTemplate } from '../../slice/slice';

interface setInterface { 
    html: string
    id: string
}

interface propsInterface { 
    html: string
    id: string
    set: (cv: setInterface) => void,
    templateId: string,
    setTemplateId: any,
}
interface Iobjectsaved{
    uid: string,
    ogTempalte: string,
    tid: RegExpMatchArray | any, 
    html?: string
}

const CV = (props : propsInterface) => {
    const pdfExportComponent = useRef<any>(null)
    const contentArea = useRef<any>(null)

    const dispatch = useDispatch();

    const handleExportWithMethod = (e:any) => {
        savePDF(contentArea.current, { paperSize: 'A4' })
    }
    
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const uid = useAppSelector((s) => s.state.uid);

    const handleSaveDb = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('save.charAt(5)+save.charAt(6)', props.html.charAt(6)+props.html.charAt(7))
        const objSaved: Iobjectsaved = {uid: '', ogTempalte: '', tid: null, html: ''}
        if (props.html.charAt(6)+props.html.charAt(7) === "id") {
            objSaved.tid = /[^>]+?id="([^"]+)".*/.exec(props.html)
            objSaved.html = props.html
        } else {
            objSaved.tid = uuidv4(); 
            objSaved.html = props.html.slice(0, 5) + ` id="${objSaved.tid}"` + props.html.slice(5)
            console.log('objSaved.html', objSaved.html)
            props.set({id: props.id, html:objSaved.html})
            console.log('props.html', props.html)
        }
        objSaved.ogTempalte = props.id
        objSaved.uid = uid
        dispatch(saveTemplate(objSaved));
    }

    const handleSave = (e:React.FocusEvent<HTMLInputElement>) => {
        props.set({id: props.id, html: e.currentTarget.innerHTML});
    }
    
     
    return (
        <div className='editor'>
            <PDFExport ref={pdfExportComponent} paperSize='A4'>
            <div ref={contentArea}>
            <article id={"id"+(props.id).toString()} contentEditable="true" className="template--wrapper" dangerouslySetInnerHTML={{ __html: props.html ? props.html : '' }}  onBlur={handleSave}></article>
            </div>
            <Button onClick={handleExportWithMethod} className='editor--button'>Export as PDF</Button>
            <Button onClick={handleSaveDb} className='editor--button editor--button__save'>Save</Button>
            </PDFExport>
            {/* <button onClick={addSection}>add</button> */}
        </div>
    )
}

export default CV;

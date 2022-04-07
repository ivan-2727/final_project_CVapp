import { read } from 'fs';
import React, { useEffect, useState } from 'react'
import './UploadImage.css'

interface cvInterface {
    id: string,
    html: string
}

interface Ifunc {
    upload (arg: cvInterface): void,
    cv: cvInterface
}


{/* <div className='popup-box'>
        <div className='box'>
            CV is supposed to contain your photo. 
            <button onClick={(e) => {props.upload(false)}}>Close</button>      
        </div>
</div> */}

const UploadImage = (props : Ifunc) => {

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        if (event.target.files) {
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                if (reader.result) {
                    console.log(reader.result.toString());
                    props.upload({
                        id: props.cv.id,
                        html: props.cv.html.replace(/<img src="([^\"]*)"/, `<img src="${reader.result.toString()}"`)
                    });                 }
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            }
        }
    }
    return <div>
        <div>Upload your image</div> 
        <input type="file" onChange={handleFile}></input>
    </div>
}

export default UploadImage;
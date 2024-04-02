import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 white">
                {"This Magic Brain will detect faces in your pictures"}
            </p>
            <div className="center">
                <div className="center pa4 br3 form">
                    <input className="f4 pa2 w-70" type="text" onChange={onInputChange} />
                    <button className="w-20 grow f4 link ph3 pv2 dib bg-light" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm
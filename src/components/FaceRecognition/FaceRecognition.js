import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center">
            <img id='inputImage' alt='' src={imageUrl} width='420px' height='auto' />
            <div
                className="bounding-box"
                style={{
                    top: `${box.topRow}px`,
                    right: `${box.rightCol}px`,
                    bottom: `${box.bottomRow}px`,
                    left: `${box.leftCol}px`
                }}
            ></div>
        </div >
    )
}

export default FaceRecognition
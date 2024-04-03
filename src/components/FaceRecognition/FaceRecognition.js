import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center faceRecognition">
            <img id='inputImage' alt='' src={imageUrl} width='420px' height='auto' />
            <div
                className="bounding-box" style={{ left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow }}
            ></div>
        </div >
    )
}

export default FaceRecognition
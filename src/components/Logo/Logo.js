import React from "react"
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.svg';

const Logo = () => {
    return (
        <div className="ma4 mt0 w3">
            <Tilt className="Tilt br2 shadow-2">
                <div>
                    <h1><img alt="logo" src={brain} /></h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo

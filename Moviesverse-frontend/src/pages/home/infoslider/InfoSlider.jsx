import React, { useState } from 'react';
import first from '../../../../public/Welcome To MovieVerse.gif';
import second from '../../../../public/Welcome To MovieVerse1.gif';
import third from '../../../../public/Welcome To MovieVerse2.gif';
import four from '../../../../public/Welcome To MovieVerse3.gif';

import './style.css';

function InfoSlider() {

    const [first, setFirst] = useState(false);
    const [two, setTwo] = useState(true);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);


    return (
        <center>
            <h1 className='high'><b>MoviesVerse</b> Highlights</h1>
            <div className="container">
                <div className={`panel ${first ? "active" : ""}`} onClick={() => {
                    setFirst(true);
                    setTwo(false);
                    setThree(false);
                    setFour(false);
                }} >
                    <h1>Welcome To Our App</h1>
                </div>
                <div className={`panel ${two ? "active" : ""}`} onClick={() => {
                    setFirst(false);
                    setTwo(true);
                    setThree(false);
                    setFour(false);
                }}>
                    <h1>Find Your Entertainment</h1>
                </div>
                <div className={`panel ${three ? "active" : ""}`} onClick={() => {
                    setFirst(false);
                    setTwo(false);
                    setThree(true);
                    setFour(false);
                }}>
                    <h1>Discover Any Genres</h1>
                </div>
                <div className={`panel ${four ? "active" : ""}`} onClick={() => {
                    setFirst(false);
                    setTwo(false);
                    setThree(false);
                    setFour(true);
                }}>
                    <h1>Millions Of Data available</h1>
                </div>
            </div>
            <div className="infoline"></div>
        </center>
    )
}

export default InfoSlider
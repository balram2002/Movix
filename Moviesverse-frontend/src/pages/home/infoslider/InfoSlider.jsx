import React, { useState } from 'react';
import First from '../../../../public/Welcome To MovieVerse.gif';
import Second from '../../../../public/Welcome To MovieVerse1.gif';
import Third from '../../../../public/Welcome To MovieVerse2.gif';
import Four from '../../../../public/Welcome To MovieVerse3.gif';

import './style.css';
import Line from './../../../components/line/Line';

function InfoSlider() {

    const [first, setFirst] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(true);
    const [five, setFive] = useState(false);
    const [six, setSix] = useState(false);
    const [seven, setSeven] = useState(false);


    return (
        <center>
            <h1 className='high64576'><b>MoviesVerse</b> Highlights</h1>
            <section class="slider-container-hgytury">
                <div className="slider-images">
                    <div className={`slider-img ${first ? "active" : ""}`} onClick={() => {
                        setFirst(true);
                        setTwo(false);
                        setThree(false);
                        setFour(false);
                        setFive(false);
                        setSix(false);
                        setSeven(false);
                    }}>
                        <img src={First} alt="1" />
                        {/* <h1 className='h1head21'>Mo</h1> */}
                        <div class="details">
                            {/* <h2>Mike</h2> */}
                            <p className='p7676'>Welcome To Our App </p>
                        </div>
                    </div>
                    <div className={`slider-img ${two ? "active" : ""}`} onClick={() => {
                        setFirst(false);
                        setTwo(true);
                        setThree(false);
                        setFour(false);
                        setFive(false);
                        setSix(false);
                        setSeven(false);
                    }}>
                        <img src={Second} alt="2" />
                        {/* <h1 className='h1head21'>vi</h1> */}
                        <div class="details">
                            {/* <h2>samite</h2> */}
                            <p className='p7676'>Find Your Entertainment</p>
                        </div>
                    </div>
                    <div className={`slider-img ${three ? "active" : ""}`} onClick={() => {
                        setFirst(false);
                        setTwo(false);
                        setThree(true);
                        setFour(false);
                        setFive(false);
                        setSix(false);
                        setSeven(false);
                    }}>
                        <img src={Third} alt="3" />
                        {/* <h1 className='h1head21'>e</h1> */}
                        <div class="details">
                            {/* <h2>hashi</h2> */}
                            <p className='p7676'>Discover Any Genres</p>
                        </div>
                    </div>
                    <div className={`slider-img ${four ? "active" : ""}`} onClick={() => {
                        setFirst(false);
                        setTwo(false);
                        setThree(false);
                        setFour(true);
                        setFive(false);
                        setSix(false);
                        setSeven(false);
                    }}>
                        <img src={Four} alt="4" />
                        {/* <h1 className='h1head21'>s</h1> */}
                        <div class="details">
                            {/* <h2>kaity</h2> */}
                            <p className='p7676'>Millions Of Data available</p>
                        </div>
                    </div>
                    <div className={`slider-img ${five ? "active" : ""}`} onClick={() => {
                        setFirst(false);
                        setTwo(false);
                        setThree(false);
                        setFour(false);
                        setFive(true);
                        setSix(false);
                        setSeven(false);
                    }}>
                        <img src={First} alt="5" />
                        {/* <h1 className='h1head21'>V</h1> */}
                        <div class="details">
                            {/* <h2>lauren</h2> */}
                            <p className='p7676'>php Developer</p>
                        </div>
                    </div>
                    <div className={`slider-img ${six ? "active" : ""}`} onClick={() => {
                        setFirst(false);
                        setTwo(false);
                        setThree(false);
                        setFour(false);
                        setFive(false);
                        setSix(true);
                        setSeven(false);
                    }}>
                        <img src={Second} alt="6" />
                        {/* <h1 className='h1head21'>er</h1> */}
                        <div class="details">
                            {/* <h2>ryan</h2> */}
                            <p className='p7676'>seo Developer</p>
                        </div>
                    </div>
                    <div className={`slider-img ${seven ? "active" : ""}`} onClick={() => {
                        setFirst(false);
                        setTwo(false);
                        setThree(false);
                        setFour(false);
                        setFive(false);
                        setSix(false);
                        setSeven(true);
                    }}>
                        <img src={Third} alt="7" />
                        {/* <h1 className='h1head21'>se</h1> */}
                        <div class="details">
                            {/* <h2>dakes</h2> */}
                            <p className='p7676'>sql Developer</p>
                        </div>
                    </div>
                </div>
            </section>
            <Line />
        </center>
    )
}

export default InfoSlider
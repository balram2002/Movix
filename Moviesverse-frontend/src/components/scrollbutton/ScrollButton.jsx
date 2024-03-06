import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";

import "./style.scss";
import { useLocation } from 'react-router-dom';

const ScrollButton = () => {

    const handleup = () => {
        window.scrollTo(0, 0);
    };

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [location]);

    return (
        <>
            <div className={`scrollbtonn4525`}>
                <span className='spanscrollbutt'>
                    <FaRegArrowAltCircleUp className='upscrollbutt' onClick={handleup} />
                </span>
            </div>
        </>
    )
}

export default ScrollButton
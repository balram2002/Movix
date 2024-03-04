import React from 'react'
import { MdCancel } from "react-icons/md";


import "./style.scss";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Line from '../line/Line';

function Stream({ EndPoint, id, title }) {
    return (
        <div className="main-streamarea">
            <h1>Streaming {EndPoint} '{title}' </h1>
            <div className='stream-main'>
                {/* <ContentWrapper> */}
                <div className="stream-body">
                    <iframe src={`https://vidsrc.me/embed/${EndPoint}?tmdb=${id}`} className='iframe-stream' frameborder="0" referrerpolicy="origin" allowfullscreen></iframe>
                    {/* <MdCancel className='canhide' /> */}

                </div>
                {/* </ContentWrapper> */}
            </div>
            <Line />
        </div>
    )
}

export default Stream
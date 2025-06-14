import React, { useEffect, useState } from 'react'
import "./style.scss";
import "./stream.scss";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Line from '../line/Line';
import SwitchTabs from '../switchTabs/SwitchTabs';

function Stream({ EndPoint, id, title, season, episode }) {
    const [seasonNum, setSeasonNum] = useState(1);
    const [endpoint, setEndpoint] = useState("to");
    const [server, setServer] = useState("1");
    const [episodeNum, setEpisodeNum] = useState(1);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        setSeasonNum(season);
        setEpisodeNum(episode);
    }, [season, episode]);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, [window.innerWidth])

    const onTabChange = (tab) => {
        if (tab === "Server 2") {
            setEndpoint("xyz");
            setServer("2");
        }
        else if (tab === "Server 3") {
            setEndpoint("net");
            setServer("3");
        }
        else if (tab === "Server 4") {
            setEndpoint("in");
            setServer("4");
        }
        else if (tab === "Server 1") {
            setEndpoint("to");
            setServer("1");
        }
    };

    return (
        <>
            <ContentWrapper>
                <div className="linedivstream">
                    <div className="linestream"></div>
                </div>
                {width >= 560 && <div className="carouselSectionstream">
                    <ContentWrapper>
                        <span className="carouselTitle" onClick={() => setShow(true)}>Server:</span>
                        <SwitchTabs data={["Server 1", "Server 2", "Server 3", "Server 4"]} onTabChange={onTabChange} />
                    </ContentWrapper>
                </div>}
                <div className="main-streamarea">
                    <h1>Streaming {EndPoint} '{title}' on Server {server} </h1>
                    <div className='stream-main'>
                        <div className="stream-body">
                            <iframe src={`https://vidsrc.${endpoint}/embed/${EndPoint}/${id}${season && EndPoint === "tv" ? "/" + seasonNum + "/" + episodeNum : ""
                                }`} className='iframe-stream' frameborder="0" title="Movieverse video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>

                            </iframe>
                        </div>
                    </div>
                </div>

                {width <= 560 && <div className="mobseltabstream">
                    <div className="mobseltabitems">
                        <button className="butseltaba butseltab34" onClick={() => {
                            setEndpoint("to");
                            setServer("1");
                        }}> Server 1</button>
                        <button className="butseltabb butseltab34" onClick={() => {
                            setEndpoint("xyz");
                            setServer("2");
                        }}> Server 2</button>
                    </div>
                </div>}

                <div className="linedivstream">
                    <div className="linestream"></div>
                </div>

            </ContentWrapper>
            <div className='notplaystream342'>
                <span className="notplaystream34256">Video not coming ? Use VPN and enjoy!</span>
                <span className="notplaystream34256">Use desktop or pc for better Experience!</span>
            </div>
            {!season && <Line />}
        </>
    )
}

export default Stream
import React, { useEffect, useRef, useState } from 'react';
import "./style.scss";
import "./stream.scss";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Line from '../line/Line';
import SwitchTabs from '../switchTabs/SwitchTabs';

function StreamHere({ EndPoint, id, title, season, episode, show, setShow }) {
    const [seasonNum, setSeasonNum] = useState(1);
    const [endpoint, setEndpoint] = useState("to");
         const [lanEndpoint, setLanEndpoint] = useState(false);
    const [server, setServer] = useState("1");
    const [episodeNum, setEpisodeNum] = useState(1);
    const [width, setWidth] = useState(window.innerWidth);
    const scrollRef = useRef(null);

    useEffect(() => {
        setSeasonNum(season);
        setEpisodeNum(episode);
    }, [season, episode]);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [id, season, episode]);

    const onTabChange = (tab) => {
        if (tab === "Server 2") {
            setEndpoint("pm");
            setServer("2");
        } else if (tab === "Server 3") {
            setEndpoint("net");
            setServer("3");
        } else if (tab === "Server 4") {
            setEndpoint("vc");
            setServer("4");
        } else if (tab === "Server 1") {
            setEndpoint("xyz");
            setServer("1");
        }
    };
    const preurl = EndPoint === "tv" ? `https://vidify.top/embed/${EndPoint}/${id}/${seasonNum || 1}/${episodeNum || 1}` : `https://vidify.top/embed/movie/${id}`
    const url = lanEndpoint ? preurl :
    `https://vidsrc.${endpoint}/embed/${EndPoint}/${id}${season && EndPoint === "tv" ? "/" + seasonNum + "/" + episodeNum : ""}`;

    return (
        <>
            <div className="linedivstream" ref={scrollRef}>
                <div className="linestream"></div>
            </div>
            {width >= 560 && (
                <div className="carouselSectionstream">
                    <ContentWrapper>
                        <span className="carouselTitle">Server:</span>
                        <SwitchTabs data={["Server 1", "Server 2", "Server 3", "Server 4"]} onTabChange={onTabChange} />
                    </ContentWrapper>
                </div>
            )}
            <div className="main-streamarea">
               <ContentWrapper> <h1>Streaming {EndPoint} '{title}' on Server {server}</h1></ContentWrapper>
                <div className="stream-main">
                    <div className="stream-body">
                        <iframe
                            src={url}
                            className="iframe-stream"
                            frameBorder="0"
                            title="Movieverse video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {width <= 560 && (
                <div className="mobseltabstream">
                    <div className="mobseltabitems">
                        <button
                            className="butseltaba butseltab34"
                            onClick={() => {
                                setEndpoint("net");
                                setServer("1");
                                setLanEndpoint(false);
                            }}
                        >
                            Server 1
                        </button>
                        <button
                            className="butseltabb butseltab34"
                            onClick={() => {
                                setEndpoint("xyz");
                                setServer("2");
                                setLanEndpoint(false);
                            }}
                        >
                            Server 2
                        </button>
                        <button
                            className="butseltabb butseltab34" id='butseltab36'
                            onClick={() => {
                               setLanEndpoint(true);
                            }}
                        >
                            {'vidify(Hindi)'}
                        </button>
                    </div>
                </div>
            )}

            <div className="linedivstream">
                <div className="linestream"></div>
            </div>
            <div className="notplaystream342">
                <div>
                    <span className="notplaystream34256">Video not coming ? Use VPN and enjoy!</span>
                    <span className="notplaystream34256">Use desktop or pc for better Experience!</span>
                </div>
                <div>
                    <button className="btn-31" onClick={()=>setShow(false)}>
                        <span className="text-container">
                            <span className="text">Close</span>
                        </span>
                    </button>
                </div>
            </div>
            {!season && <Line />}
            {show && <Line />}
        </>
    );
}

export default StreamHere;

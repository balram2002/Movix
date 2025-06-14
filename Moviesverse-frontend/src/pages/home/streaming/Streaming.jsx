import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import nt from "../../../../public/images/netflixtitle.png";
import pvt from "../../../../public/images/Amazon Prime Video.png";
import nbg from "../../../../public/videos/netflix bg.mp4";
import pvbg from "../../../../public/videos/primevideo bg.mp4";
import mt from "../../../../public/images/marveltitle.png";
import dt from "../../../../public/images/dctitle.png";
import mbg from "../../../../public/videos/marvelbg.mp4";
import dbg from "../../../../public/videos/dcbg.mp4";
import at from "../../../../public/images/applet.png";
import abg from "../../../../public/videos/applebg.mp4";

import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import './style.css';
import SeeMore from "../../../components/seemore/SeeMore";

const Netflix = () => {
    const [show, setShow] = useState(false);



    const [endpoint, setEndpoint] = useState("with_networks");
    const [number, setNumber] = useState(213);
    const [active, setActive] = useState("NetFlix Originals");
    const [media, setMedia] = useState("tv");
    const [marvel, setMarvel] = useState(false);
    const { data, loading } = useFetch(`/discover/${media}?${endpoint}=${number}`);

    const onTabChange = (tab) => {
        setMedia(tab === "Movie" ? "movie" : "tv");
    };

    const title = active + " " + media + " List";


    return (
        <>
            <div className="contain">
                <div className="headingt">
                    <center><h1><b>Streaming</b> Platforms</h1></center>
                </div>
                <div className="logos-streaming">
                    <div className="logo-item" onClick={() => {
                        setEndpoint("with_networks");
                        setNumber(213);
                        setActive("Netflix Originals");
                        setMarvel(false);
                    }}>
                        <img className="img" src={nt} alt="" />
                        <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                            <source src={nbg} type="video/mp4" />
                        </video>
                    </div>
                    <div className="logo-item" onClick={() => {
                        setEndpoint("with_networks");
                        setNumber(1028);
                        setActive("Prime Video Originals");
                        setMarvel(false);
                    }}>
                        <img className="img" src={pvt} alt="" />
                        <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                            <source src={pvbg} type="video/mp4" />
                        </video>
                    </div>
                    <div className="logo-item" onClick={() => {
                        setEndpoint("with_companies");
                        setNumber(420);
                        setActive("Marvel Universe");
                        setMarvel(true);
                    }}>
                        <img className="img" src={mt} alt="" />
                        <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                            <source src={mbg} type="video/mp4" />
                        </video>
                    </div>
                    <div className="logo-item" onClick={() => {
                        setEndpoint("with_companies");
                        setNumber(128064);
                        setActive("DC Universe Originals");
                        setMedia("movie");
                        setMarvel(false);
                    }}>
                        <img className="img" id="d" src={dt} alt="" />
                        <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                            <source src={dbg} type="video/mp4" />
                        </video>
                    </div>
                    <div className="logo-item" onClick={() => {
                        setEndpoint("with_companies");
                        setNumber(2552);
                        setActive("Apple TV Originals");
                        setMedia("movie");
                        setMarvel(false);
                    }}>
                        <img className="img" id="d" src={at} alt="" />
                        <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                            <source src={abg} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className="carouselSection">
                    <ContentWrapper>
                        <span className="carouselTitle" onClick={() => setShow(true)}>{active}</span>
                        {
                            marvel && <SwitchTabs data={["TV", "Movie"]} onTabChange={onTabChange} />
                        }

                    </ContentWrapper>
                    <Carousel data={data?.results} loading={loading} endpoint={media} />
                </div>
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title={title}
                data={data?.results}
                loading={loading}
                endpoint={media}
            />
        </>
    );
};

export default Netflix;

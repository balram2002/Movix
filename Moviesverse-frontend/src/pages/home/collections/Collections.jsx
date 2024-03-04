import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import nt from "../../../../public/images/at.png";
import pvt from "../../../../public/images/faft.png";
import nbg from "../../../../public/videos/marvelbg.mp4";
import pvbg from "../../../../public/videos/fafbg.mp4";
import mt from "../../../../public/images/hpt.png";
import dt from "../../../../public/images/mit.png";
import mbg from "../../../../public/videos/hpbg.mp4";
import dbg from "../../../../public/videos/mibg.mp4";
import at from "../../../../public/images/avatart.png";
import abg from "../../../../public/videos/abg.mp4";
import collt from "../../../../public/images/Collectionst.png";

import './style.css';

const Collections = () => {


    const [number, setNumber] = useState(86311);
    const [active, setActive] = useState("Avengers");
    const { data, loading } = useFetch(`/collection/${number}`);

    return (
        <div className="contain">
            <div className="headingt">
                <center>   <img src={collt} alt="" />
                </center>
            </div>
            <div className="logos">
                <div className="logo-item" onClick={() => {
                    setNumber(86311);
                    setActive("Avengers");
                }}>
                    <img className="img" src={nt} alt="" />
                    <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                        <source src={nbg} type="video/mp4" />
                    </video>
                </div>
                <div className="logo-item" onClick={() => {
                    setNumber(9485);
                    setActive("Fast And Furious");
                }}>
                    <img className="img" src={pvt} alt="" />
                    <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                        <source src={pvbg} type="video/mp4" />
                    </video>
                </div>
                <div className="logo-item" onClick={() => {
                    setNumber(1241);
                    setActive("Harry Potter");
                }}>
                    <img className="img" src={mt} alt="" />
                    <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                        <source src={mbg} type="video/mp4" />
                    </video>
                </div>
                <div className="logo-item" onClick={() => {
                    setNumber(87359);
                    setActive("Mission Impossible");
                }}>
                    <img className="img" id="d" src={dt} alt="" />
                    <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                        <source src={dbg} type="video/mp4" />
                    </video>
                </div>
                <div className="logo-item" onClick={() => {
                    setNumber(87096);
                    setActive("Avatar");
                }}>
                    <img className="img" id="d" src={at} alt="" />
                    <video className="video" autoPlay={true} loop={true} playsInline={true} muted>
                        <source src={abg} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle">'{active}' Movie Collection</span>

                </ContentWrapper>
                <Carousel data={data?.parts} loading={loading} endpoint="movie" />
            </div>
        </div>
    );
};

export default Collections;

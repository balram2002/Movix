import React, { useContext, useRef, useState } from "react";

import "./style.scss";
import { useSelector } from "react-redux";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import { PlayIcon } from "../../pages/details/Playbtn";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import StreamHere from "../stream/StreamHere";
import Line from "../line/Line";
import { useNavigate } from "react-router-dom";
import { ValuesContext } from "../../context/ValuesContext";

const VideosSection2 = ({ data, loading, title, mediaType, id, name }) => {

    const { url } = useSelector((state) => state.home);
     const { setEpisode : setEps, setSeason: setSeas } = useContext(ValuesContext);
    const navigate = useNavigate();
    const [stream, setStream] = useState(false);
    const [episode, setEpisode] = useState(1);
    const [season, setSeason] = useState(1);
    const [titlestr, setTitle] = useState("");
    const [openstream, setOpenstream] = useState(false);
    const carouselContainer = useRef();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const conatainerHalfWidth = (container.offsetWidth / 2) + 50;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth - conatainerHalfWidth)
                : container.scrollLeft + (container.offsetWidth - conatainerHalfWidth);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const handleEpisodeClick = (item) => {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            setSeason(item?.season_number);
            setEpisode(item?.episode_number);
            setTitle(`${name} season ${season} Episode ${episode}`);
            setOpenstream(true);
            setStream(true);
            console.log("Mobile device detected");
        } else {
            setEps(item?.episode_number);
            setSeas(item?.season_number);
            navigate(`/stream/${data?.endpoint || mediaType}/${id}${mediaType === 'tv' ? `/${item?.season_number}/${item?.episode_number}` : '/0/0'}`)
            console.log("Desktop device detected");
        }
        console.log("Episode clicked:", item);
    };


    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <>
            <div className="videosSection">
                <ContentWrapper>
                    <div className="sectionHeading">{title}</div>
                    <BsFillArrowLeftCircleFill
                        className="carouselLeftNavvideoa arrow46videoa"
                        style={{ top: stream ? "39%" : "38%" }}
                        onClick={() => navigation("left")}
                    />
                    <BsFillArrowRightCircleFill
                        className="carouselRighttNavvideoa arrow46videoa"
                        style={{ top: stream ? "39%" : "38%" }}
                        onClick={() => navigation("right")}
                    />
                    {!loading ? (
                        <div className="videos" ref={carouselContainer}>
                            {data?.episodes?.map((item) => (
                                <div
                                    className="videoItem"
                                    key={item.id}
                                    onClick={() => { handleEpisodeClick(item) }}
                                >
                                    <div className="videoThumbnail">
                                        <Img
                                            src={url.poster + item.still_path}
                                        />
                                        <PlayIcon />
                                    </div>
                                    <div className="videoTitle"><b>Episode Number:</b> {item.episode_number}</div>
                                    <div className="videoTitle"><b>Episode Name:</b> {item.name}</div>
                                    <div className="videoTitle"><b>Episode Air Date:</b>  {dayjs(
                                        item.air_date
                                    ).format("MMM D, YYYY")}</div>
                                    <div className="videoTitle"><b>Episode Runtime:</b> {item.runtime}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="videoSkeleton">
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                        </div>
                    )}
                </ContentWrapper>
            </div>
            {!stream && <Line />}
            {stream && <StreamHere EndPoint={mediaType} id={id} title={" " + title + ' Episode ' + episode + " "} season={season} episode={episode} show={stream} setShow={setStream} />}
        </>
    );
};

export default VideosSection2;

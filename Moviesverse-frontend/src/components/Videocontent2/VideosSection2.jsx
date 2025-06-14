import React, { useRef, useState } from "react";

import "./style.scss";
import { useSelector } from "react-redux";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import Stream from "../stream/Stream";
import { PlayIcon } from "../../pages/details/Playbtn";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const VideosSection2 = ({ data, loading, title, mediaType, id, name }) => {

    const { url } = useSelector((state) => state.home);
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
        setSeason(item?.season_number);
        setEpisode(item?.episode_number);
        setTitle(`${name} season ${season} Episode ${episode}`);
        setOpenstream(!openstream);
        setStream(!stream);
        if (openstream) {
            toast.info("Video Space closed!")
        } else {
            toast.info("Scroll down to watch online!");
        }
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
                {stream && <Stream EndPoint={mediaType} id={id} title={titlestr} season={season} episode={episode} />}
            </div>
        </>
    );
};

export default VideosSection2;

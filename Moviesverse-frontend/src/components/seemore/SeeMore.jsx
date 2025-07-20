import React, { useEffect, useState } from "react";

import "./style.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import dayjs from "dayjs";
import PosterFallback from "../../assets/no-poster.png";


const SeeMore = ({ show, setShow, title, data, loading, endpoint }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    const { url } = useSelector((state) => state.home);


    const navigate = useNavigate();


    useEffect(() => {
        const bodyStyle = document.body.style
        bodyStyle.overflowY = show ? 'hidden' : 'auto'
    }, [show, setShow])


    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="seemoremain352762">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <div className="seemoreheading4565">
                    <span className="hesding665">{title}</span>
                </div>
                <div className="seemoremainitems321">
                    {data?.map((item, index) => {
                        const posterUrl = item?.poster_path
                            ? url.poster + item?.poster_path
                            : PosterFallback;
                        return (
                            <div
                                key={item?.id}
                                className="carouselItem"
                            >
                                <div className="posterBlock" onClick={() => {
                                    navigate(
                                        `/${item?.media_type || endpoint}/${item?.id
                                        }`
                                    );
                                    hidePopup();
                                }
                                }>
                                    <Img src={posterUrl} />
                                    <CircleRating
                                        rating={item?.vote_average?.toFixed(
                                            1
                                        )}
                                    />
                                    <span className="mediatype09">{item?.media_type}</span>
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item?.title || item?.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item?.release_date || item?.first_air_date).format(
                                            "MMM D, YYYY"
                                        )}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SeeMore;

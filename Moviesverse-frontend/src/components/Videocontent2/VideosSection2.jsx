import React, { useState } from "react";

import "./style.scss";
import { useSelector } from "react-redux";


import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import Line from "../line/Line"

const VideosSection2 = ({ data, loading, title }) => {

    const { url } = useSelector((state) => state.home);

    console.log(data?.episodes);


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
                    {!loading ? (
                        <div className="videos">
                            {data?.episodes?.map((item) => (
                                <div
                                    className="videoItem"
                                    key={item.id}
                                >
                                    <div className="videoThumbnail">
                                        <Img
                                            src={url.poster + item.still_path}
                                        />
                                    </div>
                                    <div className="videoTitle"><b>Episode Number:</b> {item.episode_number}</div>
                                    <div className="videoTitle"><b>Episode Name:</b> {item.name}</div>
                                    <div className="videoTitle">{item.air_date}</div>
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
            <Line />
        </>
    );
};

export default VideosSection2;

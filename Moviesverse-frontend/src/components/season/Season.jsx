import React, { useRef, useState } from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Line from "../line/Line";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import useFetch from "../../hooks/useFetch";


import "./style.scss";
import VideosSection2 from "../Videocontent2/VideosSection2";

const Seasons = ({ data, loading, heading, id, title, mediaType }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const [number, setNumber] = useState(1);
    const { data: episode, loading: episloading } = useFetch(`/${mediaType}/${id}/season/${number}`);

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };



    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="carousel">
                <ContentWrapper>
                    <div className="carouselTitle">{heading}</div>
                    <BsFillArrowLeftCircleFill
                        className="carouselLeftNav arrow"
                        onClick={() => navigation("left")}
                    />
                    <BsFillArrowRightCircleFill
                        className="carouselRighttNav arrow"
                        onClick={() => navigation("right")}
                    />
                    {!loading ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {data?.map((item) => {
                                const posterUrl = item.poster_path
                                    ? url.poster + item.poster_path
                                    : PosterFallback;
                                return (
                                    <div
                                        key={item.id}
                                        className="carouselItem"
                                    >
                                        <div className="posterBlock" onClick={() => setNumber(item.season_number)
                                        } >
                                            <Img src={posterUrl} />
                                            <CircleRating
                                                rating={item.vote_average.toFixed(
                                                    1
                                                )}
                                            />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">
                                                {item.name}
                                            </span>
                                            <span className="date">
                                                <b>Total Episodes:</b> {item.episode_count}
                                            </span>
                                            <span className="date date2">
                                                <b>Air Date:</b> {dayjs(item.air_date).format(
                                                    "MMM D, YYYY"
                                                )}
                                            </span>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )}
                </ContentWrapper>
            </div>
            <Line />
            <VideosSection2 data={episode} loading={episloading} title={`${title} Season ${number}`} mediaType={mediaType} id={id} name={title} />
        </>
    );
};

export default Seasons;

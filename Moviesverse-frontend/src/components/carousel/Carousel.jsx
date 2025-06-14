import React, { useRef, useState } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
// import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";


import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import Line from "../line/Line";

import "./style.scss";
import { toast } from "react-toastify";

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const [clicked, setClicked] = useState(false);

    const { user } = UserAuth();
    const movieID = doc(db, 'users', `${user?.email}`);

    const saveLiked = async (item) => {
        if (user?.email) {
            toast.info("Liking Post is in progress...");
            setLike(true);
            setSaved(true)
            await updateDoc(movieID, {
                savedLiked: arrayUnion({
                    id: item.id,
                    title: item.title || item.name,
                    img: item.poster_path,
                    media_type: item.media_type || endpoint,
                })
            })
            const title64645 = item.name || item.title;
            const msgggg = title64645 + " " + "added to liked list";
            toast.success(msgggg);
        } else {
            const titlee424 = item.name || item.title;
            const end = item.media_type || endpoint;
            const msgg = "Please Login to like a " + end + titlee424;
            toast.warn(msgg);
        }
    }

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const conatainerHalfWidth = (container.offsetWidth / 2) + 108;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth - conatainerHalfWidth)
                : container.scrollLeft + (container.offsetWidth - conatainerHalfWidth);

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
                    {title && <div className="carouselTitle">{title}</div>}
                    <BsFillArrowLeftCircleFill
                        className="carouselLeftNav arrowcar535"
                        onClick={() => navigation("left")}
                    />
                    <BsFillArrowRightCircleFill
                        className="carouselRighttNav arrowcar535"
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
                                        <div className="posterBlock" onClick={() =>
                                            navigate(
                                                `/${item.media_type || endpoint}/${item.id
                                                }`
                                            )
                                        }>
                                            <Img src={posterUrl} />
                                            <CircleRating
                                                rating={item.vote_average.toFixed(
                                                    1
                                                )}
                                            />
                                            <Genres
                                                data={item.genre_ids.slice(0, 2)}
                                            />
                                            <span className="mediatype09">{item.media_type || endpoint}</span>
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">
                                                {item.title || item.name}
                                            </span>
                                            <span className="date">
                                                {dayjs(item.release_date || item.first_air_date).format(
                                                    "MMM D, YYYY"
                                                )}
                                            </span>
                                            <span className="liked-maincar" onClick={() => {
                                                saveLiked(item);
                                            }}>
                                                <FaRegHeart className="addicon" />
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
        </>
    );
};

export default Carousel;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";

import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Line from "../../../components/line/Line.jsx";
import { UserAuth } from "../../../context/AuthContext.jsx";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from "../../../firebase.js";
import Languages from "../../../components/Language/Languages.jsx";
import Countrys from "../../../components/Country/Countrys.jsx";
import Stream from "../../../components/stream/Stream.jsx";
import ShareModal from "../../../components/sharemodal/ShareModal.jsx";
import { toast } from "react-toastify";


const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [stream, setStream] = useState(false);

    const [oneLiked, setOneLiked] = useState(false);
    const [oneWatch, setOneWatch] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [shareData, setShareData] = useState();

    const { user } = UserAuth();
    const movieID = doc(db, 'users', `${user?.email}`);

    const saveLiked = async (data) => {
        if (user?.email) {
            await updateDoc(movieID, {
                savedLiked: arrayUnion({
                    id: data.id || id,
                    title: data.name || data.title,
                    img: data.backdrop_path,
                    media_type: data.media_type || mediaType,
                })
            })
            setOneLiked(true);
            const title3476 = data.name || data.title;
            const msgggg = title3476 + " " + "added to liked list";
            toast.success(msgggg);
        } else {
            const title367476 = data.name || data.title;
            const msgg = "Please login to like a " + title367476;
            toast.warn(msgg);
        }
    }

    const saveWatchList = async (data) => {
        if (user?.email) {
            await updateDoc(movieID, {
                savedWatchLater: arrayUnion({
                    id: data.id || id,
                    title: data.name || data.title,
                    img: data.backdrop_path,
                    media_type: data.media_type || mediaType,
                })
            })
            setOneWatch(true);
            const title34 = data.name || data.title;
            const msg1 = title34 + " " + "added to watch list";
            toast.success(msg1);
        } else {
            const title346 = data.name || data.title;
            const msg2 = "Please login to add a " + title346;
            toast.warn(msg2);
        }
    }

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    useEffect(() => {
        video?.results?.map(item => {
            if (item.type === "Trailer") {
                setVideoo(item.key);
            }
        })
    }, []);

    const titleee = data?.name || data?.title;

    const closeModal = () => setOpenModal(false);



    return (
        <>
            <div className="detailsBanner">
                {!loading ? (
                    <>
                        {!!data && (
                            <React.Fragment>
                                <div className="backdrop-img">
                                    <Img src={url.backdrop + data.backdrop_path} />
                                </div>
                                <div className="opacity-layer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <span className="canhide"></span>
                                        <div className="auth-icons">
                                            <span onClick={() => {
                                                saveLiked(data);
                                            }}>
                                                <FaRegHeart className="liked-icon" /></span>
                                            <span onClick={() => {
                                                saveWatchList(data);
                                            }}>
                                                <MdOutlineBookmarkAdd className="watch-icon" /></span>
                                        </div>
                                        <div className="shareicon989">
                                            <span onClick={() => {
                                                setShowModal(true);
                                                console.log("Modal clicked");
                                                const title = data?.name || data?.title;
                                                const Overview = data?.overview;
                                                const date = data?.release_date;
                                                const tagline = data?.tagline;
                                                const endpoint = data?.endpoint || mediaType;
                                                setShareData(title + "(" + endpoint + ")" + "\n" + tagline + "\n" + "Overview :" + Overview + "\n" + date);
                                            }}><FaShareSquare className="shareicon98icon" /></span>
                                        </div>
                                        <div className="left">
                                            {data.poster_path ? (
                                                <Img
                                                    className="posterImg"
                                                    src={
                                                        url.backdrop +
                                                        data.poster_path
                                                    }
                                                />
                                            ) : (
                                                <Img
                                                    className="posterImg"
                                                    src={PosterFallback}
                                                />
                                            )}
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {`${data.name || data.title
                                                    } (${dayjs(
                                                        data?.release_date
                                                    ).format("YYYY")})`}
                                            </div>
                                            <div className="subtitle">
                                                {data.tagline}
                                            </div>

                                            <Genres data={_genres} />

                                            <div className="row">
                                                <CircleRating
                                                    rating={data.vote_average.toFixed(
                                                        1
                                                    )}
                                                />
                                                <div
                                                    className="playbtn"
                                                    onClick={() => {
                                                        setShow(true);
                                                        setVideoId(video.key);
                                                    }}
                                                >
                                                    <PlayIcon />
                                                    <span className="text">
                                                        Watch Trailer
                                                    </span>
                                                </div>
                                                <div
                                                    className="playbtn"
                                                    onClick={() => {
                                                        setStream(!stream)


                                                    }}
                                                >
                                                    <PlayIcon />
                                                    <span className="text">
                                                        Stream Online
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="overview">
                                                <div className="heading">
                                                    Overview
                                                </div>
                                                <div className="description">
                                                    {data.overview}
                                                </div>
                                            </div>

                                            <div className="info">
                                                {data.number_of_seasons && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Total Seasons:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.number_of_seasons}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.number_of_episodes && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Total Episodes:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.number_of_episodes}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.type && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Type:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.type}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="info">
                                                {data.first_air_date && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            First Air Date:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.first_air_date}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.original_language && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Original Language:{" "}
                                                        </span>
                                                        <span className="text">
                                                            <Languages Language={data.original_language} />
                                                        </span>
                                                    </div>
                                                )}

                                                {data.origin_country && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Origin Country:{" "}
                                                        </span>
                                                        <span className="text">
                                                            <Countrys country={data.origin_country} />
                                                        </span>
                                                    </div>
                                                )}
                                                {data.revenue && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Revenue:{" "}
                                                        </span>
                                                        <span className="text">
                                                            $ {data.revenue}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="info">
                                                {data.status && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Status:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.status}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.release_date && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Release Date:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {dayjs(
                                                                data.release_date
                                                            ).format("MMM D, YYYY")}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.runtime && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Runtime:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {toHoursAndMinutes(
                                                                data.runtime
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {director?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">
                                                        Director:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {director?.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {director.length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}

                                            {writer?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">
                                                        Writer:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {writer?.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {writer.length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}

                                            {data?.created_by?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">
                                                        Creator:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data?.created_by?.map(
                                                            (d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {data
                                                                        ?.created_by
                                                                        .length -
                                                                        1 !==
                                                                        i && ", "}
                                                                </span>
                                                            )
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <VideoPopup
                                        show={show}
                                        setShow={setShow}
                                        videoId={videoId}
                                        setVideoId={setVideoId}
                                    />
                                    <ShareModal
                                        show={showModal}
                                        setShow={setShowModal}
                                        data={shareData}
                                    />
                                </ContentWrapper>
                            </React.Fragment>
                        )}
                    </>
                ) : (
                    <div className="detailsBannerSkeleton">
                        <ContentWrapper>
                            <div className="left skeleton"></div>
                            <div className="right">
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                            </div>
                        </ContentWrapper>
                    </div>
                )}
            </div>
            <Line />
            {stream && <Stream EndPoint={mediaType} id={id} title={titleee} />}
        </>
    );
};

export default DetailsBanner;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";

import dayjs from "dayjs";
import backdrop from "../../../../public/logbg.jpg";
import { useSelector } from "react-redux";



import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import Line from "../../../components/line/Line.jsx";
import { UserAuth } from "../../../context/AuthContext.jsx";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from "../../../firebase.js";
import { toast } from "react-toastify";

const DetailsBanner = () => {
    const [oneLiked, setOneLiked] = useState(false);
    const { url } = useSelector((state) => state.home);


    const { user } = UserAuth();
    const movieID = doc(db, 'users', `${user?.email}`);

    const saveLiked = async (data) => {
        if (user?.email) {
            await updateDoc(movieID, {
                savedLikedPeople: arrayUnion({
                    id: data.id || id,
                    title: data.name || data.title,
                    img: data.profile_path,
                    media_type: "person",
                    birth_date: data.birthday,
                })
            })
            setOneLiked(true);
            // alert(data?.name + " " + "added to liked Person list");
            const msg = data?.name + " " + "added to liked person list";
            toast.success(msg);
        } else {
            // alert("Please Login to add a person to liked list!");
            const msg2 = "Please login to add a person to liked list";
            toast.warn(msg2);
        }
    }

    const { id } = useParams();
    const { data, loading } = useFetch(`/person/${id}`);

    return (
        <>
            <div className="detailsBanner">
                {!loading ? (
                    <>
                        {!!data && (
                            <React.Fragment>
                                <div className="backdrop-img">
                                    <Img src={backdrop} />
                                </div>
                                <div className="opacity-layer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="auth-icons">
                                            <span onClick={() => {
                                                saveLiked(data);
                                            }}>
                                                <FaRegHeart className="liked-icon" /></span>
                                        </div>
                                        <div className="left">
                                            {data?.profile_path ? (
                                                <Img
                                                    className="posterImg"
                                                    src={
                                                        url.profile +
                                                        data?.profile_path
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
                                                {data.known_for_department}
                                            </div>

                                            <div className="overview">
                                                <div className="heading">
                                                    Overview
                                                </div>
                                                <div className="description">
                                                    {data?.biography}
                                                </div>
                                            </div>

                                            <div className="info">
                                                {data.gender && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Runtime:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {
                                                                data?.gender === 2 ? "Male" : "Female"
                                                            }
                                                        </span>
                                                    </div>
                                                )}

                                                {data.birthday && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            BirthDay Date:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {dayjs(
                                                                data.birthday
                                                            ).format("MMM D, YYYY")}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.popularity && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            popularity:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data?.popularity}
                                                        </span>
                                                    </div>
                                                )}

                                            </div>

                                            {data?.place_of_birth && (
                                                <div className="info">
                                                    <span className="text bold">
                                                        Place Of Birth:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data?.place_of_birth}
                                                    </span>
                                                </div>
                                            )}

                                            {data?.imdb_id && (
                                                <div className="info">
                                                    <span className="text bold">
                                                        IMDB ID:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data?.imdb_id}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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
        </>
    );
};

export default DetailsBanner;

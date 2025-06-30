import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import Img from "../../../components/lazyLoadImage/Img";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { UserAuth } from "../../../context/AuthContext.jsx";
import { db } from "../../../firebase.js";
import './star.css';
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js"
import Axios from "axios";
import PosterFallback from "../../../assets/no-poster.png";



function Star() {

    const { user } = UserAuth();
    const [details, setDetails] = useState({});
    const [get, setGet] = useState(false);
    const movieID = doc(db, 'users', `${user?.email}`);

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

    useEffect(() => {
        const emailuser = user?.email;
        Axios.post(`https://movix-api.vercel.app/api/user/getDetails`, {
            email: emailuser,
        }).then(response => {
            console.log(response);
            if (response.data.msg === "success") {
                setGet(true);
            }
            setDetails(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, [window.innerWidth])

    const saveWatchList = async (movie) => {
        if (user?.email) {
            await updateDoc(movieID, {
                savedWatchLater: arrayUnion({
                    id: movie.id || id,
                    title: movie.name || movie.title,
                    img: movie.backdrop_path,
                    media_type: movie.media_type,
                })
            })
            const title435 = movie?.title || movie?.name;
            const msgg = title435 + " " + "added to Watch later list";
            toast.success(msgg);
        } else {
            const title234456 = data.name || data.title;
            const msggg = "Please Login to add " + title234456;;
            toast.warn(msggg);
        }
    }

    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/trending/all/week");
    const [background, setBackground] = useState("");
    const [movie, setMovie] = useState();

    useEffect(() => {
        const movies = data?.results?.[Math.floor(Math.random() * 20)];
        setMovie(movies);
        const bg = url.backdrop + movies?.backdrop_path;
        setBackground(bg);
    }, [data]);

    return (
        <>
            {!loading ? (
                <div class="container-home-banner">
                    <div class="list">
                        <div class="item">
                            <Img src={background} />
                            <div className="opacity-layer"></div>

                            <div class="content">
                                <div className="nameuserstar2345">Hi, </div>
                                <div className="nameuserstar23">{details?.name || "Guest"}</div>
                                <div class="author">{movie?.media_type?.toUpperCase()}</div>
                                <div class="title" id="titlestarmob">{movie?.title || movie?.name}</div>
                                <div class="topic">{movie?.release_date}</div>
                                <div class="des">{movie?.overview}
                                </div>
                                <div class="buttons">
                                    <button onClick={() => {
                                        navigate(`/${movie?.media_type}/${movie?.id}`)
                                    }}>See Details</button>
                                    <button onClick={() => saveWatchList(movie)}>Add to WatchList</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="thumbnail">
                        <BsFillArrowLeftCircleFill
                            className="carouselLeftNav45623star arrow456453star"
                            onClick={() => navigation("left")}
                        />
                        <BsFillArrowRightCircleFill
                            className="carouselRighttNav45623star arrow456453star"
                            onClick={() => navigation("right")}
                        />
                        <div className="thumbnailitemsstar" ref={carouselContainer}>
                            {data?.results?.map((item) => {
                                const posterUrl = item.poster_path
                                    ? url.poster + item.poster_path
                                    : PosterFallback;
                                const backdrop_path = item?.backdrop_path
                                    ? url.backdrop + item?.backdrop_path
                                    : "";

                                return (
                                    <div class="item" key={item?.id} onClick={() => {
                                        setMovie(item);
                                        setBackground(width <= 560 ? posterUrl : backdrop_path);
                                    }}>
                                        <img src={posterUrl} />
                                        <div class="content">
                                            <div class="title">
                                                {data?.title || data?.name}
                                            </div>
                                            <div class="description">
                                                {data?.release_date}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (<div className="loaderstar34">
                <HashLoader
                    color="#421202"
                    size={100}
                    aria-label="Loading Spinner"
                />
                <span>Data not coming ? Try VPN, Enjoy!</span>
            </div>)}
        </>
    )
}

export default Star
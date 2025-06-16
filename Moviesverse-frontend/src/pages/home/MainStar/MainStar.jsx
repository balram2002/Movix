import React, { useState, useEffect, useRef } from 'react';
import './MainStar.css';
import useFetch from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserAuth } from '../../../context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import PosterFallback from "../../../assets/no-poster.png";
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';

const MainStar = () => {
    const { user } = UserAuth();
    const [details, setDetails] = useState({});
    const [get, setGet] = useState(false);
    const movieID = doc(db, 'users', `${user?.email}`);

    useEffect(() => {
        const emailuser = user?.email;
        axios.post(`https://movix-api.vercel.app/api/user/getDetails`, {
            email: emailuser,
        }).then(response => {
            console.log(response);
            if (response.data.msg === "success") {
                setGet(true);
            }
            setDetails(response.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const saveWatchList = async (movie) => {
        if (user?.email) {
            await updateDoc(movieID, {
                savedWatchLater: arrayUnion({
                    id: movie.id || id,
                    title: movie.name || movie.title,
                    img: movie.backdrop_path,
                    media_type: movie.media_type,
                })
            });
            const title435 = movie?.title || movie?.name;
            const msgg = title435 + " " + "added to Watch later list";
            toast.success(msgg);
        } else {
            const title234456 = data.name || data.title;
            const msggg = "Please Login to add " + title234456;
            toast.warn(msggg);
        }
    };

    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/trending/all/week");
    const [background, setBackground] = useState("");
    const [movie, setMovie] = useState();
    const [showCarousel, setShowCarousel] = useState(false);

    const [slidesOrder, setSlidesOrder] = useState([]);

    useEffect(() => {
        if (data?.results) {
            setSlidesOrder(Array.from({length: data.results.length}, (_, i) => i));
        }
    }, [data]);

    const [transitionDirection, setTransitionDirection] = useState(null);

    const showSlider = (type) => {
        setTransitionDirection(type);
        setSlidesOrder((prevOrder) => {
            if (type === 'next') {
                return [...prevOrder.slice(1), prevOrder[0]];
            } else {
                return [prevOrder[prevOrder.length - 1], ...prevOrder.slice(0, -1)];
            }
        });
        setTimeout(() => {
            setTransitionDirection(null);
        }, 500);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            showSlider('next');
        }, 7000);
        return () => clearTimeout(timer);
    }, [slidesOrder]);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setShowCarousel(true);
                showSlider('next')
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const handleThumbnailClick = (clickedIndex) => {
        const n = data?.results?.length || 0;
        if (n > 0) {
            const newSlidesOrder = Array.from({length: n}, (_, i) => (clickedIndex + i) % n);
            setSlidesOrder(newSlidesOrder);
        }
    };

    return (
        <>
            {showCarousel ? (
                <div className="container-home-banner">
                    <div className={`carouselstar ${transitionDirection || ''}`}>
                        <div className="list">
                            {slidesOrder.map((slideIndex) => {
                                const slide = data?.results[slideIndex];
                                const backdrop_path = slide?.backdrop_path
                                    ? url.backdrop + slide?.backdrop_path
                                    : "";
                                return (
                                    <div key={slideIndex} className="item">
                                        <img src={backdrop_path} alt="" />
                                        <div className="content">
                                            <div className="nameuserstar2345">Hi, </div>
                                            <div className="nameuserstar23">{details?.name || "Guest"}</div>
                                            <div className="author">{slide?.media_type?.toUpperCase()}</div>
                                            <div className="title">{slide?.title || slide?.name}</div>
                                            <div className="topic">{slide?.release_date}</div>
                                            <div className="des">{slide?.overview}</div>
                                           <div className="buttons relative z-50">
    <button
        className="relative z-50"
        onClick={() => {
            navigate(`/${slide?.media_type}/${slide?.id}`);
        }}
    >
        See Details
    </button>
    <button
        className="relative z-50"
        onClick={() => saveWatchList(slide)}
    >
        Add to WatchList
    </button>
</div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="thumbnail">
                            {slidesOrder.map((slideIndex) => {
                                const slide = data?.results[slideIndex];
                                const posterUrl = slide?.poster_path
                                    ? url?.poster + slide?.poster_path
                                    : PosterFallback;
                                return (
                                    <div key={slideIndex} className="item" onClick={() => handleThumbnailClick(slideIndex)}>
                                        <img src={posterUrl} alt="" />
                                        <div className="content">
                                            <div className="title">{slide?.title || slide?.name}</div>
                                            <div className="description">{slide?.release_date}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="arrows">
                            <button onClick={() => showSlider('prev')}>{"<"}</button>
                            <button onClick={() => showSlider('next')}>{">"}</button>
                        </div>
                        <div key={slidesOrder[0]} className="time running"></div>
                    </div>
                    <div className="opacity-layerstr43"></div>
                </div>
            ) : (
                <div className="loaderstar34">
                    <HashLoader
                        color="#421202"
                        size={100}
                        aria-label="Loading Spinner"
                    />
                </div>
            )}
        </>
    );
};

export default MainStar;
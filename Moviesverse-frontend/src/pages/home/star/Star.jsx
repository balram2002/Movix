import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { UserAuth } from "../../../context/AuthContext.jsx";
import { db } from "../../../firebase.js";
import './star.css';
import { toast } from "react-toastify";


function Star() {

    const { user } = UserAuth();
    const movieID = doc(db, 'users', `${user?.email}`);

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
            // alert(movie.title + " " + "added to Watch later list");
            const msgg = movie?.title + " " + "added to Watch later list";
            toast.success(msgg);
        } else {
            // alert("Please Login to add a " + mediaType);
            const msggg = "Please Login to add a " + " " + movie?.mediaType;
            toast.warn(msggg);
        }
    }

    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/trending/all/week");
    const [background, setBackground] = useState("");
    const [movie, setMovie] = useState();
    const [movieTwo, setMovieTwo] = useState();
    const [movieThree, setMovieThree] = useState();
    const [movieFour, setMovieFour] = useState();
    const [movieFive, setMovieFive] = useState();
    const [movieSix, setMovieSix] = useState();
    const [bgTwo, setbgTwo] = useState();
    const [bgThree, setbgThree] = useState();
    const [bgFour, setbgFour] = useState();
    const [bgFive, setbgFive] = useState();
    const [bgSix, setbgSix] = useState();

    useEffect(() => {
        const movies = data?.results?.[Math.floor(Math.random() * 20)];
        const two = data?.results?.[0];
        const twobg = url.backdrop + two?.backdrop_path;
        setbgTwo(twobg);
        setMovieTwo(two);
        const three = data?.results?.[1];
        const threebg = url.backdrop + three?.backdrop_path;
        setbgThree(threebg);
        setMovieThree(three);
        const four = data?.results?.[2];
        const fourbg = url.backdrop + four?.backdrop_path;
        setbgFour(fourbg);
        setMovieFour(four);
        const five = data?.results?.[3];
        const fivebg = url.backdrop + five?.backdrop_path;
        setbgFive(fivebg);
        setMovieFive(five);
        const six = data?.results?.[4];
        const sixbg = url.backdrop + six?.backdrop_path;
        setbgSix(sixbg);
        setMovieSix(six);
        setMovie(movies);
        const bg = url.backdrop + movies?.backdrop_path;
        setBackground(bg);
    }, [data]);

    return (
        <div class="container-home-banner">
            <div class="list">
                <div class="item">
                    {/* <img src={background} /> */}
                    <Img src={background} />
                    <div className="opacity-layer"></div>

                    <div class="content">
                        <div class="author">{movie?.media_type.toUpperCase()}</div>
                        <div class="title">{movie?.title || movie?.name}</div>
                        <div class="topic">{movie?.release_date}</div>
                        <div class="des">{movie?.overview}
                        </div>
                        <div class="buttons">
                            <button onClick={() => {
                                navigate(`/${movie?.media_type}/${movie?.id}`)
                            }}>See DetailsBD</button>
                            <button onClick={() => saveWatchList(movie)}>Add to WatchList</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="thumbnail">
                {/* {data?.map(item=>{
                    const img= url.backdrop + data?.backdrop_path;
                    return(
                        <div className="item"  onClick={() => {
                            setMovie(data);
                            setBackground(img);
                        }}>
                            <img src={img} alt="" />
                            <div className="content">
                                <div className="title">
                                    {data?.title || data?.name}
                                </div>
                                <div className="description">
                                    {data?.release_date}
                                </div>
                            </div>
                        </div> 
                    )
                })} */}
                <div class="item" onClick={() => {
                    setMovie(movieTwo);
                    setBackground(bgTwo);
                }}>
                    <img src={bgTwo} />
                    <div class="content">
                        <div class="title">
                            {movieTwo?.title || movieTwo?.name}
                        </div>
                        <div class="description">
                            {movieTwo?.release_date}
                        </div>
                    </div>
                </div>
                <div class="item" onClick={() => {
                    setMovie(movieThree);
                    setBackground(bgThree);
                }}>
                    <img src={bgThree} />
                    <div class="content">
                        <div class="title">
                            {movieThree?.title || movieThree?.name}
                        </div>
                        <div class="description">
                            {movieThree?.release_date}
                        </div>
                    </div>
                </div>
                <div class="item" onClick={() => {
                    setMovie(movieFour);
                    setBackground(bgFour);
                }}>
                    <img src={bgFour} />
                    <div class="content">
                        <div class="title">
                            {movieFour?.title || movieFour?.name}
                        </div>
                        <div class="description">
                            {movieFour?.release_date}
                        </div>
                    </div>
                </div>
                <div class="item" onClick={() => {
                    setMovie(movieFive);
                    setBackground(bgFive);
                }}>
                    <img src={bgFive} />
                    <div class="content">
                        <div class="title">
                            {movieFive?.title || movieFive?.name}
                        </div>
                        <div class="description">
                            {movieFive?.release_date}
                        </div>
                    </div>
                </div>
                <div class="item" onClick={() => {
                    setMovie(movieSix);
                    setBackground(bgSix);
                }}>
                    <img src={bgSix} />
                    <div class="content">
                        <div class="title">
                            {movieSix?.title || movieSix?.name}
                        </div>
                        <div class="description">
                            {movieSix?.release_date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Star
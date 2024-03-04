import React, { useEffect, useState } from "react";

import "./style.scss";
import "./movies.css";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import InTheaters from "./theaters/InTheaters";
import Upcoming from "./upcoming/Upcoming";
import ReleaseYear from "./releaseYear/ReleaseYear";
import Animation from "./animation/Animation";
import Revenue from "./revenue/Revenue";
import Country from "./country/Country";
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import useFetch from "../../hooks/useFetch";
import CustomLiked1 from "../home/usercustomliked1/CustomLiked1";


const Movies = () => {

    const { user } = UserAuth();
    const [likedMovies, setLikedMovies] = useState([]);
    const [watchMovies, setWatchMovies] = useState([]);
    const [showLiked, setShowLiked] = useState(false);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setLikedMovies(doc.data()?.savedLiked);
            setWatchMovies(doc.data()?.savedWatchLater);
        })
    }, [user?.email]);

    const id01 = likedMovies && likedMovies[1]?.id;
    const endpoint01 = likedMovies && likedMovies[1]?.media_type;
    const title01 = likedMovies && likedMovies[1]?.title;
    const title1 = "Because You Liked " + title01;
    const { data: data01, loading: loading01 } = useFetch(`/${endpoint01}/${id01}/recommendations`);


    const id03 = watchMovies && watchMovies[1]?.id;
    const endpoint03 = watchMovies && watchMovies[1]?.media_type;
    const title03 = watchMovies && watchMovies[1]?.title;
    const title3 = "Because You added " + title03 + " " + "to Watch Later List";
    const { data: data03, loading: loading03 } = useFetch(`/${endpoint03}/${id03}/recommendations`);


    return (
        <main>
            <div className="homePage">
                <HeroBanner />
                <Trending />
                <Popular />
                <TopRated />
                {endpoint01 === "movie" && <CustomLiked1 data={data01} loading={loading01} endpoint={endpoint01} title={title1} />}
                <Animation />
                <InTheaters />
                <Upcoming />
                {endpoint03 === "movie" && <CustomLiked1 data={data03} loading={loading03} endpoint={endpoint03} title={title3} />}
                <Country />
                <ReleaseYear />
                <Revenue />
            </div>
        </main>
    );
};

export default Movies;

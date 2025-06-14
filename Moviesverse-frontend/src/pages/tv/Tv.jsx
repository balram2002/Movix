import React, { useEffect, useState } from "react";
import "./style.scss";
import { Helmet } from 'react-helmet';
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import InTheaters from "./theaters/InTheaters";
import Upcoming from "./upcoming/Upcoming";
import Animation from "./animation/Animation";
import ReleaseYear from "./ReleaseYear/ReleaseYear";
import Country from "./country/Country";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import CustomLiked1 from "../home/usercustomliked1/CustomLiked1";
import { doc, onSnapshot } from 'firebase/firestore';
import ScrollButton from "../../components/scrollbutton/ScrollButton";
import { useLocation } from 'react-router-dom';

// Component to handle recommendations for a single TV show
const RecommendationSection = ({ tvShow, title }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = (url, setData, setLoading) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJkMmM2YWZlNTMwY2ZkNjlhN2FlOWE0OWMyNTc5ZCIsInN1YiI6IjY1Y2Q5M2IyMzEyMzQ1MDE3YmJhYTEyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zgqx7AWkKbNhLnQgNMY8u8Ei_9e34RRD-cAXyDMlfc8'
            }
        };
        setLoading(true);
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/${tvShow.media_type}/${tvShow.id}/recommendations?language=en-US&page=1`;
        fetchData(url, setData, setLoading);
    }, [tvShow]);

    return (
        <CustomLiked1
            data={data}
            loading={loading}
            endpoint={tvShow.media_type}
            title={title}
        />
    );
};

const Tv = () => {
    const { user } = UserAuth();
    const [likedMovies, setLikedMovies] = useState([]);
    const [watchMovies, setWatchMovies] = useState([]);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [show, setShow] = useState(false);
    const location = useLocation();

    // Scroll button logic
    useEffect(() => {
        window.addEventListener("scroll", controlScrollButton);
        return () => {
            window.removeEventListener("scroll", controlScrollButton);
        };
    }, [lastScrollY]);

    const controlScrollButton = () => {
        if (window.scrollY > 500) {
            if (window.scrollY > lastScrollY) {
                setShow(true);
            } else {
                setShow(false);
            }
        } else {
            setShow(false);
        }
        setLastScrollY(window.scrollY);
    };

    // Fetch Firestore data
    useEffect(() => {
        if (user?.email) {
            const unsubscribe = onSnapshot(doc(db, 'users', user.email), (doc) => {
                setLikedMovies(doc.data()?.savedLiked || []);
                setWatchMovies(doc.data()?.savedWatchLater || []);
            }, (error) => {
                console.error('Firestore onSnapshot error:', error);
            });
            return () => unsubscribe();
        }
    }, [user?.email]);

    // Select up to 3 unique TV shows from likedMovies and up to 2 from watchMovies
    const selectedLikedTv = likedMovies.filter(item => item.media_type === "tv").slice(0, 3);
    const selectedLikedIds = new Set(selectedLikedTv.map(m => m.id));
    const selectedWatchTv = watchMovies.filter(item => item.media_type === "tv" && !selectedLikedIds.has(item.id)).slice(0, 2);
    const recommendationItems = [
        ...selectedLikedTv.map(m => ({ tvShow: m, title: `Because You Liked ${m.title}` })),
        ...selectedWatchTv.map(m => ({ tvShow: m, title: `Because You Added ${m.title} to Watch Later List` }))
    ];

    return (
        <>
            <Helmet>
                <title>Tv Shows Page | AIConnect</title>
                <meta name="description" content="aiconnect docs page containing all the information about site" />
            </Helmet>

            <main>
                <div className="homePage">
                    <HeroBanner />
                    <Trending />
                    {recommendationItems[0] && <RecommendationSection key={recommendationItems[0].tvShow.id} tvShow={recommendationItems[0].tvShow} title={recommendationItems[0].title} />}
                    <Popular />
                    {recommendationItems[1] && <RecommendationSection key={recommendationItems[1].tvShow.id} tvShow={recommendationItems[1].tvShow} title={recommendationItems[1].title} />}
                    <TopRated />
                    {recommendationItems[2] && <RecommendationSection key={recommendationItems[2].tvShow.id} tvShow={recommendationItems[2].tvShow} title={recommendationItems[2].title} />}
                    <ReleaseYear />
                    {recommendationItems[3] && <RecommendationSection key={recommendationItems[3].tvShow.id} tvShow={recommendationItems[3].tvShow} title={recommendationItems[3].title} />}
                    <Animation />
                    {recommendationItems[4] && <RecommendationSection key={recommendationItems[4].tvShow.id} tvShow={recommendationItems[4].tvShow} title={recommendationItems[4].title} />}
                    <InTheaters />
                    <Upcoming />
                    <Country />
                </div>
                <div className="alternateswipergfhf6677">
                    <span className='fhfhfhyf67576'>Use Desktop to experience more features.</span>
                    <span className='fhfhfhyf67576'>Make an account to like and add to watchlist content and get recommendations accordingly.</span>
                </div>
            </main>
            {show && <ScrollButton />}
        </>
    );
};

export default Tv;
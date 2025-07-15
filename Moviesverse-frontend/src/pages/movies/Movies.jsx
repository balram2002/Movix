import React, { useEffect, useState } from "react";
import "./style.scss";
import "./movies.css";
import { Helmet } from 'react-helmet-async';
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
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import CustomLiked1 from "../home/usercustomliked1/CustomLiked1";
import { doc, onSnapshot } from 'firebase/firestore';
import ScrollButton from "../../components/scrollbutton/ScrollButton";
import { useLocation } from 'react-router-dom';
import { StarsBackground } from "../../components/ui/stars-background";
import { ShootingStars } from "../../components/ui/shooting-stars";

// Component to handle recommendations for a single movie
const RecommendationSection = ({ movie, title }) => {
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
    const url = `https://api.themoviedb.org/3/${movie.media_type}/${movie.id}/recommendations?language=en-US&page=1`;
    fetchData(url, setData, setLoading);
  }, [movie]);

  return (
    <CustomLiked1
      data={data}
      loading={loading}
      endpoint={movie.media_type}
      title={title}
    />
  );
};

const Movies = () => {
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

  // Select up to 3 unique movies from likedMovies and up to 2 from watchMovies
  const selectedLikedMovies = likedMovies.filter(item => item.media_type === "movie").slice(0, 3);
  const selectedLikedIds = new Set(selectedLikedMovies.map(m => m.id));
  const selectedWatchMovies = watchMovies.filter(item => item.media_type === "movie" && !selectedLikedIds.has(item.id)).slice(0, 2);
  const recommendationItems = [
    ...selectedLikedMovies.map(m => ({ movie: m, title: `Because You Liked ${m.title}` })),
    ...selectedWatchMovies.map(m => ({ movie: m, title: `Because You Added ${m.title} to Watch Later List` }))
  ];

  return (
    <>
      <Helmet>
        <title>Movies Page | Moviesverse</title>
        <meta name="description" content="Movies page of moviesverse where users can explore and Discover millions of movies. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
        <meta property="og:title" content="Movies Page | Moviesverse" />
        <meta property="og:description" content="Movies page of moviesverse where users can explore and Discover millions of movies. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
        <link rel="canonical" href="https://moviesverse.studio/movie" />
        <meta property="og:url" content="https://moviesverse.studio/movie" />
        <meta property="og:type" content="website" />
      </Helmet>
      <main>
        <div className="homePage">
          <HeroBanner />
          <Trending />
          {recommendationItems[0] && <RecommendationSection key={recommendationItems[0].movie.id} movie={recommendationItems[0].movie} title={recommendationItems[0].title} />}
          <Popular />
          {recommendationItems[2] && <RecommendationSection key={recommendationItems[2].movie.id} movie={recommendationItems[2].movie} title={recommendationItems[2].title} />}
          <TopRated />
          {recommendationItems[3] && <RecommendationSection key={recommendationItems[3].movie.id} movie={recommendationItems[3].movie} title={recommendationItems[3].title} />}
          <Animation />
          {recommendationItems[4] && <RecommendationSection key={recommendationItems[4].movie.id} movie={recommendationItems[4].movie} title={recommendationItems[4].title} />}
          <InTheaters />
          <Upcoming />
          {recommendationItems[1] && <RecommendationSection key={recommendationItems[1].movie.id} movie={recommendationItems[1].movie} title={recommendationItems[1].title} />}
          <Country />
          <ReleaseYear />
          <Revenue />
        </div>
        <div className="alternateswipergfhf6677">
          <span className='fhfhfhyf67576'>Use Desktop to experience more features.</span>
          <span className='fhfhfhyf67576'>Make an account to like and add to watchlist content and get recommendations accordingly.</span>
        </div>
      </main>
      {show && <ScrollButton />}
      <ShootingStars />
      <StarsBackground />
    </>
  );
};

export default Movies;
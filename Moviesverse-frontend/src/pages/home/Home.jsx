import React, { useEffect, useState } from 'react';
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from './trending/Trending';
import Streaming from './streaming/Streaming';
import { Helmet } from 'react-helmet';
import 'aos/dist/aos.css';
import "./style.css";
import Star from './star/Star';
import InfoSlider from './infoslider/InfoSlider';
import Documentries from './documentries/Documentries';
import Language from './language/Language';
import Comedy from './comedy/Comedy';
import Company from './company/Company';
import VoteCount from './voteCount/VoteCount';
import Collections from './collections/Collections';
import TrendingCast from './cast/TrendingCast';
import { UserAuth } from '../../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import CustomLiked1 from './usercustomliked1/CustomLiked1';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import FavourateGenre from './favourategenre/FavourateGenre';
import ScrollButton from '../../components/scrollbutton/ScrollButton';
import Banner from './mainbanner/Banner';
import MainStar from './MainStar/MainStar';
import { ShootingStars } from './../../components/ui/shooting-stars';
import { StarsBackground } from './../../components/ui/stars-background';
import BackgroundPaths from '../../components/ui/BackgroundPaths';

// Component to handle recommendations for a single item (movie or TV show)
const RecommendationSection = ({ item, title }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = (url, setData) => {
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
    const url = `https://api.themoviedb.org/3/${item.media_type}/${item.id}/recommendations?language=en-US&page=1`;
    fetchData(url, setData);
  }, [item]);

  return (
    <CustomLiked1
      data={data}
      loading={loading}
      endpoint={item.media_type}
      title={title}
    />
  );
};

function Home() {
  const { user } = UserAuth();
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchMovies, setWatchMovies] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({});
  const [genres, setGenres] = useState(null);
  const [nativeLanguage, setNativeLanguage] = useState('');
  const location = useLocation();
  const emailuser = user?.email;

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

  const genreslist = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
  ];

  // Fetch user details
  useEffect(() => {
    if (emailuser) {
      Axios.post(`https://movix-api.vercel.app/api/user/getDetails`, { email: emailuser })
        .then(response => setDetails(response.data))
        .catch(err => console.error('Error fetching user details:', err));
    }
  }, [emailuser]);

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

  // Set genres based on details.genre
  useEffect(() => {
    const genreItem = genreslist.find(item => item.name === details?.genre);
    setGenres(genreItem ? genreItem.id : null);
  }, [details?.genre]);

  // States for genre-based recommendations
  const [genreData, setGenreData] = useState(null);
  const [genreLoading, setGenreLoading] = useState(true);

  // Fetch function
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

  // Fetch genre-based recommendations
  useEffect(() => {
    if (genres) {
      const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genres}&language=en-US&page=1`;
      fetchData(url, setGenreData, setGenreLoading);
    } else {
      setGenreLoading(false);
    }
  }, [genres, location.key]);

  // Select up to 4 unique movies and 4 unique TV shows from likedMovies and watchMovies
  const selectedLikedMovies = likedMovies.filter(item => item.media_type === "movie").slice(0, 4);
  const selectedLikedTv = likedMovies.filter(item => item.media_type === "tv").slice(0, 4);
  const selectedLikedIds = new Set([...selectedLikedMovies, ...selectedLikedTv].map(m => m.id));
  const selectedWatchMovies = watchMovies.filter(item => item.media_type === "movie" && !selectedLikedIds.has(item.id)).slice(0, 4 - selectedLikedMovies.length);
  const selectedWatchTv = watchMovies.filter(item => item.media_type === "tv" && !selectedLikedIds.has(item.id)).slice(0, 4 - selectedLikedTv.length);
  const recommendationItems = [
    ...selectedLikedMovies.map(m => ({ item: m, title: `Because You Liked Movie ${m.title}` })),
    ...selectedLikedTv.map(m => ({ item: m, title: `Because You Liked TV Show ${m.title}` })),
    ...selectedWatchMovies.map(m => ({ item: m, title: `Because You Added Movie ${m.title} to Watch Later` })),
    ...selectedWatchTv.map(m => ({ item: m, title: `Because You Added TV Show ${m.title} to Watch Later` }))
  ].slice(0, 8); // Ensure only up to 8 unique items

  return (
    <>
      <Helmet>
        <title>Home | Moviesverse</title>
        <meta name="description" content="Discover and stream your favorite Movies and TV Shows with our powerful MERN stack app using TMDB API. Features include Firebase authentication, dynamic recommendations, search and explore pages, global state with Redux, Watchlist/Likes, and seamless content streaming with full error handling." />
      </Helmet>

      <MainStar />
      <HeroBanner />
      <div className='homebanner' id='bgbirds'>
        <div className="corousal">
          <Trending />
          {recommendationItems[0] && <RecommendationSection key={recommendationItems[0].item.id} item={recommendationItems[0].item} title={recommendationItems[0].title} />}
          <TrendingCast />
          {recommendationItems[1] && <RecommendationSection key={recommendationItems[1].item.id} item={recommendationItems[1].item} title={recommendationItems[1].title} />}
          <Streaming />
          {recommendationItems[2] && <RecommendationSection key={recommendationItems[2].item.id} item={recommendationItems[2].item} title={recommendationItems[2].title} />}
          <Language />
          {recommendationItems[3] && <RecommendationSection key={recommendationItems[3].item.id} item={recommendationItems[3].item} title={recommendationItems[3].title} />}
          <Company />
          <InfoSlider />
          {genres && (
            <FavourateGenre
              title={`Because Your Favorite Genre is '${details.genre}'`}
              genre={genres}
              data={genreData}
              loading={genreLoading}
            />
          )}
          <Documentries />
          {recommendationItems[5] && <RecommendationSection key={recommendationItems[5].item.id} item={recommendationItems[5].item} title={recommendationItems[5].title} />}
          <Collections />
          {recommendationItems[6] && <RecommendationSection key={recommendationItems[6].item.id} item={recommendationItems[6].item} title={recommendationItems[6].title} />}
          <Comedy />
          {recommendationItems[7] && <RecommendationSection key={recommendationItems[7].item.id} item={recommendationItems[7].item} title={recommendationItems[7].title} />}
          <VoteCount />
          {recommendationItems[4] && <RecommendationSection key={recommendationItems[4].item.id} item={recommendationItems[4].item} title={recommendationItems[4].title} />}
          <Banner />
        </div>
      </div>
      {show && <ScrollButton />}
      <StarsBackground />
    </>
  );
}

export default Home;
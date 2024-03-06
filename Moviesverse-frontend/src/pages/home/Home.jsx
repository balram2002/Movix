import React, { useEffect, useState } from 'react';
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from './trending/Trending';
import Streaming from './streaming/Streaming';
import Aos from 'aos';

import 'aos/dist/aos.css';
import "./style.css";
import Star from './star/Star';
import InfoSlider from './infoslider/InfoSlider';
import Documentries from './documentries/Documentries';
import Language from './language/Language';
import Comedy from './comedy/Comedy';
import Company from './company/Company'
import VoteCount from './voteCount/VoteCount';
import Collections from './collections/Collections';
import TrendingCast from './cast/TrendingCast';
import { UserAuth } from '../../context/AuthContext';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import useFetch from '../../hooks/useFetch';
import CustomLiked1 from './usercustomliked1/CustomLiked1';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import FavourateGenre from './favourategenre/FavourateGenre';
import Genres from './../../components/genres/Genres';
import ScrollButton from '../../components/scrollbutton/ScrollButton';


function Home() {

  const { user } = UserAuth();
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchMovies, setWatchMovies] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({});
  const [genres, setGenres] = useState('');
  const location = useLocation();
  const emailuser = user?.email;

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
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


  useEffect(() => {
    Axios.post(`${window.location.origin}/api/user/getDetails`, {
      email: emailuser,
    }).then(response => {
      console.log(response);
      setDetails(response.data);
    }).catch(err => {
      console.log(err);
    })
    console.log(details);
  }, []);

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setLikedMovies(doc.data()?.savedLiked);
      setWatchMovies(doc.data()?.savedWatchLater);
    })
  }, []);

  const id01 = likedMovies && likedMovies[0]?.id;
  const endpoint01 = likedMovies && likedMovies[0]?.media_type;
  const title01 = likedMovies && likedMovies[0]?.title;
  const title1 = "Because You Liked " + endpoint01 + " " + title01;
  const { data: data01, loading: loading01 } = useFetch(`/${endpoint01}/${id01}/recommendations`);

  const id02 = likedMovies && likedMovies[1]?.id;
  const endpoint02 = likedMovies && likedMovies[1]?.media_type;
  const title02 = likedMovies && likedMovies[1]?.title;
  const title2 = "Because You Liked " + endpoint02 + " " + title02;
  const { data: data02, loading: loading02 } = useFetch(`/${endpoint02}/${id02}/recommendations`);


  const id03 = watchMovies && watchMovies[0]?.id;
  const endpoint03 = watchMovies && watchMovies[0]?.media_type;
  const title03 = watchMovies && watchMovies[0]?.title;
  const title3 = "Because You added " + endpoint03 + " " + title03 + " " + "to Watch Later List";
  const { data: data03, loading: loading03 } = useFetch(`/${endpoint03}/${id03}/recommendations`);

  const genre = details && details.genre;
  const title4 = `Because Your Favourate genre is '${genre}'`
  useEffect(() => {
    const countryy = genreslist.map(item => {
      if (genre === item.name) {
        setGenres(item.id);
      }
    })
  }, [genre]);
  console.log(genres);

  return (
    <>
      <Star />
      {/* <SmoothStar /> */}
      <HeroBanner />
      <div className='homebanner'>
        <div className="corousal">
          <Trending />
          <TrendingCast />
          <Streaming />
          <Language />
          {likedMovies && <CustomLiked1 data={data01} loading={loading01} endpoint={endpoint01} title={title1} />}
          <Company />
          <InfoSlider />
          {details?.genre && <FavourateGenre title={title4} genre={genres} />}
          <Documentries />
          {likedMovies && <CustomLiked1 data={data02} loading={loading02} endpoint={endpoint02} title={title2} />}
          <Collections />
          <Comedy />
          {watchMovies && <CustomLiked1 data={data03} loading={loading03} endpoint={endpoint03} title={title3} />}
          <VoteCount />
        </div>
      </div>
      {show && <ScrollButton />}
    </>
  )
}

export default Home;
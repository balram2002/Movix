import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
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

// Define keyframes exactly as in the original CSS
const showContent = keyframes`
  to {
        transform: translateY(0px);
        filter: blur(0px);
        opacity: 1;
    }
`;

const showImage = keyframes`
  from {
    width: 150px;
    height: 220px;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 30px;
  }
  to {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(0);
    border-radius: 0;
  }
`;

const showThumbnail = keyframes`
  from {
    width: 0;
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    width: 150px;
    opacity: 1;
    transform: scale(1);
  }
`;

const effectNext = keyframes`
  from {
    transform: translateX(150px);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const runningTime = keyframes`
   from {
        width: 100%;
        opacity: 1;
    }
    to {
        width: 0;
        opacity: 1;
    }
`;

const showImagePrev = keyframes`
  from {
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    transform: translateX(0) scale(1);
    border-radius: 0;
    opacity: 1;
  }
  to {
    width: 150px;
    height: 220px;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%) scale(0.95);
    border-radius: 20px;
    opacity: 0.8;
  }
`;

const contentOut = keyframes`
  to {
        transform: translateY(-150px);
        filter: blur(20px);
        opacity: 0;
    }
`;

// Styled component with exact CSS styles, using .carouselstar
const CarouselStar = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;

  &.initializing .list .item {
    display: none;
  }

  &.initializing .list .item:nth-child(1) {
    display: block !important;
  }

  .list .item {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 0 0 0;
  }

  .list .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .list .item .content {
    position: absolute;
    top: 15%;
    width: 1140px;
    max-width: 80%;
    left: 40%;
    transform: translateX(-50%);
    padding-right: 30%;
    box-sizing: border-box;
    color: #fff;
    text-shadow: 0 5px 10px #0004;
  }

  .list .item .author {
    font-weight: bold;
    letter-spacing: 10px;
  }

  .list .item .title,
  .list .item .topic {
    font-size: 5em;
    font-weight: bold;
    line-height: 1.3em;
  }

  .list .item .topic {
    color: #f1683a;
  }

   .list .item .des {
    max-width: 590px;
  }

  .list .item .buttons {
    display: grid;
    grid-template-columns: repeat(2, 130px);
    grid-template-rows: 40px;
    gap: 5px;
    margin-top: 20px;
  }

.list .item .buttons button {

   background: #FF4742;
  border: 1px solid #FF4742;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  box-sizing: border-box;
  color: #fff;
  display: inline-flex;     
  align-items: center;
  justify-content: center;
  max-width: 100%;  
  font-family: Nunito, Roboto, "Proxima Nova", sans-serif;
  font-size: 1rem;           
  line-height: 1.2;
  font-weight: 800;
  white-space: normal;
  overflow-wrap: break-word;
  min-height: 40px;
  padding: 12px 16px;      
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  text-align: center;
  text-transform: none;
  outline: 0;
}

.list .item .buttons button:hover {

    background-color: initial;
    background-position: 0 0;
    color: #FF4742;
}

.list .item .buttons button:nth-child(2) {
    background-color: transparent;
    padding: 0;
    backdrop-filter: blur(30px);
}

.list .item .buttons button:nth-child(2):hover {
    background: #f1683a;
    color: white;
}

  .thumbnail {
    position: absolute !important;
    bottom: 10px !important;
    right: 640px !important;
    width: 100%;
    z-index: 9999999 !important;
    display: flex !important;
    gap: 20px !important;
  }

  .thumbnail .item {
    width: 150px;
    height: 220px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .thumbnail .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

 .list .item .content {
  position: absolute;
  top: 15%;
  width: 1140px;
  max-width: 80%;
  left: 40%;
  transform: translateX(-50%);
  padding-right: 30%;
  box-sizing: border-box;
  color: #fff;
  text-shadow: 0 5px 10px #0004;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

  .thumbnail .item .content .title {
    font-weight: 500;
  }

  .thumbnail .item .content .description {
    font-weight: 300;
  }

  .arrows {
   position: absolute;
    top: 90%;
    right: 75%;
    width: 300px;
    max-width: 30%;
    display: flex;
    gap: 10px;
    align-items: center;
    z-index: 999999;
  }

  .arrows button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #eee4;
    border: none;
    color: #fff;
    font-family: monospace;
    font-weight: bold;
    transition: .5s;
  }

  .list .item:nth-child(1) .content {
  opacity: 1;
  visibility: visible;
}

  .arrows button:hover {
    background-color: #fff;
    color: #000;
  }

  .list .item:nth-child(1) {
    z-index: 1;
  }

  .list .item:nth-child(1) .content .author,
  .list .item:nth-child(1) .content .title,
  .list .item:nth-child(1) .content .topic,
  .list .item:nth-child(1) .content .des,
    .list .item:nth-child(1) .content .nameuserstar2345,
  .list .item:nth-child(1) .content .nameuserstar23,
  .list .item:nth-child(1) .content .buttons {
    transform: translateY(50px);
  filter: blur(20px);
  opacity: 0;
  animation: ${showContent} .5s 1s ease-out 1 forwards;
  }

  .list .item:nth-child(1) .content .title {
    animation-delay: 1.2s !important;
  }

  .list .item:nth-child(1) .content .topic {
    animation-delay: 1.4s !important;
  }

  .list .item:nth-child(1) .content .des {
    animation-delay: 1.6s !important;
  }

  .list .item:nth-child(1) .content .buttons {
    animation-delay: 1.8s !important;
  }

&.next .list .item:nth-child(1) img {
    position: absolute;
    animation: ${showImage} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1 forwards;
  }

   &.next .thumbnail .item:nth-last-child(1) {
    overflow: hidden;
    animation: ${showThumbnail} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1 forwards;
  }

 &.next .thumbnail {
    animation: ${effectNext} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1 forwards;
  }

  .time {
   position: absolute;
    z-index: 1000;
    width: 0%;
    height: 3px;
    background-color: #f1683a;
    left: 0;
    top: 0;
  }

.time.running {
    animation: ${runningTime} 7s linear 1 forwards;
  }

&.prev .list .item:nth-child(2) {
  z-index: 2;
}

&.prev .list .item:nth-child(2) img {
  animation: ${showImagePrev} 0.6s cubic-bezier(0.23, 1, 0.32, 1) 1 forwards;
  position: absolute;
}

&.prev .thumbnail .item:nth-child(1) {
  overflow: hidden;
  opacity: 0;
  animation: ${showThumbnail} 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1 forwards;
}

  &.next .arrows button,
  &.prev .arrows button {
    pointer-events: none;
  }

  &.prev .list .item:nth-child(2) .content .author,
   &.prev .list .item:nth-child(2) .content .nameuserstar2345,
  &.prev .list .item:nth-child(2) .content .nameuserstar23,
  &.prev .list .item:nth-child(2) .content .title,
  &.prev .list .item:nth-child(2) .content .topic,
  &.prev .list .item:nth-child(2) .content .des,
  &.prev .list .item:nth-child(2) .content .buttons {
    animation: ${contentOut} 0.5s ease-out 1 forwards !important;
  }

  &.prev .list .item img {
    z-index: 100;
  }

  @media screen and (max-width: 678px) {
    .list .item .content {
      padding-right: 0;
    }
    .list .item .content .title {
      font-size: 30px;
    }
  }
`;

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
  }, [user]);

  const saveWatchList = async (movie) => {
    if (user?.email) {
      await updateDoc(movieID, {
        savedWatchLater: arrayUnion({
          id: movie.id,
          title: movie.name || movie.title,
          img: movie.backdrop_path,
          media_type: movie.media_type,
        })
      });
      const title435 = movie?.title || movie?.name;
      const msgg = title435 + " " + "added to Watch later list";
      toast.success(msgg);
    } else {
      const title234456 = movie.name || movie.title;
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
  const [isInitialized, setIsInitialized] = useState(false);

  const [slidesOrder, setSlidesOrder] = useState([]);

  useEffect(() => {
    if (data?.results) {
      setSlidesOrder(Array.from({ length: data.results.length }, (_, i) => i));
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
  }, type === 'prev' ? 800 : 600);
};

  useEffect(() => {
    if (!isInitialized) return;
    const timer = setTimeout(() => {
      showSlider('next');
    }, 7000);
    return () => clearTimeout(timer);
  }, [slidesOrder, isInitialized]);

  useEffect(() => {
    if (!loading && data?.results?.length > 0) {
      setShowCarousel(true);
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading, data]);

  const handleThumbnailClick = (clickedIndex) => {
    const n = data?.results?.length || 0;
    if (n > 0) {
      const newSlidesOrder = Array.from({ length: n }, (_, i) => (clickedIndex + i) % n);
      setSlidesOrder(newSlidesOrder);
    }
  };

  return (
    <>
      {showCarousel && data?.results?.length > 0 ? (
        <div className="container-home-banner">
          <CarouselStar className={`${transitionDirection || ''} ${!isInitialized ? 'initializing' : ''}`}>
            <div className="list">
              {slidesOrder.map((slideIndex, index) => {
                const slide = data?.results[slideIndex];
                const backdrop_path = slide?.backdrop_path
                  ? url.backdrop + slide?.backdrop_path
                  : "";
                return (
                  <div 
                    key={slideIndex} 
                    className="item"
                    style={{
                      display: !isInitialized && index !== 0 ? 'none' : 'block'
                    }}
                  >
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
          </CarouselStar>
           <OpacityLayerStr43 />
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

const OpacityLayerStr43 = styled.div`
  /* Add your styles here */
    width: 100%;
    height: 127px;
    background: var(--opacity-layer);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9;
`;
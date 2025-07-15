import React, { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import PlayerControls from './components/PlayerControls/PlayerControls';
import EpisodeList from './components/EpisodeList/EpisodeList';
import ShowDetails from './components/ShowDetails/ShowDetails';
import './StreamPage.css';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Helmet } from 'react-helmet-async';

function StreamPage() {

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

  const [collectionData, setCollectionData] = useState(null);
  const [collectionLoading, setCollectionLoading] = useState(true);

  const { mediaType, id, season, episode } = useParams();

  const { data: detailsData, loading: detailsLoading } = useFetch(`/${mediaType}/${id}`);
  const { data: video, loading: videoLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const { data: episodes, loading: episloading } = useFetch(`/${mediaType}/${id}/season/${season}`);

  const Collection = detailsData && detailsData?.belongs_to_collection?.id;
  const Seasons = detailsData && detailsData?.seasons;
  const episodesLength = episodes?.episodes?.length;

  // const { data: collectioData, loading: collectionLoading } = useFetch(`/collection/${Collection}`);
   useEffect(() => {
      if (Collection) {
        const url = `https://api.themoviedb.org/3/collection/${Collection}`;
        fetchData(url, setCollectionData, setCollectionLoading);
      }
    }, [Collection, mediaType, id]);
  return (
    <>
      <Helmet>
        <title>{`Streaming ${detailsData?.name || detailsData?.title} ${mediaType || ""} | Moviesverse`}</title>
        <meta name="description" content="Stream page for movies and tv shows where users can watch their favourite content in different languages with multiple servers. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free."/>
        <meta property="og:title" content={`Streaming ${detailsData?.name || detailsData?.title} ${mediaType || ""} | Moviesverse`} />
        <meta property="og:description" content="Stream page for movies and tv shows where users can watch their favourite content in different languages with multiple servers. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
      </Helmet>
      <div className="stream-page-container">
        {/* Mobile Layout */}
        <div className="mobile-layout">
          {/* Mobile: Player Section */}
          <div className="mobile-player-section">
            <div className="player-content">
              <VideoPlayer mediaType={mediaType} id={id} season={season} episode={episode} />
            </div>
            <div className="player-controls">
              <PlayerControls />
            </div>
          </div>

          {/* Mobile: Episodes Section */}
          <div className="mobile-episodes-section">
            <EpisodeList CollectionId={Collection} Seasons={Seasons} mediaType={mediaType} id={id} />
          </div>

          {/* Mobile: Show Details */}
          <div className="mobile-show-details">
            <ShowDetails data={detailsData} video={video} crew={credits?.crew} />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="desktop-layout">
          {/* Desktop: Main Content - Full Viewport Height */}
          <div className="desktop-main-content">
            {/* Left side - Video Player and Controls */}
            <div className="desktop-player-section">
              <div className="video-player-wrapper">
                <VideoPlayer mediaType={mediaType} id={id} />
              </div>
              <div className="desktop-controls">
                <PlayerControls episodesLength={episodesLength} />
              </div>
            </div>

            {/* Right side - Episode List */}
             <EpisodeList Seasons={Seasons} mediaType={mediaType} id={id} collectioData={collectionData} collectionLoading={collectionLoading} />
          </div>

          {/* Desktop: Show Details Section - Below the main content */}
          <div className="desktop-show-details">
            <ShowDetails data={detailsData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default StreamPage;
import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import PlayerControls from './components/PlayerControls/PlayerControls';
import EpisodeList from './components/EpisodeList/EpisodeList';
import ShowDetails from './components/ShowDetails/ShowDetails';
import './StreamPage.css';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Helmet } from 'react-helmet';

function StreamPage() {

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
  return (
    <>
      <Helmet>
        <title>{'Streaming ' + detailsData?.name || detailsData?.title + " | Movix"}</title>
        <meta name="description" content="Discover and stream your favorite Movies and TV Shows with our powerful MERN stack app using TMDB API. Features include Firebase authentication, dynamic recommendations, search and explore pages, global state with Redux, Watchlist/Likes, and seamless content streaming with full error handling." />
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
            {mediaType === 'tv' && <div className="episode-list-wrapper">
              <EpisodeList CollectionId={Collection} Seasons={Seasons} mediaType={mediaType} id={id} />
            </div>}
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
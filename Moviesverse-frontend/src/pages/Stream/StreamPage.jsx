import React, { useContext, useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import PlayerControls from './components/PlayerControls/PlayerControls';
import EpisodeList from './components/EpisodeList/EpisodeList';
import ShowDetails from './components/ShowDetails/ShowDetails';
import './StreamPage.css';
import { useParams, useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Helmet } from 'react-helmet-async';
import { ValuesContext } from '../../context/ValuesContext';
import { UserAuth } from '../../context/AuthContext';

function StreamPage() {

  const fetchData = (url, setData, setLoading) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJkMmM2YWZlNTMwYmJhYTEyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zgqx7AWkKbNhLnQgNMY8u8Ei_9e34RRD-cAXyDMlfc8'
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

  const {
    isOnStream,
    setSeason,
    setEpisode,
    setLanguage,
    setEndpoint,
    seLantEndpoint
  } = useContext(ValuesContext);
  const { user } = UserAuth();
  const [collectionData, setCollectionData] = useState(null);
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [isEpisodeListOpen, setIsEpisodeListOpen] = useState(true);

  const { mediaType, id, season, episode } = useParams();
  const [searchParams] = useSearchParams();

  const canonicalUrl = `https://moviesverse.studio/stream/${mediaType}/${id}/${season || '1'}/${episode || '1'}`;

  const { data: detailsData, loading: detailsLoading } = useFetch(`/${mediaType}/${id}`);
  const { data: video, loading: videoLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const { data: episodes, loading: episloading } = useFetch(`/${mediaType}/${id}/season/${season}`);

  const Collection = detailsData && detailsData?.belongs_to_collection?.id;
  const Seasons = detailsData && detailsData?.seasons;
  const episodesLength = episodes?.episodes?.length;

  useEffect(() => {
    if (Collection) {
      const url = `https://api.themoviedb.org/3/collection/${Collection}`;
      fetchData(url, setCollectionData, setCollectionLoading);
    } else {
      setCollectionLoading(false);
    }
  }, [Collection, mediaType, id]);

  useEffect(() => {
    setSeason(season);
    setEpisode(episode);
    setLanguage(searchParams.get('lang') || 'Original');
    setEndpoint(searchParams.get('ep') || 'xyz');
    seLantEndpoint(searchParams.get('lep') || 'one');
    window.scrollTo(0, 0);
  }, [
    mediaType,
    id,
    season,
    episode,
    searchParams,
    setSeason,
    setEpisode,
    setLanguage,
    setEndpoint,
    seLantEndpoint
  ]);

useEffect(() => {
    // Debounce or initial check conditions
    if (!user || !user.uid || detailsLoading || (mediaType === 'tv' && episloading)) {
      // Don't save if not logged in, essential data is still loading,
      // or if required details for TV episode name aren't ready
      return;
    }

    // Set a timer to save after 3 minutes
    const timerId = setTimeout(() => {
      const saveWatchHistory = () => {
        try {
          const historyKey = "watchHistory";
          const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

          // 1. Retrieve and Parse Existing History
          const rawHistory = localStorage.getItem(historyKey);
          let history = {};
          if (rawHistory) {
            try {
              history = JSON.parse(rawHistory);
              if (typeof history !== 'object' || history === null) {
                 // Handle case where localStorage contains invalid JSON
                 console.warn("Invalid watch history found in localStorage. Resetting.");
                 history = {};
              }
            } catch (parseError) {
              console.error("Failed to parse watch history from localStorage:", parseError);
              history = {}; // Reset history if parsing fails
            }
          }

          const userHistory = history[user.uid] || [];

          // 2. Filter out expired items
          const cleanUserHistory = userHistory.filter(item => item.timestamp && item.timestamp > sevenDaysAgo);

          // 3. Check if the current item already exists
          const existingItemIndex = cleanUserHistory.findIndex(item => {
            if (item.id !== id || item.mediaType !== mediaType) return false;
            if (mediaType === "movie") return true; // Match found for movie
            // For TV, also check season and episode
            return item.season == season && item.episode == episode;
          });

          let finalHistory;

          if (existingItemIndex > -1) {
            // --- Item Found: Move to Front ---
            // console.log("Watch History: Item found, moving to front.");
            // Get the existing item
            const existingItem = cleanUserHistory[existingItemIndex];
            // Update its timestamp
            existingItem.timestamp = Date.now();
            // Remove it from its old position
            cleanUserHistory.splice(existingItemIndex, 1);
            // Add the updated item to the beginning
            cleanUserHistory.unshift(existingItem);
            // The modified cleanUserHistory is our final history
            finalHistory = cleanUserHistory;

          } else {
            // --- Item Not Found: Add New ---
            // console.log("Watch History: New item, adding to front.");
            // Find current episode details if it's a TV show
            const currentEpisodeDetails = mediaType === 'tv'
              ? episodes?.episodes?.find(ep => ep.episode_number == episode)
              : null;

            // Prepare the new item
            const newItem = {
              mediaType,
              id,
              timestamp: Date.now(),
              name: detailsData?.name || detailsData?.title || "Unknown Title", // Add fallback
              poster: detailsData?.poster_path || null // Add fallback
            };

            if (mediaType === "tv") {
              newItem.season = season;
              newItem.episode = episode;
              newItem.episodeName = currentEpisodeDetails?.name || `Episode ${episode}`;
            }

            // Add the new item to the beginning of the clean history
            cleanUserHistory.unshift(newItem);
            // The modified cleanUserHistory is our final history
            finalHistory = cleanUserHistory;
          }

          // 4. Update localStorage
          history[user.uid] = finalHistory;
          localStorage.setItem(historyKey, JSON.stringify(history));

        } catch (error) {
          // Catch errors during the saving process (e.g., localStorage full)
          console.error("Failed to save watch history:", error);
          // Potential fallback: Notify user, clear old history, etc.
        }
      };

      saveWatchHistory();

    }, 180000); // 3 minutes (180,000 milliseconds)

    // Cleanup function to clear the timer if dependencies change before 3 minutes
    return () => {
      clearTimeout(timerId);
    };

    // Dependencies: Re-run effect if media, user, or essential data changes
  }, [mediaType, id, season, episode, user, detailsData, episodes, detailsLoading, episloading]);


  return (
    <>
      <Helmet>
        <title>{`Streaming ${detailsData?.name || detailsData?.title} ${mediaType === "tv" ? "Season " + season + " Episode " + episode : ""}, ${mediaType === "tv" ? mediaType.toUpperCase() + " Show" : mediaType.toUpperCase() || ""} | Moviesverse`}</title>
        <meta name="description" content="Stream page for movies and tv shows where users can watch their favourite content in different languages with multiple servers. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
        <meta property="og:title" content={`Streaming ${detailsData?.name || detailsData?.title} ${mediaType || ""} | Moviesverse`} />
        <meta property="og:description" content="Stream page for movies and tv shows where users can watch their favourite content in different languages with multiple servers. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="stream-page-container">
        <div className="mobile-layout">
          <div className="mobile-player-section">
            <div className="player-content">
              <VideoPlayer mediaType={mediaType} id={id} />
            </div>
            <div className="player-controls">
              <PlayerControls
                episodesLength={episodesLength}
                isEpisodeListOpen={isEpisodeListOpen}
                setIsEpisodeListOpen={setIsEpisodeListOpen}
              />
            </div>
          </div>

          <div className="mobile-episodes-section">
            <EpisodeList
              CollectionId={Collection}
              Seasons={Seasons}
              mediaType={mediaType}
              id={id}
              collectionData={collectionData}
              collectionLoading={collectionLoading}
              episodesData={episodes}
              episodesLoading={episloading}
              detailsData={detailsData}
            />
          </div>

          <div className="mobile-show-details">
            <ShowDetails data={detailsData} video={video} crew={credits?.crew} />
          </div>
        </div>

        <div className="desktop-layout">
          <div className={`desktop-main-content ${isEpisodeListOpen ? 'episodes-open' : 'episodes-closed'}`}>
            <div className={`desktop-player-section ${isOnStream ? 'on-stream' : ''}`}>
              <div className={`video-player-wrapper ${isOnStream ? 'on-stream' : ''}`}>
                <VideoPlayer mediaType={mediaType} id={id} />
              </div>
              <div className={`desktop-controls ${isOnStream ? 'on-stream' : ''}`}>
                <PlayerControls
                  episodesLength={episodesLength}
                  isEpisodeListOpen={isEpisodeListOpen}
                  setIsEpisodeListOpen={setIsEpisodeListOpen}
                />
              </div>
            </div>

            <EpisodeList
              Seasons={Seasons}
              mediaType={mediaType}
              id={id}
              collectionData={collectionData}
              collectionLoading={collectionLoading}
              episodesData={episodes}
              episodesLoading={episloading}
              detailsData={detailsData}
            />
          </div>

          <div className={`desktop-show-details ${isOnStream ? 'on-stream' : ''}`}>
            <ShowDetails data={detailsData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default StreamPage;
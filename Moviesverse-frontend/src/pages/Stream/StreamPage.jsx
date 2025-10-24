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
import ShowDetails2 from './components/ShowDetails2/ShowDetails2';

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
    setEndpoint(searchParams.get('ep') || 'ru');
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
    if (!user?.uid || detailsLoading || (mediaType === 'tv' && episloading)) {
      return;
    }

    if (!detailsData || (mediaType === 'tv' && !episodes?.episodes)) {
      return;
    }

    const timerId = setTimeout(() => {
      const saveWatchHistory = () => {
        try {
          const historyKey = "watchHistory";
          const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

          let history = {};
          const rawHistory = localStorage.getItem(historyKey);

          if (rawHistory) {
            try {
              const parsed = JSON.parse(rawHistory);
              if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                history = parsed;
              }
            } catch (e) {
              console.error("Failed to parse watch history:", e);
            }
          }

          const userHistory = Array.isArray(history[user.uid]) ? history[user.uid] : [];

          const cleanUserHistory = userHistory.filter(item =>
            item &&
            item.id &&
            item.mediaType &&
            item.timestamp &&
            item.timestamp > sevenDaysAgo
          );

          const currentEpisodeDetails = mediaType === 'tv'
            ? episodes.episodes.find(ep => String(ep.episode_number) === String(episode))
            : null;

          const newItem = {
            mediaType,
            id,
            timestamp: Date.now(),
            name: detailsData.name || detailsData.title || "Unknown Title",
            poster: detailsData.poster_path || null
          };

          if (mediaType === "tv") {
            newItem.season = String(season);
            newItem.episode = String(episode);
            newItem.episodeName = currentEpisodeDetails?.name || `Episode ${episode}`;
          }

          cleanUserHistory.unshift(newItem);

          history[user.uid] = cleanUserHistory;
          localStorage.setItem(historyKey, JSON.stringify(history));

          console.log("Watch history saved successfully:", newItem);

        } catch (error) {
          console.error("Failed to save watch history:", error);
        }
      };

      saveWatchHistory();

    }, 180000);

    return () => clearTimeout(timerId);

  }, [mediaType, id, season, episode]);

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
            <ShowDetails2 data={detailsData} video={video} crew={credits?.crew} />
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
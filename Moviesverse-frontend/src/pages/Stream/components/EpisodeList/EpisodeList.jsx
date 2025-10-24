import React, { useContext, useState, useMemo, useRef, useEffect } from 'react';
import { List, Grid3X3, ChevronDown } from 'lucide-react';
import './EpisodeList.css';
import useFetch from '../../../../hooks/useFetch';
import { ValuesContext } from '../../../../context/ValuesContext';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

const EpisodeList = ({
  id,
  mediaType,
  Seasons,
  collectionData,
  collectionLoading,
  episodesData: initialEpisodesData,
  episodesLoading: initialEpisodesLoading,
  detailsData: initialDetailsData
}) => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const [viewMode, setViewMode] = useState('list');

  const { url } = useSelector((state) => state.home);
  const {
    episode: episodeNum,
    season: seasonNum,
    setSeason,
    setEpisode,
    isOnStream
  } = useContext(ValuesContext);

  const { data: apiTestData, loading: apiTestLoading } = useFetch('/trending/all/day');

  const { data: episode, loading: episodeLoading } = useFetch(`/${mediaType}/${id}/season/${seasonNum}`);
  const { data: detailsData, loading: detailsLoading } = useFetch(`/${mediaType}/${id}`);

  const episodesData = apiTestData ? episode : initialEpisodesData;
  const episodesLoadingCombined = apiTestLoading || (apiTestData ? episodeLoading : initialEpisodesLoading);
  const detailsDataCombined = apiTestData ? detailsData : initialDetailsData;
  const detailsLoadingCombined = apiTestLoading || (apiTestData ? detailsLoading : false);


  const scrollContainerRef = useRef(null);
  const activeItemRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const item = activeItemRef.current;

      const itemOffsetTop = item.offsetTop;
      const containerPaddingTop = parseFloat(getComputedStyle(container).paddingTop) || 0;

      container.scrollTo({
        top: itemOffsetTop - containerPaddingTop - 10,
        behavior: 'smooth'
      });
    }
  }, [episodeNum, seasonNum, id, viewMode, episodesData]);

  const computedValues = useMemo(() => {
    const isTvShow = mediaType === 'tv';
    const filteredEpisodes = episodesData?.episodes;
    const items = isTvShow ? filteredEpisodes : collectionData?.parts;

    const isLoading = isTvShow
      ? episodesLoadingCombined
      : collectionLoading && !detailsDataCombined;

    const hasValidCollection = !isTvShow && collectionData && Array.isArray(collectionData.parts) && collectionData.parts.length > 0;

    const hasValidEpisodes = isTvShow && filteredEpisodes && Array.isArray(filteredEpisodes) && filteredEpisodes.length > 0;
    const hasNoEpisodes = isTvShow && !episodesLoadingCombined && (!filteredEpisodes || filteredEpisodes.length === 0);

    const shouldRenderFallback = !isTvShow && !isLoading && !hasValidCollection && detailsDataCombined;

    return {
      isTvShow,
      items,
      isLoading,
      hasValidCollection,
      hasValidEpisodes,
      hasNoEpisodes,
      shouldRenderFallback,
      filteredEpisodes
    };
  }, [
    mediaType,
    episodesData,
    collectionData,
    collectionLoading,
    episodesLoadingCombined,
    detailsDataCombined
  ]);

  const getImageUrl = (imagePath) => {
    if (!url?.poster || !imagePath) return '/placeholder-image.jpg';
    return url.poster + imagePath;
  };

  const formatDate = (date, format = "MMM D, YYYY") => {
    if (!date) return 'N/A';
    try {
      return dayjs(date).format(format);
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleEpisodeClick = (episodeNumber) => {
    if (typeof setEpisode === 'function') {
      setEpisode(episodeNumber);
      const searchParams = new URLSearchParams(window.location.search);
      navigate(`/stream/${mediaType}/${id}/${seasonNum}/${episodeNumber}?${searchParams.toString()}`);
    }
  };

  const handleMovieClick = (movieId) => {
    if (movieId && navigate) {
      const searchParams = new URLSearchParams(window.location.search);
      navigate(`/stream/movie/${movieId}/1/1?${searchParams.toString()}`);
    }
  };

  const handleSeasonChange = (seasonNumber) => {
    if (typeof setSeason === 'function') {
      setSeason(seasonNumber);
      const searchParams = new URLSearchParams(window.location.search);
      navigate(`/stream/${mediaType}/${id}/${seasonNumber}/1?${searchParams.toString()}`);
    }
  };

  const renderTvEpisodeListItem = (item, index) => (
    <div
      key={`episode-${item.id}-${index}`}
      className={`episode-list-item gap-x-2 ${item.episode_number == episodeNum ? 'episode-list-item-active' : ''}`}
      onClick={() => handleEpisodeClick(item.episode_number)}
      role="button"
      tabIndex={0}
      ref={item.episode_number == episodeNum ? activeItemRef : null}
    >
      <div className='flex flex-row gap-x-2'>
        <img
          src={getImageUrl(item.still_path)}
          alt={item.name || `Episode ${item.episode_number}`}
          className="episode-thumbnail"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        <div className={`episode-details ${isMobile && 'flex flex-col items-start justify-start gap-2'}`}>
          <h4 className="episode-title truncate">{item.name || `Episode ${item.episode_number}`}</h4>
          <div className="episode-meta">
            <span>Ep {item.episode_number}</span>
            {item.air_date && (
              <>
                <span className="episode-meta-divider">•</span>
                <span>{formatDate(item.air_date)}</span>
              </>
            )}
            {item.runtime && (
              <>
                <span className="episode-meta-divider">•</span>
                <span>{item.runtime} min</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='hidden sm:flex mr-1'>
        <span className={`text-4xl ${item?.episode_number == episodeNum ? 'text-[#0998a8]' : 'text-white'}`}>{item?.episode_number}</span>
      </div>
    </div>
  );

  const renderMovieListItem = (item, index) => (
    <div
      key={`movie-${item.id}-${index}`}
      className={`episode-list-item ${item.id == paramId ? 'episode-list-item-active' : ''}`}
      onClick={() => handleMovieClick(item.id)}
      role="button"
      tabIndex={0}
      ref={item.id == paramId ? activeItemRef : null}
    >
      <img
        src={getImageUrl(item.poster_path)}
        alt={item.title || `Movie ${index + 1}`}
        className="episode-thumbnail"
        onError={(e) => {
          e.target.src = '/placeholder-image.jpg';
        }}
      />
      <div className="episode-details">
        <h4 className="episode-title">{item.title || `Movie ${index + 1}`}</h4>
        <div className="episode-meta">
          <span>Part {index + 1}</span>
          {item.release_date && (
            <>
              <span className="episode-meta-divider">•</span>
              <span>{formatDate(item.release_date)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderTvEpisodeGridItem = (item, index) => (
    <div
      key={`episode-grid-${item.id}-${index}`}
      className={`episode-grid-item ${item.episode_number == episodeNum ? 'episode-grid-item-active' : ''}`}
      onClick={() => handleEpisodeClick(item.episode_number)}
      role="button"
      tabIndex={0}
      ref={item.episode_number == episodeNum ? activeItemRef : null}
    >
      <div className="episode-grid-content">
        <div className="episode-grid-number">{item.episode_number}</div>
        <div className="episode-grid-episode">{item.runtime ? `${item.runtime} min` : 'N/A'}</div>
      </div>
    </div>
  );

  const renderMovieGridItem = (item, index) => (
    <div
      key={`movie-grid-${item.id}-${index}`}
      className={`episode-grid-item ${item.id == paramId ? 'episode-grid-item-active' : ''}`}
      onClick={() => handleMovieClick(item.id)}
      role="button"
      tabIndex={0}
      ref={item.id == paramId ? activeItemRef : null}
    >
      <div className="episode-grid-content">
        <div className="episode-grid-number">{index + 1}</div>
        <div>{formatDate(item.release_date, "YYYY")}</div>
      </div>
    </div>
  );

  const renderFallbackItem = (isListView = true) => {
    const fallbackData = detailsDataCombined || { title: 'Loading...', name: 'Loading...', release_date: null };

    const commonContent = (
      <>
        <img
          src={getImageUrl(fallbackData.poster_path)}
          alt={fallbackData.title || fallbackData.name || 'Media'}
          className="episode-thumbnail"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        <div className={isListView ? "episode-details" : "episode-grid-content"}>
          {isListView ? (
            <>
              <h4 className="episode-title">{fallbackData.title || fallbackData.name}</h4>
              <div className="episode-meta">
                <span>1</span>
                {fallbackData.release_date && (
                  <>
                    <span className="episode-meta-divider">•</span>
                    <span>{formatDate(fallbackData.release_date)}</span>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="episode-grid-number">1</div>
              <div>{formatDate(fallbackData.release_date, "YYYY")}</div>
            </>
          )}
        </div>
      </>
    );

    return (
      <div
        className={`${isListView ? 'episode-list-item' : 'episode-grid-item'} episode-${isListView ? 'list' : 'grid'}-item-active`}
        ref={activeItemRef}
      >
        {commonContent}
      </div>
    );
  };

  const renderListView = () => (
    <div className="episode-list-container">
      {computedValues.isLoading ? (
        <div className="episode-loader-container">
          <div className="episode-loader"></div>
        </div>
      ) : (
        <>
          {computedValues.isTvShow && computedValues.hasValidEpisodes &&
            computedValues.items.map((item, index) => renderTvEpisodeListItem(item, index))
          }
          {!computedValues.isTvShow && computedValues.hasValidCollection &&
            computedValues.items.map((item, index) => renderMovieListItem(item, index))
          }
          {computedValues.hasNoEpisodes && (
            <div className="no-content">No episodes found for this season</div>
          )}
          {computedValues.shouldRenderFallback && renderFallbackItem(true)}
          {!computedValues.isTvShow && !computedValues.hasValidCollection && !computedValues.shouldRenderFallback && (
            <div className="no-content">Loading movie details...</div>
          )}
        </>
      )}
    </div>
  );

  const renderGridView = () => (
    <div className="episode-grid">
      {computedValues.isLoading ? (
        <div className="episode-loader-container">
          <div className="episode-loader"></div>
        </div>
      ) : (
        <>
          {computedValues.isTvShow && computedValues.hasValidEpisodes &&
            computedValues.items.map((item, index) => renderTvEpisodeGridItem(item, index))
          }
          {!computedValues.isTvShow && computedValues.hasValidCollection &&
            computedValues.items.map((item, index) => renderMovieGridItem(item, index))
          }
          {computedValues.hasNoEpisodes && (
            <div className="no-content">No episodes found for this season</div>
          )}
          {computedValues.shouldRenderFallback && renderFallbackItem(false)}
          {!computedValues.isTvShow && !computedValues.hasValidCollection && !computedValues.shouldRenderFallback && (
            <div className="no-content">Loading movie details...</div>
          )}
        </>
      )}
    </div>
  );

  const getHeaderTitle = () => {
    if (computedValues.isTvShow) {
      const episodeCount = computedValues.filteredEpisodes?.length || 0;
      return `List of episodes (${episodeCount})`;
    }
    if (computedValues.hasValidCollection) {
      return `Belongs to ${detailsDataCombined?.title || 'Collection'}`;
    }
    return 'No Collection Found';
  };

  if (apiTestLoading) {
    return (
      <div className={`episode-container ${isOnStream ? 'on-stream' : ''}`}>
        <div className="episode-loader-container" style={{ minHeight: '100%' }}>
          <div className="episode-loader"></div>
        </div>
      </div>
    );
  }

  if (!apiTestData && !apiTestLoading) {
    return (
      <div className={`episode-container ${isOnStream ? 'on-stream' : ''}`}>
        <div className="server-error-container">
          <h3 className="server-error-title">Server Error</h3>
          <p className="server-error-text">The server is down for now.</p>
          <p className="server-error-text">Please try again in some time.</p>
          <button
            className="server-error-button"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`episode-container ${isOnStream ? 'on-stream' : ''}`}>
      {computedValues.isTvShow && Seasons && Array.isArray(Seasons) && Seasons.length > 0 && (
        <>
          <div className="mobile-season-selector">
            <div className="season-selector-wrapper">
              <select
                className="season-dropdown"
                value={seasonNum}
                onChange={(e) => handleSeasonChange(e.target.value)}
              >
                {Seasons.filter(season => season.name !== "Specials").map((season) => (
                  <option
                    key={`mobile-season-${season.id}`}
                    value={season.season_number}
                  >
                    {season.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="season-dropdown-icon" />
            </div>
          </div>

          <div className="desktop-season-selector">
            <div className="season-pills">
              {Seasons.filter(season => season.name !== "Specials").map((season) => (
                <button
                  key={`season-${season.id}`}
                  onClick={() => handleSeasonChange(season?.season_number)}
                  className={`season-pill ${seasonNum == season?.season_number ? 'season-pill-active' : ''}`}
                  disabled={!season?.season_number}
                >
                  {`Season ${season?.season_number}`}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="episode-header">
        <h3 className="episode-header-title">
          {getHeaderTitle()}
        </h3>
        <div className="view-toggle">
          <button
            onClick={() => setViewMode('list')}
            className={`view-toggle-button ${viewMode === 'list' ? 'view-toggle-active' : ''}`}
            aria-label="List view"
          >
            <List className="view-icon" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`view-toggle-button ${viewMode === 'grid' ? 'view-toggle-active' : ''}`}
            aria-label="Grid view"
          >
            <Grid3X3 className="view-icon" />
          </button>
        </div>
      </div>
      <div className="episode-content" ref={scrollContainerRef}>
        {viewMode === 'list' ? renderListView() : renderGridView()}
      </div>
    </div>
  );
};

export default EpisodeList;
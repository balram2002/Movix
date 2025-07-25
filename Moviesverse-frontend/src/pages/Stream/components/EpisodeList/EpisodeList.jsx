import React, { useContext, useState, useMemo } from 'react';
import { List, Grid3X3, ChevronDown } from 'lucide-react';
import './EpisodeList.css';
import useFetch from '../../../../hooks/useFetch';
import { ValuesContext } from '../../../../context/ValuesContext';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const EpisodeList = ({ id, mediaType, Seasons, collectioData, collectionLoading }) => {
  const navigate = useNavigate();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  
  const { url } = useSelector((state) => state.home);
  const { 
    endpoint, 
    server, 
    episode: episodeNum, 
    season: seasonNum, 
    setSeason, 
    setEpisode,
    isOnStream 
  } = useContext(ValuesContext);

  const { data: episode, loading: episodeLoading } = useFetch(`/${mediaType}/${id}/season/${seasonNum}`);
  const { data: detailsData, loading: detailsLoading } = useFetch(`/${mediaType}/${id}`);

  const computedValues = useMemo(() => {
    const isTvShow = mediaType === 'tv';
    const filteredEpisodes = episode?.episodes;
    const items = isTvShow ? filteredEpisodes : collectioData?.parts;
    
    const isLoading = isTvShow 
      ? episodeLoading 
      : collectionLoading && !detailsData;
    
    const hasValidCollection = !isTvShow && collectioData && Array.isArray(collectioData.parts) && collectioData.parts.length > 0;
    const hasNoCollection = !isTvShow && !collectioData && !collectionLoading;
    const hasEmptyCollection = !isTvShow && collectioData && (!collectioData.parts || collectioData.parts.length === 0);
    
    const hasValidEpisodes = isTvShow && filteredEpisodes && Array.isArray(filteredEpisodes) && filteredEpisodes.length > 0;
    const hasNoEpisodes = isTvShow && !episodeLoading && (!filteredEpisodes || filteredEpisodes.length === 0);
    
    const shouldRenderFallback = !isTvShow && !isLoading && !hasValidCollection && !detailsLoading;
    
    return {
      isTvShow,
      items,
      isLoading,
      hasValidCollection,
      hasNoCollection,
      hasEmptyCollection,
      hasValidEpisodes,
      hasNoEpisodes,
      shouldRenderFallback,
      filteredEpisodes
    };
  }, [mediaType, episode, collectioData, collectionLoading, episodeLoading, detailsData, detailsLoading]);

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
    }
  };

  const handleMovieClick = (movieId) => {
    if (movieId && navigate) {
      navigate(`/stream/movie/${movieId}/0/0`);
    }
  };

  const renderTvEpisodeListItem = (item, index) => (
    <div
      key={`episode-${item.id}-${index}`}
      className={`episode-list-item ${item.episode_number === episodeNum ? 'episode-list-item-active' : ''}`}
      onClick={() => handleEpisodeClick(item.episode_number)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleEpisodeClick(item.episode_number);
        }
      }}
    >
      <img 
        src={getImageUrl(item.still_path)} 
        alt={item.name || `Episode ${item.episode_number}`} 
        className="episode-thumbnail"
        onError={(e) => {
          e.target.src = '/placeholder-image.jpg';
        }}
      />
      <div className="episode-details">
        <h4 className="episode-title">{item.name || `Episode ${item.episode_number}`}</h4>
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
  );

  const renderMovieListItem = (item, index) => (
    <div
      key={`movie-${item.id}-${index}`}
      className={`episode-list-item ${item.id === parseInt(id) ? 'episode-list-item-active' : ''}`}
      onClick={() => handleMovieClick(item.id)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleMovieClick(item.id);
        }
      }}
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
      className={`episode-grid-item ${item.episode_number === episodeNum ? 'episode-grid-item-active' : ''}`}
      onClick={() => handleEpisodeClick(item.episode_number)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleEpisodeClick(item.episode_number);
        }
      }}
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
      className={`episode-grid-item ${item.id === parseInt(id) ? 'episode-grid-item-active' : ''}`}
      onClick={() => handleMovieClick(item.id)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleMovieClick(item.id);
        }
      }}
    >
      <div className="episode-grid-content">
        <div className="episode-grid-number">{index + 1}</div>
        <div>{formatDate(item.release_date, "YYYY")}</div>
      </div>
    </div>
  );

  const renderFallbackItem = (isListView = true) => {
    const fallbackData = detailsData || { title: 'Loading...', name: 'Loading...', release_date: null };

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
      <div className={`${isListView ? 'episode-list-item' : 'episode-grid-item'} episode-${isListView ? 'list' : 'grid'}-item-active`}>
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
      return `Belongs to ${detailsData?.title || 'Collection'}`;
    }
    return 'No Collection Found';
  };

  const handleSeasonChange = (seasonNumber) => {
    if (typeof setSeason === 'function') {
      setSeason(seasonNumber);
    }
  };

  return (
    <div className={`episode-container ${isOnStream ? 'on-stream' : ''}`}>
      {computedValues.isTvShow && Seasons && Array.isArray(Seasons) && Seasons.length > 0 && (
        <div className="desktop-season-selector">
          <div className="season-pills">
            {Seasons.filter(season => season.name !== "Specials").map((season) => (
              <button
                key={`season-${season.id}`}
                onClick={() => handleSeasonChange(season?.season_number)}
                className={`season-pill ${seasonNum === season?.season_number ? 'season-pill-active' : ''}`}
                disabled={!season?.season_number}
              >
                {`Season ${season?.season_number}`}
              </button>
            ))}
          </div>
        </div>
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
      <div className="episode-content">
        {viewMode === 'list' ? renderListView() : renderGridView()}
      </div>
    </div>
  );
};

export default EpisodeList;
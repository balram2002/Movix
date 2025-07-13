import React, { useContext, useState } from 'react';
import { List, Grid3X3, ChevronDown } from 'lucide-react';
import './EpisodeList.css';
import useFetch from '../../../../hooks/useFetch';
import { ValuesContext } from '../../../../context/ValuesContext';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const EpisodeList = ({id, mediaType, Seasons, collectionId}) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const { url } = useSelector((state) => state.home);
  const { endpoint, server, episode: episodeNum, season: seasonNum, setSeason, setEpisode } = useContext(ValuesContext);

  const { data: episode, loading: episloading } = useFetch(`/${mediaType}/${id}/season/${seasonNum}`);
  const { data: collectioData, loading: collectionLoading } = useFetch(`/collection/${collectionId}`);
  const { data: detailsData, loading: detailsLoading } = useFetch(`/${mediaType}/${id}`);

  const filteredEpisodes = episode?.episodes;
  const items = mediaType === 'tv' ? filteredEpisodes : collectioData?.parts;
  const isLoading = mediaType === 'tv' ? episloading : collectionLoading;

  console.log(collectioData?.parts);

  const renderListView = () => (
    <div className="episode-list-container">
      {isLoading ? (
        <div className="episode-loader-container">
          <div className="episode-loader"></div>
        </div>
      ) : items && items.length > 0 ? (
        items.map((item, index) => (
          mediaType === 'tv' ? (
            <div 
              key={item.id} 
              className={`episode-list-item ${item.episode_number === episodeNum ? 'episode-list-item-active' : ''}`} 
              onClick={() => setEpisode(item.episode_number)}
            >
              <img src={url?.poster + item.still_path} alt={item.name} className="episode-thumbnail" />
              <div className="episode-details">
                <h4 className="episode-title">{item.name}</h4>
                <div className="episode-meta">
                  <span>{item.episode_number}</span>
                  <span className="episode-meta-divider">•</span>
                  <span>{item.air_date}</span>
                  <span className="episode-meta-divider">•</span>
                  <span>{item.runtime} min</span>
                </div>
              </div>
            </div>
          ) : (
            <div 
              key={item.id} 
              className={`episode-list-item ${item?.id == id ? 'episode-list-item-active' : ''}`}
            >
              <img src={url?.poster + item.poster_path} alt={item.title} className="episode-thumbnail" />
              <div className="episode-details">
                <h4 className="episode-title">{item.title}</h4>
                <div className="episode-meta">
                  <span>{index + 1}</span>
                  <span className="episode-meta-divider">•</span>
                  <span>{dayjs(item?.release_date).format("MMM D, YYYY")}</span>
                </div>
              </div>
            </div>
          )
        ))
      ) : (
        <div className="no-content">{mediaType === 'tv' ? 'No episodes found' :
           <div 
              className={`episode-list-item episode-list-item-active`}
            >
              <img src={url?.poster + detailsData?.poster_path} alt={detailsData?.title || detailsData?.name} className="episode-thumbnail" />
              <div className="episode-details">
                <h4 className="episode-title">{detailsData?.title}</h4>
                <div className="episode-meta">
                  <span>{1}</span>
                  <span className="episode-meta-divider">•</span>
                  <span>{dayjs(detailsData?.release_date).format("MMM D, YYYY")}</span>
                </div>
              </div>
            </div>
            }
            </div>
      )}
    </div>
  );

  const renderGridView = () => (
    <div className="episode-grid">
      {isLoading ? (
        <div className="episode-loader-container">
          <div className="episode-loader"></div>
        </div>
      ) : items && items.length > 0 ? (
        items.map((item, index) => (
          mediaType === 'tv' ? (
            <div 
              key={item.id} 
              className={`episode-grid-item ${item.episode_number === episodeNum ? 'episode-grid-item-active' : ''}`} 
              onClick={() => setEpisode(item.episode_number)}
            >
              <div className="episode-grid-content">
                <div className="episode-grid-number">{item.episode_number}</div>
                <div className="episode-grid-episode">{item.runtime} min</div>
              </div>
            </div>
          ) : (
            <div 
              key={item.id} 
              className={`episode-grid-item ${item.id === id ? 'episode-grid-item-active' : ''}`}
            >
              <div className="episode-grid-content">
                <div className="episode-grid-number">{index + 1}</div>
                <div>{dayjs(item?.release_date).format("YYYY")}</div>
              </div>
            </div>
          )
        ))
      ) : (
        <div className="no-content">{mediaType === 'tv' ? 'No episodes found' : 
           <div 
              className={`episode-grid-item episode-grid-item-active`}
            >
              <div className="episode-grid-content">
                <div className="episode-grid-number">{1}</div>
                <div>{dayjs(detailsData?.release_date).format("YYYY")}</div>
              </div>
            </div>
            }</div>
      )}
    </div>
  );

  return (
    <div className="episode-container">
      {mediaType === 'tv' && (
        <div className="desktop-season-selector">
          <div className="season-pills">
            {Seasons?.map((season) => (
              <button
                key={season.id}
                onClick={() => setSeason(season.season_number)}
                className={`season-pill ${seasonNum === season.season_number ? 'season-pill-active' : ''}`}
              >
                {season.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="episode-header">
        <h3 className="episode-header-title">
          {mediaType === 'tv' 
            ? `List of episodes (${filteredEpisodes?.length || 0})` 
            : collectioData 
              ? `Belongs to ${detailsData.title}` 
              : 'No Collection Found'}
        </h3>
        <div className="view-toggle">
          <button
            onClick={() => setViewMode('list')}
            className={`view-toggle-button ${viewMode === 'list' ? 'view-toggle-active' : ''}`}
          >
            <List className="view-icon" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`view-toggle-button ${viewMode === 'grid' ? 'view-toggle-active' : ''}`}
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
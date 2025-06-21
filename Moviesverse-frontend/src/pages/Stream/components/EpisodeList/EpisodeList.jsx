import React, { useContext, useState } from 'react';
import { List, Grid3X3, ChevronDown } from 'lucide-react';
import './EpisodeList.css';
import useFetch from '../../../../hooks/useFetch';
import { ValuesContext } from '../../../../context/ValuesContext';
import { useSelector } from 'react-redux';

const EpisodeList = ({id, mediaType, Seasons, CollectionId}) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [viewMode, setViewMode] = useState('list');
      const { url } = useSelector((state) => state.home);
  const { endpoint, server, episode : episodeNum, season: seasonNum, setSeason, setEpisode } = useContext(ValuesContext);


  const { data: episode, loading: episloading } = useFetch(`/${mediaType}/${id}/season/${seasonNum}`);

  const filteredEpisodes = episode?.episodes;

  const renderListView = () => (
    <div className="episode-list-container">
  {episloading ? (
    <div className="episode-loader-container">
      <div className="episode-loader"></div>
    </div>
  ) : (
    filteredEpisodes?.map((episode) => (
 <div 
        key={episode.id} 
        className={`episode-list-item ${episode?.episode_number === episodeNum ? 'episode-list-item-active' : ''}`} onClick={()=>setEpisode(episode?.episode_number)}
      >        <img src={url?.poster + episode?.still_path} alt={episode.name} className="episode-thumbnail" />
        <div className="episode-details">
          <h4 className="episode-title">{episode.name || episode.title}</h4>
          <div className="episode-meta">
            <span>{episode.episode_number}</span>
            <span className="episode-meta-divider">•</span>
            <span>{episode.air_date}</span>
            <span className="episode-meta-divider">•</span>
            <span>{episode.runtime} min</span>
          </div>
        </div>
      </div>
    ))
  )}
</div>
  );

  const renderGridView = () => (
   <div className="episode-grid">
  {episloading ? (
    <div className="episode-loader-container">
      <div className="episode-loader"></div>
    </div>
  ) : (
    filteredEpisodes?.map((episode) => (
  <div 
        key={episode?.name} 
        className={`episode-grid-item ${episode?.episode_number === episodeNum ? 'episode-grid-item-active' : ''}`} onClick={()=>setEpisode(episode?.episode_number)}
      >        <div className="episode-grid-content">
          <div className="episode-grid-number">{episode?.episode_number}</div>
          <div className="episode-grid-episode">{episode?.runtime} min</div>
        </div>
      </div>
    ))
  )}
</div>
  );

  return (
    <div className="episode-container">
      <div className="desktop-season-selector">
        <div className="season-pills">
          {Seasons?.map((season, index) => (
            <button
              key={season}
              onClick={() => setSeason(season?.season_number)}
              className={`season-pill ${seasonNum === season?.season_number ? 'season-pill-active' : ''}`}
            >
              {season?.name}
            </button>
          ))}
        </div>
      </div>
      <div className="episode-header">
        <h3 className="episode-header-title">List of episodes ({filteredEpisodes?.length})</h3>
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
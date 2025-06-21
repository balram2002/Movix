import React, { useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PlayerControls.css';
import { toast } from 'react-toastify';
import { ValuesContext } from '../../../../context/ValuesContext';
import { useParams } from 'react-router-dom';

const PlayerControls = ({episodesLength}) => {
  const {mediaType} = useParams();
  const { setEpisode, setEndpoint, episode, endpoint } = useContext(ValuesContext);

  const handlePrevEpisode = () => {
    if (episode > 1) {
      setEpisode(episode - 1);
    }
  };

  const handleNextEpisode = () => {
    if (episode < episodesLength) {
      setEpisode(episode + 1);
    }
  };

  return (
    <div className="player-controls-container">
      <div className="server-buttons">
         <span className='server-label-playerarea'>Server : </span>
        <button className={`server-button ${endpoint === 'xyz' && 'server-button-active'}`} onClick={()=>{setEndpoint('xyz')}}>
           1
        </button>
        <button className={`server-button ${endpoint === 'net' && 'server-button-active'}`} onClick={()=>{setEndpoint('net')}}>
           2
        </button>
         <button className={`server-button ${endpoint === 'pm' && 'server-button-active'}`} onClick={()=>{setEndpoint('pm')}}>
           3
        </button>
        <button className={`server-button ${endpoint === 'vc' && 'server-button-active'}`} onClick={()=>{setEndpoint('vc')}}>
           4
        </button>
      </div>
      
     {mediaType === 'tv' && 
      <div className="navigation-buttons">
        <button 
          className="nav-button prev-button" 
          onClick={handlePrevEpisode} 
          disabled={episode <= 1}
        >
          <ChevronLeft className="nav-icon" />
          Prev
        </button>
        <button 
          className="nav-button next-button" 
          onClick={handleNextEpisode} 
          disabled={episode >= episodesLength}
        >
          Next
          <ChevronRight className="nav-icon" />
        </button>
      </div>
     }
    </div>
  );
};

export default PlayerControls;
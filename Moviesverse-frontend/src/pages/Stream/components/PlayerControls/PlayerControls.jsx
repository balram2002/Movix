import React, { useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PlayerControls.css';
import { toast } from 'react-toastify';
import { ValuesContext } from '../../../../context/ValuesContext';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SwitchTabs2 from '../../../../components/SwitchTabs2/SwitchTabs2';

const PlayerControls = ({ episodesLength, setIsEpisodeListOpen, isEpisodeListOpen }) => {
  const navigate = useNavigate();
  const { mediaType, id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setEpisode, setEndpoint, episode, endpoint, setLanguage: setLan, language: lan, seLantEndpoint, lanEndpoint, season } = useContext(ValuesContext);

  const currentEpisode = Number(episode);

  const updateQueryParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams, { replace: true });
  };

  const handlePrevEpisode = () => {
    if (currentEpisode > 1) {
      setEpisode(currentEpisode - 1);
      navigate(`/stream/${mediaType}/${id}/${season}/${currentEpisode - 1}?${searchParams.toString()}`);
    }
  };

  const handleNextEpisode = () => {
    if (currentEpisode < episodesLength) {
      setEpisode(currentEpisode + 1);
      navigate(`/stream/${mediaType}/${id}/${season}/${currentEpisode + 1}?${searchParams.toString()}`);
    }
  };

  const onTabChange = (tab) => {
    setLan(tab);
    updateQueryParam('lang', tab);
    if (tab === 'Hindi') {
      toast.info("Click on top-left corner of player to select Bollywood!");
    }
  };

  const handleEndpointChange = (value) => {
    setEndpoint(value);
    updateQueryParam('ep', value);
  };

  const handleLanEndpointChange = (value) => {
    seLantEndpoint(value);
    updateQueryParam('lep', value);
  };

  return (
    <>
      {mediaType === "tv" ?
        <div className='player-controls-container-movie'>
          <div className={`player-controls-container-movie-left ${mediaType === 'movie' && 'movie'}`}>
            <div className='player-controls-container-movie-left-episode'>
              <span className='server-label-playerarea'>Currently Watching : </span>
              <span className='server-label-playerarea'>Season: {season}</span>
              <span className='server-label-playerarea'>Episode: {episode}</span>
            </div>
          </div>

          <div className={`player-controls-container ${mediaType === 'tv' && 'tv'}`}>
            <div className='player-controls-container-lang'>
              <div className='lanswitchtab'> 
                <span className='server-label-playerarea'>Language : </span>
                <SwitchTabs2 data={["Original", "Hindi"]} onTabChange={onTabChange} currentTab={lan} />
              </div>
              <button
                className="episode-toggle-btn-controls"
                onClick={() => setIsEpisodeListOpen(!isEpisodeListOpen)}
                title={isEpisodeListOpen ? "Close Episodes" : "Open Episodes"}
              >
                {isEpisodeListOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            </div>

            <div className='player-controls-container-servers'>
              {lan === "Hindi" ?
                <div className="server-buttons">
                  <span className='server-label-playerarea'>Server : </span>
                  <button className={`server-button ${lanEndpoint === 'one' && 'server-button-active'}`} onClick={() => handleLanEndpointChange('one')}>
                    Vidify
                  </button>
                  <button className={`server-button ${lanEndpoint === 'two' && 'server-button-active'}`} onClick={() => handleLanEndpointChange('two')}>
                    AutoEmbed
                  </button>
                </div>
                :
                <div className="server-buttons">
                  <span className='server-label-playerarea'>Server : </span>
                  <button className={`server-button ${endpoint === 'ru' && 'server-button-active'}`} onClick={() => handleEndpointChange('ru')}>
                    1
                  </button>
                  <button className={`server-button ${endpoint === 'su' && 'server-button-active'}`} onClick={() => handleEndpointChange('su')}>
                    2
                  </button>
                  <button className={`server-button ${endpoint === 'xyz' && 'server-button-active'}`} onClick={() => handleEndpointChange('xyz')}>
                    3
                  </button>
                  <button className={`server-button ${endpoint === 'me' && 'server-button-active'}`} onClick={() => handleEndpointChange('me')}>
                    4
                  </button>
                </div>}

              {mediaType === 'tv' &&
                <div className="navigation-buttons">
                  <button
                    className="nav-button prev-button"
                    onClick={handlePrevEpisode}
                    disabled={currentEpisode <= 1}
                  >
                    <ChevronLeft className="nav-icon" />
                    Prev
                  </button>
                  <button
                    className="nav-button next-button"
                    onClick={handleNextEpisode}
                    disabled={currentEpisode >= episodesLength}
                  >
                    Next
                    <ChevronRight className="nav-icon" />
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
        :
        <div className='player-controls-container-movie'>
          <div className={`player-controls-container-movie-left ${mediaType === 'movie' && 'movie'}`}>
            <div className='player-controls-container-movie-left-episode'>
              <span className='server-label-playerarea'>Currently Watching : </span>
              <span className='server-label-playerarea'>Season: {season}</span>
              <span className='server-label-playerarea'>Episode: {episode}</span>
            </div>
          </div>
          <div className={`player-controls-container ${mediaType === 'tv' && 'tv'}`}>
            <div className='player-controls-container-lang'>
              <span className='server-label-playerarea'>Language : </span>
              <SwitchTabs2 data={["Original", "Hindi"]} onTabChange={onTabChange} currentTab={lan} />
            </div>

            <div className='player-controls-container-servers'>
              {lan === "Hindi" ?
                <div className="server-buttons">
                  <span className='server-label-playerarea'>Server : </span>
                  <button className={`server-button ${lanEndpoint === 'one' && 'server-button-active'}`} onClick={() => handleLanEndpointChange('one')}>
                    Vidify
                  </button>
                  <button className={`server-button ${lanEndpoint === 'two' && 'server-button-active'}`} onClick={() => handleLanEndpointChange('two')}>
                    AutoEmbed
                  </button>
                </div>
                :
                <div className="server-buttons">
                  <span className='server-label-playerarea'>Server : </span>
                  <button className={`server-button ${endpoint === 'xyz' && 'server-button-active'}`} onClick={() => handleEndpointChange('xyz')}>
                    1
                  </button>
                  <button className={`server-button ${endpoint === 'net' && 'server-button-active'}`} onClick={() => handleEndpointChange('net')}>
                    2
                  </button>
                  <button className={`server-button ${endpoint === 'pm' && 'server-button-active'}`} onClick={() => handleEndpointChange('pm')}>
                    3
                  </button>
                  <button className={`server-button ${endpoint === 'vc' && 'server-button-active'}`} onClick={() => handleEndpointChange('vc')}>
                    4
                  </button>
                </div>}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default PlayerControls;
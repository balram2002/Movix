import React, { useContext, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PlayerControls.css';
import { toast } from 'react-toastify';
import { ValuesContext } from '../../../../context/ValuesContext';
import { useParams } from 'react-router-dom';
import SwitchTabs from '../../../../components/switchTabs/SwitchTabs';

const PlayerControls = ({episodesLength}) => {
  const {mediaType} = useParams();
  const { setEpisode, setEndpoint, episode, endpoint, setLanguage: setLan, language: lan, seLantEndpoint, lanEndpoint } = useContext(ValuesContext);
    const [language, setLanguage] = useState("day");

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

   const onTabChange = (tab) => {
        setLanguage(tab === "Original" ? "Original" : "Hindi");
        setLan(tab);
        if(tab=== 'Hindi'){
          toast.info("Click on top-left corner of player to select Bollywood!");
        }
    };

  return (
  <>
  {mediaType === "tv" ?   <div className={`player-controls-container ${mediaType=== 'tv' && 'tv'}`}>
     <div className='player-controls-container-lang'>
       <span className='server-label-playerarea'>Language : </span>
           <SwitchTabs data={["Original", "Hindi"]} onTabChange={onTabChange} />
     </div>

     <div className='player-controls-container-servers'>
      {lan === "Hindi" ? 
      <div className="server-buttons">
         <span className='server-label-playerarea'>Server : </span>
        <button className={`server-button ${lanEndpoint === 'one' && 'server-button-active'}`} onClick={()=>{seLantEndpoint('one')}}>
           Vidify
        </button>
        <button className={`server-button ${lanEndpoint === 'two' && 'server-button-active'}`} onClick={()=>{seLantEndpoint('two')}}>
           AutoEmbed
        </button>
      </div>
       : 
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
      </div>}
      
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
    </div> 
     :

      <div className={`player-controls-container ${mediaType=== 'tv' && 'tv'}`}>
     <div className='player-controls-container-lang'>
       <span className='server-label-playerarea'>Language : </span>
           <SwitchTabs data={["Original", "Hindi"]} onTabChange={onTabChange} />
     </div>

     <div className='player-controls-container-servers'>
      {lan === "Hindi" ? 
      <div className="server-buttons">
         <span className='server-label-playerarea'>Server : </span>
        <button className={`server-button ${lanEndpoint === 'one' && 'server-button-active'}`} onClick={()=>{seLantEndpoint('one')}}>
           Vidify
        </button>
        <button className={`server-button ${lanEndpoint === 'two' && 'server-button-active'}`} onClick={()=>{seLantEndpoint('two')}}>
           AutoEmbed
        </button>
      </div>
       : 
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
      </div>}
     </div>
    </div>
    }
  </>
  );
};

export default PlayerControls;
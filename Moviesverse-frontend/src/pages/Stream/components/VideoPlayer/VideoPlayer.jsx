import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import './VideoPlayer.css';
import { ValuesContext } from '../../../../context/ValuesContext';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const {mediaType, id} = useParams();

   const { endpoint, server, episode : episodeNum, season: seasonNum, language, lanEndpoint } = useContext(ValuesContext);

  const [width, setWidth] = useState(window.innerWidth);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [id, seasonNum, episodeNum]);
  
  const preurl = lanEndpoint === 'one' ? `https://vidify.top/embed/${mediaType}/${id}${seasonNum && mediaType === "tv" ? "/" + seasonNum + "/" + episodeNum : ""}` :
  `https://player.autoembed.cc/embed/${mediaType}/${id}${seasonNum && mediaType === "tv" ? "/" + seasonNum + "/" + episodeNum : ""}` + '?server=2'
  const url = language === "Hindi" ? preurl : 
  `https://vidsrc.${endpoint}/embed/${mediaType}/${id}${seasonNum && mediaType === "tv" ? "/" + seasonNum + "/" + episodeNum : ""}`

  return (
    <div className={`video-player-container`}>
      {/* <ImageIcon className="video-placeholder-icon" /> */}
      <iframe
        src={url}
        className="iframe-stream"
        frameBorder="0"
        title="Movieverse video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
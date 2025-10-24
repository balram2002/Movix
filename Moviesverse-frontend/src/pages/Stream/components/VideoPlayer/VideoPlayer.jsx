import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import './VideoPlayer.css';
import { ValuesContext } from '../../../../context/ValuesContext';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const { mediaType, id } = useParams();

  const { endpoint, server, episode: episodeNum, season: seasonNum, language, lanEndpoint } = useContext(ValuesContext);

  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const headerOffset = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [id, seasonNum, episodeNum]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, seasonNum, episodeNum, endpoint, lanEndpoint, language]);

  
  const preurl = lanEndpoint === 'one' ? `https://vidify.top/embed/${mediaType}/${id}${seasonNum && mediaType === "tv" ? "/" + seasonNum + "/" + episodeNum : ""}` :
    `https://player.autoembed.cc/embed/${mediaType}/${id}${seasonNum && mediaType === "tv" ? "/" + seasonNum + "/" + episodeNum : ""}` + '?server=2';
  
  const getOriginalLanguageDomain = () => {
    if (endpoint === 'ru' || endpoint === 'su') {
      return `vidsrcme.${endpoint}`;
    }else if(endpoint === 'ru2'){
      return `vidsrc-me.ru`;
    }else if(endpoint === 'su2'){
      return `vidsrc-embed.su`;
    }
    return `vidsrc.${endpoint}`;
  };  
  const url = language === "Hindi" ? preurl :
    `https://${getOriginalLanguageDomain()}/embed/${mediaType}/${id}${seasonNum && mediaType === "tv" ? "/" + seasonNum + "/" + episodeNum : ""}`;

    console.log("Video URL:", url);

  return (
    <div className={`video-player-container`} >
      {isLoading && (
        <div className="video-loader-overlay">
          <div className="video-loader-spinner"></div>
        </div>
      )}
      <iframe
        src={url}
        ref={scrollRef}
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
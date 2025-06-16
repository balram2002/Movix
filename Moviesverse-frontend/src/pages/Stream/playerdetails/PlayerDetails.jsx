import React from "react";
import dateFormat from "dateformat";
import "./PlayerDetails.css";

export const PlayerDetails = ({ data, type }) => {
  const convertMinsToTime = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours ? `${hours}h ` : ""}${minutes}m`;
  };

  return (
    <div className={`stream-player-details ${type === "tv" ? "stream-md-w-2-5" : ""}`}>
      <div className="stream-image-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
          style={{
            backgroundImage: 'url("https://placehold.co/500x800/black/white?text=Image+Not+Found")',
            width: "100%",
            backgroundRepeat: "no-repeat",
          }}
          alt={data?.name || data?.title}
          className="stream-poster-image"
        />
      </div>
      <div className="stream-details">
        <h1 className="stream-title">{data?.name || data?.title}</h1>
        {data?.tagline && (
          <h3 className="stream-tagline">{data?.tagline}</h3>
        )}
        <p className="stream-genres">
          {data?.genres?.map((genre) => genre.name).slice(0, 3).join(", ")}
        </p>
        <p className="stream-release-info">
          {dateFormat(data?.release_date, "mmm d, yyyy")} • 
          {type === "person" ? data?.runtime : convertMinsToTime(data?.runtime || data?.episode_run_time)}
        </p>
        {type === "tv" && (
          <p className="stream-tv-info">
            seasons: <span className="stream-highlight">{data?.number_of_seasons}</span> • episodes: 
            <span className="stream-highlight">{data?.number_of_episodes}</span>
          </p>
        )}
        <p className="stream-overview">{data?.overview}</p>
      </div>
    </div>
  );
};
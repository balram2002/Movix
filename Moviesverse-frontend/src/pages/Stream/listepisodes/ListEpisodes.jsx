import { Popover } from "@headlessui/react";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import "./ListEpisodes.css";

export const ListEpisodes = ({
  id,
  noOfSeasons,
  currentSeason,
  selectedSeason,
  currentEpisode,
  onSeasonClick,
  seasonDetails,
}) => {
  const navigate = useNavigate();

  const onEpisodeClick = (season, episode) => {
    navigate(`/play/tv/${id}/${season}/${episode}`);
  };

  const convertMinsToTime = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours ? `${hours}h ` : ""}${minutes}m`;
  };

  const AllSeasons = () => {
    let seasons = [];
    for (let i = 1; i <= noOfSeasons; i++) {
      seasons.push(
        <button
          onClick={() => onSeasonClick(i)}
          key={i}
          className={`stream-season-button ${selectedSeason == i ? "stream-selected-season" : ""}`}
        >
          {selectedSeason == i && <FaCheck />}
          Season {i}
        </button>
      );
    }
    return seasons;
  };

  const DetailedEpisodeCard = ({ episode }) => {
    return (
      <button
        onClick={() =>
          onEpisodeClick(episode.season_number, episode.episode_number)
        }
        className={`stream-episode-card ${episode.season_number == currentSeason && episode.episode_number == currentEpisode ? "stream-selected-episode" : ""}`}
      >
        <div className="stream-episode-image-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
            alt={episode.name}
            className="stream-episode-image"
          />
        </div>
        <div className="flex-1 text-left">
          <h3 className="stream-episode-title">{episode.name}</h3>
          <p className="stream-episode-info">
            {"EP-" + episode.episode_number}  • {" "}
            {dateFormat(episode.air_date, "mmm d, yyyy")}  • 
            {convertMinsToTime(episode.runtime)}
          </p>
        </div>
      </button>
    );
  };

  const SimpleEpisodeCard = ({ episode }) => {
    return (
      <button
        onClick={() =>
          onEpisodeClick(episode.season_number, episode.episode_number)
        }
        className={`stream-simple-episode-card ${episode.season_number == currentSeason && episode.episode_number == currentEpisode ? "stream-selected-simple-episode selected" : ""}`}
      >
        <h3 className="stream-episode-title">{episode.episode_number}</h3>
      </button>
    );
  };

  return (
    <div className="stream-episodes-container">
      <Popover className="stream-popover">
        <Popover.Button className="stream-popover-button">
          Season {selectedSeason}
          <IoIosArrowDown />
        </Popover.Button>

        <Popover.Panel className="stream-popover-panel">
          <div className="stream-seasons-grid">
            <AllSeasons />
          </div>
        </Popover.Panel>
      </Popover>
      <h2 className="stream-episodes-header">
        List of episodes ({seasonDetails.episodes?.length})
      </h2>
      <div
        id="container"
        className={`stream-episodes-list ${seasonDetails.episodes?.length < 30 ? "stream-episodes-col" : "stream-episodes-wrap"}`}
      >
        {seasonDetails.episodes?.length < 30
          ? seasonDetails.episodes?.map((episode) => (
              <DetailedEpisodeCard key={episode.id} episode={episode} />
            ))
          : seasonDetails.episodes?.map((episode) => (
              <SimpleEpisodeCard key={episode.id} episode={episode} />
            ))}
      </div>
    </div>
  );
};
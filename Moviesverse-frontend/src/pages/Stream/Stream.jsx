import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { IoMdPricetags } from "react-icons/io";
import "./Stream.css";
import { ListEpisodes } from "./listepisodes/ListEpisodes";
import { PlayerDetails } from './playerdetails/PlayerDetails';
import CardSection from "./cardsection/CardSection";
import useFetch from './../../hooks/useFetch';

const StreamPage = () => {
  const { type, id, season, episode } = useParams();
  const { fetchData, selectedServer, servers, setServer } =
    useContext(ListContext);
  const [selectedSeason, setSelectedSeason] = useState(season);
  const [seasonDetails, setSeasonDetails] = useState({});
  const { data, loading, error } = useFetch(
    "/" + type + "/" + id,
    "&append_to_response=keywords"
  );

  useEffect(() => {
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  }, [id, episode, season]);

  useEffect(() => {
    if (type === "tv")
      fetchData(
        "https://api.themoviedb.org/3/tv/" + id + "/season/" + selectedSeason
      ).then((data) => {
        setSeasonDetails(data);
      });
  }, [selectedSeason]);

  const TagCard = ({ value }) => (
    <div className="stream-tag">
      <p className="stream-tag-text">{value}</p>
    </div>
  );

  return (
    <div id="top" className="stream-player-page">
      <div className="stream-main-layout">
        <div className="stream-video-section">
          <div className="stream-video-container">
            <iframe
              className="stream-iframe"
              src={`https://${selectedServer.url}/embed/${type}/${id}${
                type === "tv" ? "/" + season + "/" + episode : ""
              }`}
              title="StreamPod video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="stream-controls">
            <div className="stream-server-buttons-container">
              <div className="stream-server-buttons">
                {servers.map((server) => (
                  <button
                    key={server.index}
                    onClick={() => setServer(server.index)}
                    className={`stream-server-button ${
                      server.index == selectedServer.index
                        ? "stream-server-button--selected"
                        : ""
                    }`}
                  >
                    {server.name}
                  </button>
                ))}
              </div>
            </div>
            {type == "tv" && (
              <div className="stream-nav-buttons">
                <Link
                  to={
                    episode > 1
                      ? `/play/${type}/${id}/${season}/${episode - 1}`
                      : ""
                  }
                  className="stream-nav-button stream-nav-button--prev"
                >
                  <TbPlayerTrackPrevFilled fontSize={"16px"} />
                  Prev
                </Link>
                <Link
                  to={
                    episode < seasonDetails.episodes?.length
                      ? `/play/${type}/${id}/${season}/${+episode + 1}`
                      : ""
                  }
                  className="stream-nav-button stream-nav-button--next"
                >
                  Next
                  <TbPlayerTrackNextFilled fontSize={"16px"} />
                </Link>
              </div>
            )}
          </div>
        </div>
        {type === "tv" && !loading && (
          <div className="stream-episode-list">
            <ListEpisodes
              id={id}
              noOfSeasons={data?.number_of_seasons}
              currentSeason={season}
              selectedSeason={selectedSeason}
              onSeasonClick={setSelectedSeason}
              currentEpisode={episode}
              seasonDetails={seasonDetails}
            />
          </div>
        )}
        <div
          className={`stream-details-section ${
            type == "movie"
              ? "stream-details-section--movie"
              : "stream-details-section--tv"
          }`}
        >
          <PlayerDetails data={data} type={type} />
          {loading ? (
            ""
          ) : (
            <div
              className={`stream-tags-container ${
                type == "tv"
                  ? "stream-tags-container--tv"
                  : "stream-tags-container--movie"
              }`}
            >
              <div className="stream-tags-header">
                <IoMdPricetags />
                <h3>Tags:</h3>
              </div>
              {(type == "tv"
                ? data?.keywords?.results
                : data?.keywords?.keywords) &&
                (type == "tv"
                  ? data?.keywords?.results
                  : data?.keywords?.keywords
                ).map((tag) => <TagCard key={tag.id} value={tag.name} />)}
            </div>
          )}
        </div>
      </div>
      <CardSection
        title={"Similar " + (type == "movie" ? "Movies" : "TV Shows")}
        type={type}
        path={"/" + type + "/" + id + "/similar"}
        className="stream-section stream-section--similar"
      />
      <CardSection
        title={"Recommended " + (type == "movie" ? "Movies" : "TV Shows")}
        type={type}
        path={"/" + type + "/" + id + "/recommendations"}
        className="stream-section stream-section--recommended"
      />
    </div>
  );
};

export default StreamPage;
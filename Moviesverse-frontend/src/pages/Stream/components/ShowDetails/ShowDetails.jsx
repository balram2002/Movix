import React, { useEffect, useState } from 'react';
import { Tag } from 'lucide-react';
import './ShowDetails.css';
import './ShowDetails.scss';
import dayjs from 'dayjs';
import Genres from '../../../../components/genres/Genres';
import CircleRating from '../../../../components/circleRating/CircleRating';
import VideoPopup from '../../../../components/videoPopup/VideoPopup';
import { useSelector } from 'react-redux';
import Overview from '../../../../components/overview/Overview';
import { PlayIcon } from '../../../details/Playbtn';
import Languages from '../../../../components/Language/Languages';
import Countrys from '../../../../components/Country/Countrys';
import { useParams } from 'react-router-dom';
import Img from '../../../../components/lazyLoadImage/Img';
import PosterFallback from "../../../../assets/no-poster.png";
import Similar from '../../../details/carousels/Similar';
import Recommendation from '../../../details/carousels/Recommendation';
import { RWebShare } from 'react-web-share';
import { FaShareSquare } from 'react-icons/fa';

const ShowDetails = ({ data, video, crew }) => {
  const { mediaType, id } = useParams();
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    video?.results?.map(item => {
      if (item.type === "Trailer") {
        setVideoId(item.key);
      }
    })
  }, []);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = mediaType == "movie" && crew?.filter((f) => f?.job === "Director");
  const writer = mediaType == "tv" && crew?.filter(
    (f) => f?.job === "Screenplay" || f?.job === "Story" || f?.job === "Writer"
  );
  const title = data?.title || data?.name;

  return (
    <>
      <div className="show-details-container">
        {/* Main Details Section - Responsive Layout */}
        <div className="main-details">
          {/* Left Section - Show Info */}
          <div className="show-info">
            <div className="content">
              <div className="shareicon989-details">
                <RWebShare
                  data={{
                    text: `Moviesverse shared ${data?.endpoint || mediaType} ${data?.name || data?.title} ( ${data?.release_date} ) with a tagline of '${data?.tagline}' and overview as '${data?.overview}'.`,
                    url: `https://www.moviesverse.studio/${data?.endpoint || "Person"}/${id | data?.id}`,
                    title: "Movix Shared " + data?.name | data?.title,
                  }}
                >
                  <span><FaShareSquare className="shareicon98icon" /></span>
                </RWebShare>
              </div>
              <div className="left">
                {data?.poster_path ? (
                  <Img
                    className="posterImg"
                    src={
                      url.backdrop +
                      data?.poster_path
                    }
                  />
                ) : (
                  <Img
                    className="posterImg"
                    src={PosterFallback}
                  />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {`${data?.name || data?.title
                    } (${dayjs(
                      data?.release_date
                    ).format("YYYY")})`}
                </div>
                <div className="subtitle">
                  {data?.tagline}
                </div>

                <Genres data={_genres} />

                <div className="row-real">
                  <CircleRating
                    rating={data?.vote_average?.toFixed(
                      1
                    )}
                  />
                  <div
                    className="playbtn-real"
                    onClick={() => {
                      setShow(true);
                      setVideoId(video.key);
                    }}
                  >
                    <PlayIcon />
                    <span className="text">
                      <b> Watch Trailer</b>
                    </span>
                  </div>
                </div>

                <div className="overview">
                  <div className="heading">
                    <b>  Overview</b>
                  </div>
                  <div className="description">
                    <Overview overview={data?.overview} />
                  </div>
                </div>

                <div className="info">
                  {data?.number_of_seasons && (
                    <div className="infoItem">
                      <span className="text bold">
                        Total Seasons:{" "}
                      </span>
                      <span className="text">
                        {data?.number_of_seasons}
                      </span>
                    </div>
                  )}
                  {data?.number_of_episodes && (
                    <div className="infoItem">
                      <span className="text bold">
                        Total Episodes:{" "}
                      </span>
                      <span className="text">
                        {data?.number_of_episodes}
                      </span>
                    </div>
                  )}
                  {data?.type && (
                    <div className="infoItem">
                      <span className="text bold">
                        Type:{" "}
                      </span>
                      <span className="text">
                        {data?.type}
                      </span>
                    </div>
                  )}
                </div>

                <div className="info">
                  {data?.first_air_date && (
                    <div className="infoItem">
                      <span className="text bold">
                        First Air Date:{" "}
                      </span>
                      <span className="text">
                        {dayjs(
                          data?.air_date
                        ).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}
                  {data?.original_language && (
                    <div className="infoItem">
                      <span className="text bold">
                        Original Language:{" "}
                      </span>
                      <span className="text">
                        <Languages Language={data?.original_language} />
                      </span>
                    </div>
                  )}

                  {!data?.origin_country && (<div className="infoItem">
                    <span className="text bold">
                      Content Type:{" "}
                    </span>
                    <span className="text">
                      {data?.mediaType}
                    </span>
                  </div>)}

                  {data?.origin_country && (
                    <div className="infoItem">
                      <span className="text bold">
                        Origin Country:{" "}
                      </span>
                      <span className="text">
                        <Countrys country={data?.origin_country} />
                      </span>
                    </div>
                  )}
                  {data?.revenue && (
                    <div className="infoItem">
                      <span className="text bold">
                        Revenue:{" "}
                      </span>
                      <span className="text">
                        $ {data?.revenue}
                      </span>
                    </div>
                  )}
                </div>

                <div className="info">
                  {data?.status && (
                    <div className="infoItem">
                      <span className="text bold">
                        Status:{" "}
                      </span>
                      <span className="text">
                        {data?.status}
                      </span>
                    </div>
                  )}
                  {data?.release_date && (
                    <div className="infoItem">
                      <span className="text bold">
                        Release Date:{" "}
                      </span>
                      <span className="text">
                        {dayjs(
                          data?.release_date
                        ).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}
                  {data?.runtime && (
                    <div className="infoItem">
                      <span className="text bold">
                        Runtime:{" "}
                      </span>
                      <span className="text">
                        {toHoursAndMinutes(
                          data?.runtime
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {director?.length > 0 && (
                  <div className="info">
                    <span className="text bold">
                      Director:{" "}
                    </span>
                    <span className="text">
                      {director?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {director?.length -
                            1 !==
                            i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {writer?.length > 0 && (
                  <div className="info writer645">
                    <span className="text bold">
                      Writer:{" "}
                    </span>
                    <span className="text">
                      {writer?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {writer?.length -
                            1 !==
                            i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {data?.created_by?.length > 0 && (
                  <div className="info linecreator654">
                    <span className="text bold">
                      Creator:{" "}
                    </span>
                    <span className="text">
                      {data?.created_by?.map(
                        (d, i) => (
                          <span key={i}>
                            {d.name}
                            {data
                              ?.created_by
                              ?.length -
                              1 !==
                              i && ", "}
                          </span>
                        )
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar TV Shows Section */}
        <div className="similar-shows">
          <h2 className="similar-shows-title">Similar {mediaType === 'tv' ? 'TV Shows' : 'Movies'}</h2>
          {/* Placeholder for future content */}
          <div className="similar-shows-list">
            <Similar mediaType={mediaType} id={id} titlee={title} isStream={true} />
          </div>
        </div>

        <div className="similar-shows">
          <h2 className="similar-shows-title">Recommended {mediaType === 'tv' ? 'TV Shows' : 'Movies'}</h2>
          {/* Placeholder for future content */}
          <div className="similar-shows-list">
            <Recommendation mediaType={mediaType} id={id} titlee={title} isStream={true} />
          </div>
        </div>
      </div>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </>
  );
};

export default ShowDetails;
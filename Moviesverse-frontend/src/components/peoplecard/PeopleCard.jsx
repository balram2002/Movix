import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/avatar.png";

const PeopleCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.profile_path
        ? url.profile + data.profile_path
        : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                <span className="mediatype09">{data.media_type || mediaType}</span>
            </div>
            <div className="textBlock">
                <span className="title">{data.name || data.original_name}</span>
                <span className="date">
                    {data?.known_for_department}
                </span>
            </div>
        </div>
    );
};

export default PeopleCard;

import React, { useState } from 'react'
import Img from "../lazyLoadImage/Img"
import { useSelector } from "react-redux";
import PosterFallback from "../../assets/no-poster.png";
import PosterFallbackPerson from "../../assets/avatar.png";
import useFetch from '../../hooks/useFetch';
import Genres from "../genres/Genres";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import Spinner from "../spinner/Spinner";

import "./style.scss";

function Autocomplete({ changeWord, setShowSearch, setchangeWord }) {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const [closeAuto, setCloseAuto] = useState(false);

    const { data, loading } = useFetch(`/search/multi?query=${changeWord}`);

    return (
        <div className={`autocomplete09 ${closeAuto ? "autocomplete09none" : ""}`}>
            <div className="autocomplete-items">
                {!loading ? (<div>
                    {data?.results && data?.results?.slice(0, 10)?.map((item) => {
                        const posterUrl = item?.poster_path
                            ? url.poster + item?.poster_path
                            : PosterFallback;
                        const profileurl = item?.profile_path ? url.profile + item?.profile_path : PosterFallbackPerson;
                        return (
                            <div className="autocomplete-item" key={item?.id} onClick={() => {
                                navigate(
                                    `/${item?.media_type}/${item.id
                                    }`
                                )
                                setCloseAuto(true);
                                setShowSearch(false);
                                setchangeWord("");
                            }}>
                                <div className="autocomplete-poster">
                                    <Img className="posterautoimg" src={item?.media_type === "person" ? profileurl : posterUrl} />
                                </div>
                                <div className="autocomplete-content">
                                    <span className="autocomplete-title tt545">{item?.title || item?.name || item?.original_name}</span>
                                    {item?.known_for && <span className="autocomplete-title tt56566">{item?.known_for[0]?.title || item?.known_for[0]?.original_title}</span>}
                                    {item?.media_type && <span className="autocomplete-title tt56566">{item?.media_type}</span>}
                                    <span className="autocomplete-title tt56566 ttt456"> {dayjs(item?.release_date || item?.first_air_date).format(
                                        "MMM D, YYYY"
                                    )}</span>
                                    <Genres
                                        data={item.genre_ids}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    {data?.results?.length <= 0 && <h1 className='noresults56756'>No Results Found, Try valid names...</h1>}
                </div>) : (<div className='spinerrauto'>
                    <Spinner />
                </div>)}
            </div>
            <div className="moreresultsauto" onClick={() => {
                navigate(`/search/multi/${changeWord}`);
                setCloseAuto(true);
                setShowSearch(false);
                setchangeWord("");
            }}>See More Results..</div>
        </div>
    )
}

export default Autocomplete
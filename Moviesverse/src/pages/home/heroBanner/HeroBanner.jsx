import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import movieposter from "../../../assets/posterbannermovie.jpg";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/trending/all/week");

    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        const bgg = url.backdrop ? bg : movieposter;
        setBackground(bgg);
    }, [data]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/multi/${query}`);
            console.log(url)
        }
    };

    return (
        <div className="heroBanner" style={{ height: "275px", marginBottom: "15px" }}>
            {/* <div className="opacity-layer"></div> */}

            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}
            <div className="opacity-layerrr"></div>


            <div className="opacity-layerr"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="titleht">Welcome.</span>
                    <span className="subTitleht">
                        Millions of Movies, TV Shows, Series, Animes to discover in <b>MoviesVerse</b> ,
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a Movie, TV Show and People..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;

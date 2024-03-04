import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Comedy = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const [type, setType] = useState("comedy");
    const { data, loading } = useFetch(`/discover/${endpoint}?with_genres=35`);

    const navigate = useNavigate();

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movie" ? "movie" : "tv");
    };

    const handleSeeAll = () => {
        console.log("comedy");
        if (endpoint === "movie") {
            navigate(`/movie/${type}`);
        } else if (endpoint === "tv") {
            navigate(`/tv/${type}`);
        }

    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Comedy </span>
                <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    );
};

export default Comedy;

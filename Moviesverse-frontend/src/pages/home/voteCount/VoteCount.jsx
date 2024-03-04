import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";

const VoteCount = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/discover/${endpoint}?sort_by=vote_count.desc`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movie" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Highly Reviewed(vote counts)</span>
                <SwitchTabs data={["Movie", "TV"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    );
};

export default VoteCount;

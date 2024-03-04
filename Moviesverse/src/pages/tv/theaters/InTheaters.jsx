import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const InTheaters = () => {

    const { data, loading } = useFetch(`/tv/airing_today`);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Airing Today</span>
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint="tv"
            />
        </div>
    );
};

export default InTheaters;

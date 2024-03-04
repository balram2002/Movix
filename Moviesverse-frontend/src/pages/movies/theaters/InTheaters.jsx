import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const InTheaters = () => {

    const { data, loading } = useFetch(`/movie/now_playing`);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">In Cinemas Now</span>
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint="movie"
            />
        </div>
    );
};

export default InTheaters;

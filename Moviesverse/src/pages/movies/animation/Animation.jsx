import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const Animation = () => {

    const { data, loading } = useFetch(`/discover/movie?with_genres=16&sort_by=popularity.desc`);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Animated</span>
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint="movie"
            />
        </div>
    );
};

export default Animation;

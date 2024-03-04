import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";

const FavourateGenre = ({ genre, title }) => {
    const { data, loading } = useFetch(`/discover/movie?sort_by=popularity.desc&with_genres=${genre}`);

    return (
        <div className="carouselSection" style={{ backgroundColor: "var(--customliked)", paddingTop: "15px" }}>
            <ContentWrapper>
                <span className="carouselTitle">{title}</span>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint="movie" />
        </div>
    );
};

export default FavourateGenre;

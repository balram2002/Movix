import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const FavourateGenre = ({ genre, title }) => {
    const [show, setShow] = useState(false);

    const { data, loading } = useFetch(`/discover/movie?sort_by=popularity.desc&with_genres=${genre}`);

    return (
        <>
            <div className="carouselSection" style={{ backgroundColor: "var(--customliked)", paddingTop: "15px" }}>
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>{title}</span>
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} endpoint="movie" />
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title={title}
                data={data?.results}
                loading={loading}
                endpoint="movie"

            />
        </>
    );
};

export default FavourateGenre;

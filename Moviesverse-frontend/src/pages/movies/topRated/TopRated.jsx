import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const TopRated = () => {

    const [show, setShow] = useState(false);


    const { data, loading } = useFetch(`/movie/top_rated`);

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Top Rated</span>
                </ContentWrapper>
                <Carousel
                    data={data?.results}
                    loading={loading}
                    endpoint="movie"
                />
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title="Top rated Movies List"
                data={data?.results}
                loading={loading}
                endpoint="movie"

            />
        </>
    );
};

export default TopRated;

import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const TopRated = () => {
    const [show, setShow] = useState(false);


    const { data, loading } = useFetch(`/tv/top_rated`);

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Top Rated</span>
                </ContentWrapper>
                <Carousel
                    data={data?.results}
                    loading={loading}
                    endpoint="tv"
                />
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title="Top Rated TV Shows List"
                data={data?.results}
                loading={loading}
                endpoint="tv"

            />
        </>
    );
};

export default TopRated;

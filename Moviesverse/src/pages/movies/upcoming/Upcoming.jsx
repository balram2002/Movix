import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const Upcoming = () => {

    const { data, loading } = useFetch(`/movie/upcoming`);
    const {endpoint, setEndpoint} = useState("upcoming");

    return (
        <div className="border">
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Upcoming</span>
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint="movie"
            />
        </div>
        </div>
    );
};

export default Upcoming;

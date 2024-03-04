import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const Upcoming = () => {

    const { data, loading } = useFetch(`/tv/on_the_air`);
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
                endpoint="tv"
            />
        </div>
        </div>
    );
};

export default Upcoming;

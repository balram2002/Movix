import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const Revenue = () => {

    const [endpoint, setEndpoint] = useState("revenue.desc");
    const { data, loading } = useFetch(`/discover/movie?sort_by=${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "High" ? "revenue.desc" : "revenue.asc");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Overall Revenue</span>
                <SwitchTabs data={["High", "Low"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint="movie"
            />
        </div>
    );
};

export default Revenue;

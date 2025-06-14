import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const [show, setShow] = useState(false);

    const { data, loading } = useFetch(`/trending/tv/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Trending </span>
                    <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} endpoint="tv" />
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title="Trending TV Shows List"
                data={data?.results}
                loading={loading}
                endpoint="tv"

            />
        </>
    );
};

export default Trending;

import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const VoteCount = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const [show, setShow] = useState(false);

    const { data, loading } = useFetch(`/discover/${endpoint}?sort_by=vote_count.desc`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movie" ? "movie" : "tv");
    };

    const title = "Highly Reviewed " + endpoint + " List";


    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Highly Reviewed</span>
                    <SwitchTabs data={["Movie", "TV"]} onTabChange={onTabChange} />
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title={title}
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </>
    );
};

export default VoteCount;

import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import SeeMore from "../../../components/seemore/SeeMore";

const Comedy = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const [show, setShow] = useState(false);
    const [type, setType] = useState("comedy");
    const { data, loading } = useFetch(`/discover/${endpoint}?with_genres=35`);

    const navigate = useNavigate();

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movie" ? "movie" : "tv");
    };

    const title = "Comedy " + endpoint + " List";


    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Comedy </span>
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

export default Comedy;

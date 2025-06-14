import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const Upcoming = () => {
    const [show, setShow] = useState(false);


    const { data, loading } = useFetch(`/tv/on_the_air`);
    const { endpoint, setEndpoint } = useState("upcoming");

    return (
        <>
            <div className="border">
                <div className="carouselSection">
                    <ContentWrapper>
                        <span className="carouselTitle" onClick={() => setShow(true)}>Upcoming</span>
                    </ContentWrapper>
                    <Carousel
                        data={data?.results}
                        loading={loading}
                        endpoint="tv"
                    />
                </div>
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title="Upcoming TV Shows List"
                data={data?.results}
                loading={loading}
                endpoint="tv"

            />
        </>
    );
};

export default Upcoming;

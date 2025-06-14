import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const InTheaters = () => {
    const [show, setShow] = useState(false);


    const { data, loading } = useFetch(`/tv/airing_today`);

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Airing Today</span>
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
                title="Airing today TV Shows List"
                data={data?.results}
                loading={loading}
                endpoint="tv"

            />
        </>
    );
};

export default InTheaters;

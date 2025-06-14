import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const Upcoming = () => {

    const { data, loading } = useFetch(`/movie/upcoming`);
    const { endpoint, setEndpoint } = useState("upcoming");
    const [show, setShow] = useState(false);


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
                        endpoint="movie"
                    />
                </div>
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title="Upcoming Movies List"
                data={data?.results}
                loading={loading}
                endpoint="movie"

            />
        </>
    );
};

export default Upcoming;

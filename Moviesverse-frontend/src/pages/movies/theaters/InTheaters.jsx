import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const InTheaters = () => {

    const [show, setShow] = useState(false);


    const { data, loading } = useFetch(`/movie/now_playing`);

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>In Cinemas Now</span>
                </ContentWrapper>
                <Carousel
                    data={data?.results}
                    loading={loading}
                    endpoint="movie"
                />
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title="In Theaters Movies List"
                data={data?.results}
                loading={loading}
                endpoint="movie"

            />
        </>
    );
};

export default InTheaters;

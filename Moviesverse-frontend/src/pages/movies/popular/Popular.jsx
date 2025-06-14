import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const Popular = () => {
    const [show, setShow] = useState(false);

    const { data, loading } = useFetch(`/movie/popular`);

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>What's Popular</span>
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
                title="Popular Movies List"
                data={data?.results}
                loading={loading}
                endpoint="movie"

            />
        </>
    );
};

export default Popular;

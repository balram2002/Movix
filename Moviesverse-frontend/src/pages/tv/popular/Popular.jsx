import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const Popular = () => {
    const [show, setShow] = useState(false);


    const { data, loading } = useFetch(`/tv/popular`);

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>What's Popular</span>
                </ContentWrapper>
                <Carousel
                    data={data?.results}
                    loading={loading}
                    endpoint="tv"
                />
                <SeeMore
                    show={show}
                    setShow={setShow}
                    title="Popular TV Shows List"
                    data={data?.results}
                    loading={loading}
                    endpoint="tv"

                />
            </div>
        </>
    );
};

export default Popular;

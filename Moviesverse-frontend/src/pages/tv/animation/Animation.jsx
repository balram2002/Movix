import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const Animation = () => {

    const [show, setShow] = useState(false);


    const { data, loading } = useFetch(`/discover/tv?with_genres=16&sort_by=popularity.desc`);

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Animated</span>
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
                title="Animated TV Shows List"
                data={data?.results}
                loading={loading}
                endpoint="tv"

            />
        </>
    );
};

export default Animation;

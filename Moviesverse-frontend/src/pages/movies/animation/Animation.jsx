import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const Animation = () => {
    const [show, setShow] = useState(false);

    const { data, loading } = useFetch(`/discover/movie?with_genres=16&sort_by=popularity.desc`);

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Animated</span>
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
                title="Animation Movies List"
                data={data?.results}
                loading={loading}
                endpoint="movie"
            />
        </>
    );
};

export default Animation;

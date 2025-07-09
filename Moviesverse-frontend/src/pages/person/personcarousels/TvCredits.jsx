import React from "react";

import Carousel from "../../../components/carousel/Carousel";

const TvCredits = ({ data, loading }) => {

    return (
        <>
            <Carousel
                title="Worked In TV Shows"
                data={data}
                loading={loading}
                endpoint="tv"
            />
        </>
    );
};

export default TvCredits;
import React from "react";

import Carousel from "../../../components/carousel/Carousel";

const MovieCredits = ({ data, loading }) => {

    return (
        <>
            <Carousel
                title="Worked In Movies"
                data={data}
                loading={loading}
                endpoint={data?.media_type}
            />
        </>
    );
};

export default MovieCredits;

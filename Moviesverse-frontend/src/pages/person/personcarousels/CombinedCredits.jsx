import React from "react";

import Carousel from "../../../components/carousel/Carousel";

const CombinedCredits = ({ data, loading }) => {

    return (
        <>
            <Carousel
                title="Worked in Overall"
                data={data}
                loading={loading}
            />
        </>
    );
};

export default CombinedCredits;

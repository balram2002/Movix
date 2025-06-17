import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id, titlee }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    const title = mediaType === "tv" ? `Recommended TV Shows For '${titlee}'` : `Recommended Movies For '${titlee}'`;

    return (
        <div>
            {data && <Carousel
                title={!data?.results ? `No Recommendations found! for ${titlee}` : title}
                data={data?.results}
                loading={loading}
                endpoint={mediaType}
            />}
        </div>
    );
};

export default Recommendation;

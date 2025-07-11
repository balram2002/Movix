import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id, titlee, isStream }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? `Similar TV Shows For '${titlee}'` : `Similar Movies For '${titlee}'`;

    return (
        <div>
            {data && <Carousel
                title={title}
                data={data?.results}
                loading={loading}
                endpoint={mediaType}
                isStream={isStream}
            />}
        </div>
    );
};

export default Similar;

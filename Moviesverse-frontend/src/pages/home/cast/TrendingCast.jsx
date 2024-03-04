import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import CastCarousel from '../../../components/castcarousel/CastCarousel';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function TrendingCast() {
    const [endpoint, setEndpoint] = useState("day");
    const { data, loading } = useFetch(`/trending/person/${endpoint}`);


    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending People</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            {data?.results && <CastCarousel data={data?.results} loading={loading} heading={"Trending People"} />}
        </div>
    )
}

export default TrendingCast
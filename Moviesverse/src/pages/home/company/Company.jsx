import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";


const Cartoon = () => {

    const [number, setNumber] = useState(923);
    const [active, setActive] = useState("Legendary Pictures");
    const { data, loading } = useFetch(`/discover/movie?with_companies=${number}`);

    const onTabChange = (tab) => {
        if (tab === "New Line") {
            setNumber(12);
            setActive("New Line Cinema Pictures");
        } else if (tab === "Legendary") {
            setNumber(923);
            setActive("Legendary Pictures");
        }
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Movies from '{active}'</span>
                <SwitchTabs data={["Legendary", "New Line"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint="movie" />
        </div>
    );
};

export default Cartoon;

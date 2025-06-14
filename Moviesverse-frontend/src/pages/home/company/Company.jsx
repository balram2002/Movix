import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import SeeMore from "../../../components/seemore/SeeMore";


const Cartoon = () => {

    const [show, setShow] = useState(false);


    const [number, setNumber] = useState(923);
    const [active, setActive] = useState("Legendary Pictures");
    const { data, loading } = useFetch(`/discover/movie?with_companies=${number}`);

    const onTabChange = (tab) => {
        if (tab === "NewLine") {
            setNumber(12);
            setActive("New Line Cinema Pictures");
        } else if (tab === "Legendary") {
            setNumber(923);
            setActive("Legendary Pictures");
        }
    };

    const title = active + " Movies List";


    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Movies from '{active}'</span>
                    <SwitchTabs data={["Legendary", "NewLine"]} onTabChange={onTabChange} />
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} endpoint="movie" />
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title={title}
                data={data?.results}
                loading={loading}
                endpoint="movie"

            />
        </>
    );
};

export default Cartoon;

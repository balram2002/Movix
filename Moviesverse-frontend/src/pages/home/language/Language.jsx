import React, { useState } from "react";
import Select from "react-select";

import "./style.scss";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const Language = () => {
    const [show, setShow] = useState(false);


    const sortbyData = [
        { value: "hi", label: "Hindi" },
        { value: "kn", label: "Kannada" },
        { value: "pa", label: "Punjabi" },
        { value: "mr", label: "Marathi" },
        { value: "as", label: "Assamese" },
        { value: "te", label: "Telugu" },
        { value: "ml", label: "Malyalam" },
    ];

    const [language, setLanguage] = useState("hi");
    const [currentLanguage, setCurrentLanguage] = useState("Hindi");
    const [sortBy, setSortBy] = useState(null);
    const { data, loading } = useFetch(`/discover/movie?with_original_language=${language}`);

    const title = currentLanguage + " Movies List";


    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Movies From language : '{currentLanguage}'</span>
                    <div className="filters">
                        <Select
                            name="Country"
                            value={sortBy}
                            options={sortbyData}
                            onChange={(value) => {
                                setLanguage(value.value);
                                setCurrentLanguage(value.label);
                            }}
                            isClearable={true}
                            placeholder="Select Language..."
                            className="react-select-container language"
                            classNamePrefix="react-select"
                        />
                    </div>
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
                title={title}
                data={data?.results}
                loading={loading}
                endpoint="movie"

            />
        </>
    );
};

export default Language;

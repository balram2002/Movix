import React, { useState } from "react";
import Select from "react-select";

import "./style.scss";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const Country = () => {

    const sortbyData = [
        { value: "IN", label: "India" },
        { value: "US", label: "America" },
        { value: "CA", label: "Canada" },
        { value: "JP", label: "Japan" },
        { value: "FR", label: "France" },
        { value: "ES", label: "Spain"},
        { value: "EG", label: "Egypt" },
        { value: "AU", label: "Australia" },
        { value: "DE", label: "Germany" },
        { value: "SE", label: "Sweden" },
        { value: "BR", label: "Brazil" },
        { value: "PK", label: "Pakistan" },
        { value: "BD", label: "Bangladesh"},
        { value: "LK", label: "Sri Lanka" },
        { value: "RU", label: "Russia" },
        { value: "IT", label: "Italy" },
    ];

    const [country, setCountry] = useState("US");
    const [currentCountry, setCurrentCountry] = useState("America");
    const [sortBy, setSortBy] = useState(null);
    const { data, loading } = useFetch(`/discover/tv?with_origin_country=${country}`);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">TV Shows From '{currentCountry}'</span>
                <div className="filters">
                    <Select
                        name="Country"
                        value={sortBy}
                        options={sortbyData}
                        onChange={(value) => {
                            setCountry(value.value);
                            setCurrentCountry(value.label);
                        }}
                        isClearable={true}
                        placeholder="Select Country..."
                        className="react-select-container sortbyDD"
                        classNamePrefix="react-select"
                    />
                </div>
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint="tv"
            />
        </div>
    );
};

export default Country;

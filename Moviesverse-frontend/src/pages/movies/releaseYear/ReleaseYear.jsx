import React, { useState } from "react";
import Select from "react-select";

import "./style.scss";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SeeMore from "../../../components/seemore/SeeMore";

const ReleaseYear = () => {
    const [show, setShow] = useState(false);


    const sortbyData = [
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
        { value: "2021", label: "2021" },
        { value: "2020", label: "2020" },
        { value: "2019", label: "2019" },
        { value: "2018", label: "2018" },
        { value: "2017", label: "2017" },
        { value: "2016", label: "2016" },
        { value: "2015", label: "2015" },
        { value: "2014", label: "2014" },
        { value: "2013", label: "2013" },
        { value: "2012", label: "2012" },
        { value: "2011", label: "2011" },
        { value: "2010", label: "2010" },
        { value: "2009", label: "2009" },
        { value: "2008", label: "2008" },
        { value: "2007", label: "2007" },
        { value: "2006", label: "2006" },
        { value: "2005", label: "2005" },
        { value: "2004", label: "2004" },
        { value: "2003", label: "2003" },
        { value: "2002", label: "2002" },
        { value: "2001", label: "2001" },
        { value: "2000", label: "2000" },
        { value: "1999", label: "1999" },
        { value: "1998", label: "1998" },
        { value: "1997", label: "1997" },
        { value: "1996", label: "1996" },
        { value: "1995", label: "1995" },
        { value: "1994", label: "1994" },
        { value: "1993", label: "1993" },
        { value: "1992", label: "1992" },
        { value: "1991", label: "1991" },
        { value: "1990", label: "1990" },
        { value: "1989", label: "1989" },
        { value: "1088", label: "1088" },
        { value: "1987", label: "1987" },
        { value: "1986", label: "1986" },
        { value: "1985", label: "1985" },
        { value: "1984", label: "1984" },
        { value: "1983", label: "1983" },
        { value: "1982", label: "1982" },
        { value: "1981", label: "1981" },
        { value: "1980", label: "1980" },
        { value: "1979", label: "1979" },
        { value: "1978", label: "1978" },
        { value: "1977", label: "1977" },
        { value: "1976", label: "1976" },
        { value: "1975", label: "1975" },
        { value: "1974", label: "1974" },
        { value: "1973", label: "1973" },
        { value: "1972", label: "1972" },
        { value: "1971", label: "1971" },
        { value: "1970", label: "1970" },
        { value: "1969", label: "1969" },
        { value: "1968", label: "1968" },
        { value: "1967", label: "1967" },
        { value: "1966", label: "1966" },
        { value: "1965", label: "1965" },
        { value: "1964", label: "1964" },
        { value: "1963", label: "1963" },
        { value: "1962", label: "1962" },
        { value: "1961", label: "1961" },
        { value: "1960", label: "1960" },
        { value: "1959", label: "1959" },
        { value: "1958", label: "1958" },
        { value: "1957", label: "1957" },
        { value: "1956", label: "1956" },
        { value: "1955", label: "1955" },
        { value: "1954", label: "1954" },
        { value: "1953", label: "1953" },
        { value: "1952", label: "1952" },
        { value: "1951", label: "1951" },
        { value: "1950", label: "1950" },
        { value: "1949", label: "1949" },
        { value: "1948", label: "1948" },
        { value: "1947", label: "1947" },
    ];

    const [releaseYear, setReleaseYear] = useState(2023);
    const [sortBy, setSortBy] = useState(null);
    const { data, loading } = useFetch(`/discover/movie?primary_release_year=${releaseYear}`);

    const title = releaseYear + " Movies List";


    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className="carouselTitle" onClick={() => setShow(true)}>Release Year for '{releaseYear}'</span>
                    <div className="filters">
                        <Select
                            name="ReleaseYear"
                            value={sortBy}
                            options={sortbyData}
                            onChange={(value) => {
                                setReleaseYear(value.value);
                            }}
                            isClearable={true}
                            placeholder="Release Year"
                            className="react-select-container sortbyDD"
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

export default ReleaseYear;

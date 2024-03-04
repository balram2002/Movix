import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import "./CustomLiked1.css";

const CustomLiked1 = ({ data, loading, title, endpoint }) => {

    return (
        <div className="CustomSection01">
            <ContentWrapper>
                <span className="CustomSection01-title">{title}</span>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    );
};

export default CustomLiked1;

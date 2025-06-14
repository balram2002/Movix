import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import "./CustomLiked1.css";
import SeeMore from "../../../components/seemore/SeeMore";

const CustomLiked1 = ({ data, loading, title, endpoint }) => {
    const [show, setShow] = useState(false);


    return (
        <>
            <div className="CustomSection01">
                <ContentWrapper>
                    <span className="CustomSection01-title" onClick={() => setShow(true)}>{title}</span>
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
            </div>
            <SeeMore
                show={show}
                setShow={setShow}
                title={title}
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </>
    );
};

export default CustomLiked1;

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import Line from "../../../components/line/Line";
import { useNavigate } from "react-router-dom";

const Cast = ({ data, loading, heading }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const carouselContainer = useRef();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const conatainerHalfWidth = (container.offsetWidth / 2) + 50;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth - conatainerHalfWidth)
                : container.scrollLeft + (container.offsetWidth - conatainerHalfWidth);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="rectangle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <>
            <div className="castSection">
                <ContentWrapper>
                    <div className="sectionHeading">{heading}</div>
                    <BsFillArrowLeftCircleFill
                        className="carouselLeftNavdetailscast arrow4554detailscast"
                        onClick={() => navigation("left")}
                    />
                    <BsFillArrowRightCircleFill
                        className="carouselRighttNavdetailscast arrow4554detailscast"
                        onClick={() => navigation("right")}
                    />
                    {!loading ? (
                        <div className="listItems" ref={carouselContainer}>
                            {data?.map((item) => {
                                let imgUrl = item.profile_path
                                    ? url.profile + item.profile_path
                                    : avatar;
                                return (
                                    <div key={item.id} className="listItem">
                                        <div className="profileImg" onClick={() => navigate(`/person/${item?.id}`)}>
                                            <Img src={imgUrl} />
                                        </div>
                                        <div className="name">{item.name}</div>
                                        <div className="character">
                                            {item.character}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="castSkeleton">
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>
                    )}
                </ContentWrapper>
            </div>
            <Line />
        </>
    );
};

export default Cast;
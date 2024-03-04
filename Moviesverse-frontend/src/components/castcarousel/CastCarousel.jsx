import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import avatar from "../../assets/avatar.png";
import Line from "../line/Line";
import { useNavigate } from "react-router-dom";


const CastCarousel = ({ data, loading, heading }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <>
            <div className="castSection">
                <ContentWrapper>
                    {!loading ? (
                        <div className="listItems">
                            {data?.map((item) => {
                                let imgUrl = item.profile_path
                                    ? url.profile + item.profile_path
                                    : avatar;
                                return (
                                    <div key={item.id} className="listItem">
                                        <div className="profileImg" onClick={() => navigate(`/person/${item?.id}`)}>
                                            <Img src={imgUrl} />
                                        </div>
                                        <div onClick={() => navigate(`/${item.known_for[0].media_type}/${item.known_for[0].id}}`)}>
                                            <div className="name">{item.name || item.original_name}</div>
                                            <div className="character">
                                                {item?.known_for[0]?.media_type} : {item?.known_for[0]?.title || item?.known_for[0]?.original_title}
                                            </div>
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

export default CastCarousel;

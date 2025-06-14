import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import Season from "../../components/season/Season";
import Reviews from "./reviews/Reviews";
import Season2 from './../../components/season2/Season2';
import ScrollButton from "../../components/scrollbutton/ScrollButton";

const Details = () => {

    const [lastScrollY, setLastScrollY] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", controlScrollButton);
        return () => {
            window.removeEventListener("scroll", controlScrollButton);
        };
    }, [lastScrollY]);

    const controlScrollButton = () => {
        if (window.scrollY > 500) {
            if (window.scrollY > lastScrollY) {
                setShow(true);
            } else {
                setShow(false);
            }
        } else {
            setShow(false);
        }
        setLastScrollY(window.scrollY);
    };

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: seasons, loading: seasonloading } = useFetch(`/${mediaType}/${id}`);
    const { data: reviews, loading: reviewloading } = useFetch(`/${mediaType}/${id}/reviews`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );

    const collection = seasons && seasons?.belongs_to_collection;
    const Collections = collection?.id;
    const title = seasons?.title || seasons?.name;
    const idd = seasons?.id;

    return (
        <>
            <div className="details">
                <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
                <Cast data={credits?.cast} loading={creditsLoading} heading={"Top Cast"} />

                {seasons?.seasons && <Season data={seasons?.seasons} loading={seasonloading} heading={"Available Seasons"} id={idd} title={title} mediaType={mediaType} />
                }
                {Collections && <Season2 id={Collections} heading={`Belongs To ${title} Collection`} />
                }
                <VideosSection data={data} loading={loading} />
                <Similar mediaType={mediaType} id={id} titlee={title} />
                <Recommendation mediaType={mediaType} id={id} titlee={title} />
                <Reviews data={reviews} loading={reviewloading} title={title} />
                <div className="alternateswipergfhf6677">
                    <span className='fhfhfhyf67576'>Use Desktop to experience more features.</span>
                    <span className='fhfhfhyf67576'>Make an account to like and add to watchlist content and get recommendations accordingly..</span>
                </div>
            </div>
            {show && <ScrollButton />}
        </>
    );
};

export default Details;

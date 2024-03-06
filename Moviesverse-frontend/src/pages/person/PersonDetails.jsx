import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import CombinedCredits from "./personcarousels/CombinedCredits";
import MovieCredits from "./personcarousels/MovieCredits";
import TvCredits from './personcarousels/TvCredits';
import ScrollButton from "../../components/scrollbutton/ScrollButton";

const PersonDetails = () => {

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

    const { id } = useParams();
    const { data: movie, loading: movieLoading } = useFetch(`/person/${id}/movie_credits`);
    const { data: combine, loading } = useFetch(`/person/${id}/combined_credits`);
    const { data: tv, loading: tvLoading } = useFetch(
        `/person/${id}/tv_credits`
    );

    return (
        <>
            <div className="details">
                <DetailsBanner />
                <CombinedCredits data={combine?.cast} loading={loading} />
                <MovieCredits data={movie?.cast} loading={movieLoading} />
                <TvCredits data={tv?.cast} loading={tvLoading} />
            </div>
            {show && <ScrollButton />}
        </>
    );
};

export default PersonDetails;

import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import CombinedCredits from "./personcarousels/CombinedCredits";
import MovieCredits from "./personcarousels/MovieCredits";
import TvCredits from './personcarousels/TvCredits';

const PersonDetails = () => {
    const { id } = useParams();
    const { data: movie, loading: movieLoading } = useFetch(`/person/${id}/movie_credits`);
    const { data: combine, loading } = useFetch(`/person/${id}/combined_credits`);
    const { data: tv, loading: tvLoading } = useFetch(
        `/person/${id}/tv_credits`
    );

    return (
        <div className="details">
            <DetailsBanner />
            <CombinedCredits data={combine?.cast} loading={loading} />
            <MovieCredits data={movie?.cast} loading={movieLoading} />
            <TvCredits data={tv?.cast} loading={tvLoading} />
        </div>
    );
};

export default PersonDetails;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";
import { Helmet } from 'react-helmet-async';
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import PeopleCard from "../../components/peoplecard/PeopleCard";
import ScrollButton from "../../components/scrollbutton/ScrollButton";

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { endpoint, query } = useParams();
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

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/${endpoint}?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/${endpoint}?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <>
         <Helmet>
                <title>{`Search for ${query} | Moviesverse`}</title>
                <meta name="description" content="Search results or response page for users query submitted in search action. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
                <meta property="og:title" content={`Search for ${query} | Moviesverse`} />
                <meta property="og:description" content="Search results or response page for users query submitted in search action. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
                <link rel="canonical" href={`https://moviesverse.studio/search/${endpoint}/${query}`} />
                <meta property="og:url" content={`https://moviesverse.studio/search/${endpoint}/${query}`} />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className="searchResultsPage">
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <ContentWrapper>
                        {data?.results?.length > 0 ? (
                            <>
                                <div className="pageTitle">
                                    {`Search ${data?.total_results > 1
                                        ? "results"
                                        : "result"
                                        } of '${query}'`}
                                </div>
                                <InfiniteScroll
                                    className="content"
                                    dataLength={data?.results?.length || []}
                                    next={fetchNextPageData}
                                    hasMore={pageNum <= data?.total_pages}
                                    loader={<Spinner />}
                                >
                                    {data?.results.map((item, index) => {
                                        if (item.media_type === "person") {
                                            return (<PeopleCard key={index} data={item} fromSearch={true} mediaType="person" />);
                                        }
                                        return (
                                            <MovieCard
                                                key={index}
                                                data={item}
                                                fromSearch={true}
                                            />
                                        );
                                    })}
                                </InfiniteScroll>
                            </>
                        ) : (
                            <div className="resultNotFound">
                                <img className="norespng23" src={noResults} alt="" />
                                <span className="noreshead234"> Sorry, Results not found!
                                </span>
                            </div>
                        )}
                    </ContentWrapper>
                )}
            </div>
            {show && <ScrollButton />}
        </>
    );
};

export default SearchResult;

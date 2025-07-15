import React from "react";

import "./style.scss";
import { Helmet } from 'react-helmet-async';
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const PageNotFound = () => {
    return (
        <div className="pageNotFound">
             <Helmet>
                <title>404 - Not Found | Movix</title>
                <meta name="description" content="The requested page is not found or does not exist in the place, please verify the url to access the page. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
                <meta property="og:title" content="404 - Not Found | Moviesverse" />
                <meta property="og:description" content="The requested page is not found or does not exist in the place, please verify the url to access the page. Moviesverse - Explore and stream millions of movies, tv shows, animes, web shows etc for free." />
            </Helmet>
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};

export default PageNotFound;

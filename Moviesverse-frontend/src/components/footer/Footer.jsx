import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";
import Recommendation from './../../pages/details/carousels/Recommendation';

const Footer = () => {

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <NavLink to='/movie' className="menuItem">Movies Page </NavLink>
                    <NavLink to='/tv' className="menuItem">TV Shows Page</NavLink>
                    <NavLink to='/' className="menuItem">Home Page</NavLink>
                    <NavLink to='/explore/movie' className="menuItem">Discover Movies</NavLink>
                    <NavLink to='/explore/tv' className="menuItem">Discover TV Shows</NavLink>
                </ul>
                <div className="infoText">
                    This Product is developed by <b>Balram Dhakad</b> in a major project work in a Medi-caps college, Indore.
                </div>
                <div className="infoText">
                    This Single page application focuses on Finding, Exploring, Getting Recommendations, Getting Details and Finding our dream watch pick by playing with different filters, options and categories available in application.
                </div>
                <div className="socialIcons">
                    <span className="icon" onClick={() => openInNewTab("https://www.facebook.com/balram.dhakad.3551?mibextid=ZbWKwL")}>
                        <FaFacebookF />
                    </span>
                    <span className="icon" onClick={() => openInNewTab("https://instagram.com/balramdhakad12_?igshid=OGQ5ZDc2ODk2ZA==")}>
                        <FaInstagram />
                    </span>
                    <span className="icon" onClick={() => openInNewTab("https://twitter.com/BalramD42013703?t=rRs-EpG6nl6V5N0Ys8jcAA&s=09")}>
                        <FaTwitter />
                    </span>
                    <span className="icon" onClick={() => openInNewTab("https://www.linkedin.com/in/balram-dhakad-2a9110210?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app")}>
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;

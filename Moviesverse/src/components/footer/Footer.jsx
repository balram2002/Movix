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
                   This Product is developed by <b>Balram Dhakad</b> currently pursuing BCA 3rd year in Medicaps University, Indore.
                </div>
                <div className="infoText">
                    This Single page application focuses on Finding, Exploring, Getting Recommendations, Getting Details and Finding our dream watch pick by playing with different filters, options and categories available in application.
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;

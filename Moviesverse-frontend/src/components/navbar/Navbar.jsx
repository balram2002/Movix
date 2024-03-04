import { React, useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { RiSlideshow3Line } from "react-icons/ri";
import { MdOutlineExplore, MdExplore, MdOutlineManageSearch, MdOpacity } from "react-icons/md";
import { GrCircleInformation } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";

import "./style.css";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <ContentWrapper>
            <center>
                <div className="navbar">
                    <ul>
                        <NavLink className="list" to='/movie'>
                            <a href="">
                                <span className="icon"><BiMoviePlay /></span>
                                <span className="text" id="one">Movies</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/tv'>
                            <a href="">
                                <span className="icon"><RiSlideshow3Line /></span>
                                <span className="text" id="two">TV</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/search' style={{ opacity: 0.3 }}>
                            <a href="">
                                <span className="icon"><MdOutlineManageSearch /></span>
                                <span className="text" id="five">Search</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/'>
                            <a href="">
                                <span className="icon"><FaHome /></span>
                                <span className="text" id="zero">Home</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/about'>
                            <a href="">
                                <span className="icon"><GrCircleInformation /></span>
                                <span className="text" id="six">About</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/explore/movie'>
                            <a href="">
                                <span className="icon"><MdOutlineExplore /></span>
                                <span className="text" id="three">Find M</span>
                            </a>
                        </NavLink>
                        <NavLink className="list" to='/explore/tv'>
                            <a href="">
                                <span className="icon"><MdExplore /></span>
                                <span className="text" id="four">Find T</span>
                            </a>
                        </NavLink>
                        <div className="indicator"></div>
                    </ul>
                </div >
            </center>
        </ContentWrapper>
    );
};

export default Navbar;
